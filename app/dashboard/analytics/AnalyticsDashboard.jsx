"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#13131A] border border-[#2A2A35] rounded-lg p-3 shadow-lg">
                <p className="text-white font-medium">{label}</p>
                <p className="text-violet-400">{payload[0].value} clicks</p>
            </div>
        );
    }
    return null;
};

export default function AnalyticsDashboard() {
    const [range, setRange] = useState("7d");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/analytics?range=${range}`);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [range]);

    const topLink = data?.topLinks[0] || null;
    const topCountry = data?.clicksByCountry[0] || null;

    const barColors = ["#7C3AED", "#EC4899", "#7C3AED", "#EC4899", "#7C3AED"];

    if (loading) {
        return <div className="text-white text-center py-12">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1
                    className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
                >
                    Analytics
                </h1>
                <div className="flex gap-2">
                    {[
                        { label: "7 Days", value: "7d" },
                        { label: "30 Days", value: "30d" },
                        { label: "All Time", value: "all" },
                    ].map((tab) => (
                        <Button
                            key={tab.value}
                            onClick={() => setRange(tab.value)}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                range === tab.value
                                    ? "bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 text-white"
                                    : "bg-[#13131A] text-[#94A3B8] hover:bg-[#1A1A22] border border-[#2A2A35]"
                            }`}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-[#94A3B8] font-medium">
                            Total Clicks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-white">
                            {data?.totalClicks || 0}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-[#94A3B8] font-medium">
                            Top Link
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-bold text-white truncate">
                            {topLink?.title || "-"}
                        </p>
                        <p className="text-sm text-[#94A3B8]">
                            {topLink ? `${topLink.clickCount} clicks` : "-"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-[#94A3B8] font-medium">
                            Top Country
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-bold text-white">
                            {topCountry?.country || "-"}
                        </p>
                        <p className="text-sm text-[#94A3B8]">
                            {topCountry ? `${topCountry.count} clicks` : "-"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-white font-semibold">
                            Clicks Over Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data?.clicksByDay || []}>
                                <XAxis
                                    dataKey="date"
                                    stroke="#94A3B8"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#94A3B8"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={30}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#7C3AED"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#7C3AED" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-white font-semibold">
                            Top Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data?.topLinks || []}
                                layout="vertical"
                                margin={{ left: 20 }}
                            >
                                <XAxis
                                    type="number"
                                    stroke="#94A3B8"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    dataKey="title"
                                    type="category"
                                    stroke="#94A3B8"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={120}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="clickCount"
                                    radius={[0, 6, 6, 0]}
                                    barSize={24}
                                >
                                    {data?.topLinks?.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                barColors[
                                                    index % barColors.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                <CardHeader>
                    <CardTitle className="text-white font-semibold">
                        Clicks by Country
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#2A2A35]">
                                    <th className="py-3 px-4 text-sm text-[#94A3B8] font-medium">
                                        Country
                                    </th>
                                    <th className="py-3 px-4 text-sm text-[#94A3B8] font-medium">
                                        Clicks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.clicksByCountry?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-[#2A2A35]/50 last:border-0"
                                    >
                                        <td className="py-3 px-4 text-white">
                                            {item.country}
                                        </td>
                                        <td className="py-3 px-4 text-[#94A3B8]">
                                            {item.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
