"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Edit, Trash2, Lock } from "lucide-react";
import { useLinksStore } from "../../../stores/linksStore";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import ThemePicker from "./ThemePicker";

export default function BuilderClient({ initialLinks, isPro, currentTheme }) {
    const { links, setLinks, addLink, updateLink, removeLink, reorderLinks } =
        useLinksStore();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [addTitle, setAddTitle] = useState("");
    const [addUrl, setAddUrl] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editUrl, setEditUrl] = useState("");

    useEffect(() => {
        setLinks(initialLinks);
    }, [initialLinks, setLinks]);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(links);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const newOrder = items.map((item, index) => ({
            id: item._id,
            order: index,
        }));

        // Optimistic update
        reorderLinks(items);

        try {
            await fetch("/api/links/reorder", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: newOrder }),
            });
        } catch (error) {
            toast.error("Failed to reorder links");
            reorderLinks(initialLinks);
        }
    };

    const handleAddLink = async () => {
        if (!addTitle || !addUrl) return;

        try {
            const res = await fetch("/api/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: addTitle, url: addUrl }),
            });

            if (res.ok) {
                const newLink = await res.json();
                addLink(newLink);
                setAddTitle("");
                setAddUrl("");
                setIsAdding(false);
                toast.success("Link added!");
            } else {
                const data = await res.json();
                if (data.error === "upgrade_required") {
                    toast.error("Upgrade to Pro for unlimited links");
                } else {
                    toast.error(data.error || "Failed to add link");
                }
            }
        } catch (error) {
            toast.error("Failed to add link");
        }
    };

    const handleEditLink = async (id) => {
        if (!editTitle || !editUrl) return;

        try {
            const res = await fetch(`/api/links/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editTitle, url: editUrl }),
            });

            if (res.ok) {
                const updatedLink = await res.json();
                updateLink(id, updatedLink);
                setEditingId(null);
                toast.success("Link updated!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update link");
            }
        } catch (error) {
            toast.error("Failed to update link");
        }
    };

    const handleDeleteLink = async (id) => {
        try {
            const res = await fetch(`/api/links/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                removeLink(id);
                toast.success("Link deleted!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete link");
            }
        } catch (error) {
            toast.error("Failed to delete link");
        }
    };

    const handleToggleActive = async (id, isActive) => {
        try {
            const res = await fetch(`/api/links/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive }),
            });

            if (res.ok) {
                const updatedLink = await res.json();
                updateLink(id, updatedLink);
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update link");
                // Revert
                updateLink(id, { isActive: !isActive });
            }
        } catch (error) {
            toast.error("Failed to update link");
            updateLink(id, { isActive: !isActive });
        }
    };

    const isAtLinkLimit = !isPro && links.length >= 5;

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white">
                    Link Builder
                </h1>
                <p className="text-[#94A3B8] mt-1">
                    Add and organize your Snapbio links
                </p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="links">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-3"
                        >
                            {links.map((link, index) => (
                                <Draggable
                                    key={link._id}
                                    draggableId={link._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`bg-[#13131A] border border-[#2A2A35] rounded-xl ${
                                                snapshot.isDragging
                                                    ? "opacity-80"
                                                    : ""
                                            }`}
                                        >
                                            <CardContent className="p-4">
                                                {editingId === link._id ? (
                                                    <div className="space-y-3">
                                                        <Input
                                                            value={editTitle}
                                                            onChange={(e) =>
                                                                setEditTitle(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Title"
                                                            className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full"
                                                        />
                                                        <Input
                                                            value={editUrl}
                                                            onChange={(e) =>
                                                                setEditUrl(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="URL"
                                                            className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full"
                                                        />
                                                        <div className="flex gap-2 justify-end">
                                                            <Button
                                                                onClick={() =>
                                                                    setEditingId(
                                                                        null,
                                                                    )
                                                                }
                                                                className="rounded-full bg-[#13131A] border border-[#2A2A35] hover:bg-[#1A1A22]"
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleEditLink(
                                                                        link._id,
                                                                    )
                                                                }
                                                                className="rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 hover:opacity-90"
                                                            >
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="cursor-grab active:cursor-grabbing text-[#94A3B8] hover:text-white"
                                                        >
                                                            <GripVertical className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-white truncate">
                                                                {link.title}
                                                            </p>
                                                            <p className="text-xs text-[#94A3B8] truncate">
                                                                {link.url}
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                link.isActive
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                handleToggleActive(
                                                                    link._id,
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => {
                                                                setEditTitle(
                                                                    link.title,
                                                                );
                                                                setEditUrl(
                                                                    link.url,
                                                                );
                                                                setEditingId(
                                                                    link._id,
                                                                );
                                                            }}
                                                            className="text-[#94A3B8] hover:text-white hover:bg-white/5"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleDeleteLink(
                                                                    link._id,
                                                                )
                                                            }
                                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {isAdding ? (
                <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                    <CardContent className="p-4 space-y-3">
                        <Input
                            value={addTitle}
                            onChange={(e) => setAddTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full"
                        />
                        <Input
                            value={addUrl}
                            onChange={(e) => setAddUrl(e.target.value)}
                            placeholder="URL"
                            className="w-full bg-transparent border border-[#2A2A35] text-white placeholder:text-[#94A3B8] rounded-full"
                        />
                        <div className="flex gap-2 justify-end">
                            <Button
                                onClick={() => setIsAdding(false)}
                                className="rounded-full bg-[#13131A] border border-[#2A2A35] hover:bg-[#1A1A22]"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddLink}
                                className="rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 hover:opacity-90"
                            >
                                Add
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Button
                    onClick={() => setIsAdding(true)}
                    disabled={isAtLinkLimit}
                    className="w-full rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 hover:opacity-90"
                >
                    {isAtLinkLimit ? (
                        <>
                            <Lock className="w-4 h-4 mr-2" />
                            Upgrade to Pro for unlimited links
                        </>
                    ) : (
                        "Add Link"
                    )}
                </Button>
            )}

            <Card className="bg-[#13131A] border border-[#2A2A35] rounded-xl">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">
                        Appearance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ThemePicker currentTheme={currentTheme} isPro={isPro} />
                </CardContent>
            </Card>
        </div>
    );
}
