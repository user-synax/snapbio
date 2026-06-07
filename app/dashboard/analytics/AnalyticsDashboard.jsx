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
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const CustomTooltip = ({ active, payload, label, type }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141414] border border-[#262626] rounded-[10px] p-3 shadow-lg">
                <p className="text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>{label}</p>
                <p className="text-[#0099ff]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                    {payload[0].value} {type === "views" ? "views" : "clicks"}
                </p>
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

    const barColors = ["#6a4cf5", "#d44df0", "#6a4cf5", "#d44df0", "#6a4cf5"];

    if (loading) {
        return <div className="text-white text-center py-12" style={{ fontFamily: "var(--font-inter)" }}>Loading...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1
                    className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
                    style={{ letterSpacing: "-1.0px" }}
                >
                    Analytics
                </h1>
                <div className="flex gap-2">
                    <div className="hidden md:flex gap-2">
                        {[
                            { label: "7 Days", value: "7d" },
                            { label: "30 Days", value: "30d" },
                            { label: "All Time", value: "all" },
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setRange(tab.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    range === tab.value
                                        ? "bg-[#1c1c1c] text-white"
                                        : "bg-[#090909] text-[#999999] hover:bg-[#141414]"
                                }`}
                                style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <select
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-[#1c1c1c] text-white border-none focus:outline-none focus:ring-2 focus:ring-[#6a4cf5]"
                            style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.0" }}
                        >
                            {[
                                { label: "7 Days", value: "7d" },
                                { label: "30 Days", value: "30d" },
                                { label: "All Time", value: "all" },
                            ].map((tab) => (
                                <option key={tab.value} value={tab.value} className="bg-[#090909] text-white">
                                    {tab.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        Total Clicks
                    </p>
                    <p className={`${plusJakarta.className} text-3xl font-bold text-white`} style={{ letterSpacing: "-1.0px" }}>
                        {data?.totalClicks || 0}
                    </p>
                </div>

                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        Total Views
                    </p>
                    <p className={`${plusJakarta.className} text-3xl font-bold text-white`} style={{ letterSpacing: "-1.0px" }}>
                        {data?.totalViews || 0}
                    </p>
                </div>

                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        Top Link
                    </p>
                    <p className="text-lg font-bold text-white truncate" style={{ fontFamily: "var(--font-inter)", fontSize: "18px", letterSpacing: "-0.18px", lineHeight: "1.30" }}>
                        {topLink?.title || "-"}
                    </p>
                    <p className="text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        {topLink ? `${topLink.clickCount} clicks` : "-"}
                    </p>
                </div>

                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <p className="text-[#999999] mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        Top View Country
                    </p>
                    <p className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "18px", letterSpacing: "-0.18px", lineHeight: "1.30" }}>
                        {data?.viewsByCountry?.[0]?.country || "-"}
                    </p>
                    <p className="text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                        {data?.viewsByCountry?.[0] ? `${data.viewsByCountry[0].count} views` : "-"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-4`} style={{ letterSpacing: "-1.0px" }}>
                        Clicks Over Time
                    </h2>
                    <div className="h-64">
                        {data?.clicksByDay?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data?.clicksByDay || []}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#999999"
                                        tick={{ fontSize: 12, fontFamily: "var(--font-inter)" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="#999999"
                                        tick={{ fontSize: 12, fontFamily: "var(--font-inter)" }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={30}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#6a4cf5"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#6a4cf5" }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
                                Waiting for data...
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-4`} style={{ letterSpacing: "-1.0px" }}>
                        Profile Views Over Time
                    </h2>
                    <div className="h-64">
                        {data?.viewsByDay?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data?.viewsByDay || []}>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#999999"
                                        tick={{ fontSize: 12, fontFamily: "var(--font-inter)" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="#999999"
                                        tick={{ fontSize: 12, fontFamily: "var(--font-inter)" }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={30}
                                    />
                                    <Tooltip content={(props) => <CustomTooltip {...props} type="views" />} />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#d44df0"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#d44df0" }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
                                Waiting for data...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-4`} style={{ letterSpacing: "-1.0px" }}>
                    Top Links
                </h2>
                <div className="h-64">
                    {data?.topLinks?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data?.topLinks || []}
                                layout="vertical"
                                margin={{ left: 20 }}
                            >
                                <XAxis
                                    type="number"
                                    stroke="#999999"
                                    tick={{ fontSize: 12, fontFamily: "var(--font-inter)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    dataKey="title"
                                    type="category"
                                    stroke="#999999"
                                    tick={{ fontSize: 12, fontFamily: "var(--font-inter)" }}
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
                    ) : (
                        <div className="flex items-center justify-center h-full text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
                            Waiting for data...
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-4`} style={{ letterSpacing: "-1.0px" }}>
                        Clicks by Country
                    </h2>
                    <div className="overflow-x-auto">
                        {data?.clicksByCountry?.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#262626]">
                                        <th className="py-3 px-4 text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                            Country
                                        </th>
                                        <th className="py-3 px-4 text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                            Clicks
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.clicksByCountry?.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-[#262626]/50 last:border-0"
                                        >
                                            <td className="py-3 px-4 text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                                {item.country}
                                            </td>
                                            <td className="py-3 px-4 text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                                {item.count}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex items-center justify-center py-8 text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
                                Waiting for data...
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#141414] border border-[#262626] rounded-[20px] p-6">
                    <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-4`} style={{ letterSpacing: "-1.0px" }}>
                        Views by Country
                    </h2>
                    <div className="overflow-x-auto">
                        {data?.viewsByCountry?.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#262626]">
                                        <th className="py-3 px-4 text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                            Country
                                        </th>
                                        <th className="py-3 px-4 text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: "500", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                            Views
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.viewsByCountry?.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-[#262626]/50 last:border-0"
                                        >
                                            <td className="py-3 px-4 text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                                {item.country}
                                            </td>
                                            <td className="py-3 px-4 text-[#999999]" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", letterSpacing: "-0.14px", lineHeight: "1.40" }}>
                                                {item.count}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex items-center justify-center py-8 text-[#999999]" style={{ fontFamily: "var(--font-inter)" }}>
                                Waiting for data...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
