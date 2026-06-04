"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
    GripVertical,
    Edit,
    Trash2,
    Lock,
    Check,
    X,
    Plus,
    Image as ImageIcon,
} from "lucide-react";
import { useLinksStore } from "../../../stores/linksStore";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { getTheme } from "../../../lib/themes";
import { getRandomEmoji, getAvatarBgColor } from "../../../lib/avatar";
import ThemePicker from "./ThemePicker";
import IconPicker from "../../../components/IconPicker";
import * as faIcons from "react-icons/fa";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function BuilderClient({
    initialLinks,
    isPro,
    currentTheme,
    user,
}) {
    const theme = getTheme(currentTheme);
    const { links, setLinks, addLink, updateLink, removeLink, reorderLinks } =
        useLinksStore();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [addTitle, setAddTitle] = useState("");
    const [addUrl, setAddUrl] = useState("");
    const [addIcon, setAddIcon] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [editIcon, setEditIcon] = useState(null);
    const [editingName, setEditingName] = useState(false);
    const [tempName, setTempName] = useState(user.name);
    const [editingBio, setEditingBio] = useState(false);
    const [tempBio, setTempBio] = useState(user.bio || "");
    const [savingProfile, setSavingProfile] = useState(false);
    const [iconPickerOpen, setIconPickerOpen] = useState(false);
    const [iconPickerTarget, setIconPickerTarget] = useState(null); // "add" or "edit"

    useEffect(() => {
        setLinks(initialLinks);
    }, [initialLinks, setLinks]);

    const handleSaveProfile = async () => {
        setSavingProfile(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: tempName, bio: tempBio }),
            });
            if (res.ok) {
                toast.success("Profile updated!");
                setEditingName(false);
                setEditingBio(false);
                // Refresh the page to get updated user data
                window.location.reload();
            } else {
                toast.error("Failed to update profile");
                setTempName(user.name);
                setTempBio(user.bio || "");
            }
        } catch (error) {
            toast.error("Failed to update profile");
            setTempName(user.name);
            setTempBio(user.bio || "");
        } finally {
            setSavingProfile(false);
        }
    };

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
                body: JSON.stringify({
                    title: addTitle,
                    url: addUrl,
                    icon: addIcon,
                }),
            });

            if (res.ok) {
                const newLink = await res.json();
                addLink(newLink);
                setAddTitle("");
                setAddUrl("");
                setAddIcon(null);
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
                body: JSON.stringify({
                    title: editTitle,
                    url: editUrl,
                    icon: editIcon,
                }),
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
        <div className="space-y-8 max-w-2xl mx-auto">
            <div>
                <h1
                    className={`${plusJakarta.className} text-3xl font-bold tracking-tight text-white`}
                    style={{ letterSpacing: "-1.0px" }}
                >
                    Link Builder
                </h1>
                <p
                    className="text-[#999999] mt-2"
                    style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "15px",
                        letterSpacing: "-0.15px",
                        lineHeight: "1.30",
                    }}
                >
                    Add and organize your Snapbio links
                </p>
            </div>

            {/* Preview Section */}
            <div className="bg-[#141414] rounded-[20px] p-6 border border-[#262626]">
                <h2
                    className={`${plusJakarta.className} text-xl font-bold text-white mb-4`}
                    style={{ letterSpacing: "-1.0px" }}
                >
                    Preview
                </h2>
                <div className="rounded-[20px] p-8 bg-[#090909]">
                    <div className="max-w-md mx-auto text-center space-y-4">
                        <div className="relative inline-block">
                            <div
                                className="absolute -inset-1 rounded-full blur-md opacity-50"
                                style={{ background: theme.accentGradient }}
                            />
                            {user.avatarUrl || user.image ? (
                                <img
                                    src={user.avatarUrl || user.image}
                                    alt={user.name}
                                    className="relative w-20 h-20 rounded-full object-cover border-2"
                                    style={{ borderColor: "#262626" }}
                                />
                            ) : (
                                <div
                                    className="relative w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2"
                                    style={{
                                        backgroundColor: user._id
                                            ? getAvatarBgColor(user._id)
                                            : "#6a4cf5",
                                        borderColor: "#262626",
                                    }}
                                >
                                    {user._id ? getRandomEmoji(user._id) : "😊"}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            {editingName ? (
                                <div className="flex items-center gap-2 justify-center">
                                    <input
                                        value={tempName}
                                        onChange={(e) =>
                                            setTempName(e.target.value)
                                        }
                                        className="px-3 py-1 bg-[#141414] text-white border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50 text-center"
                                        style={{
                                            fontFamily: "var(--font-inter)",
                                            fontSize: "15px",
                                            letterSpacing: "-0.15px",
                                            lineHeight: "1.30",
                                        }}
                                    />
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={savingProfile}
                                    >
                                        <Check className="w-4 h-4 text-[#22c55e]" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingName(false);
                                            setTempName(user.name);
                                        }}
                                    >
                                        <X className="w-4 h-4 text-[#999999]" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 justify-center">
                                    <h1
                                        className={`${plusJakarta.className} text-xl sm:text-2xl font-bold`}
                                        style={{
                                            color: "#FFFFFF",
                                            letterSpacing: "-1.0px",
                                        }}
                                    >
                                        {tempName}
                                    </h1>
                                    <button
                                        onClick={() => setEditingName(true)}
                                        className="p-1 rounded-full hover:bg-[#1c1c1c]"
                                    >
                                        <Edit className="w-4 h-4 text-[#999999]" />
                                    </button>
                                </div>
                            )}
                            <p
                                className="text-sm"
                                style={{
                                    color: "#999999",
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "15px",
                                    letterSpacing: "-0.15px",
                                    lineHeight: "1.30",
                                }}
                            >
                                @{user.username}
                            </p>
                        </div>

                        {editingBio ? (
                            <div className="flex flex-col items-center gap-2">
                                <textarea
                                    value={tempBio}
                                    onChange={(e) =>
                                        setTempBio(e.target.value.slice(0, 160))
                                    }
                                    className="w-full max-w-sm px-3 py-2 bg-[#141414] text-white border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50 text-center"
                                    style={{
                                        fontFamily: "var(--font-inter)",
                                        fontSize: "15px",
                                        letterSpacing: "-0.15px",
                                        lineHeight: "1.30",
                                    }}
                                    rows={2}
                                    placeholder="Write a bio"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={savingProfile}
                                    >
                                        <Check className="w-4 h-4 text-[#22c55e]" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingBio(false);
                                            setTempBio(user.bio || "");
                                        }}
                                    >
                                        <X className="w-4 h-4 text-[#999999]" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-2 justify-center">
                                {tempBio || user.bio ? (
                                    <p
                                        className="text-sm sm:text-base leading-relaxed max-w-sm mx-auto"
                                        style={{
                                            color: "#999999",
                                            fontFamily: "var(--font-inter)",
                                            fontSize: "15px",
                                            letterSpacing: "-0.15px",
                                            lineHeight: "1.30",
                                        }}
                                    >
                                        {tempBio}
                                    </p>
                                ) : (
                                    <p
                                        className="text-sm sm:text-base leading-relaxed max-w-sm mx-auto text-[#666666]"
                                        style={{
                                            fontFamily: "var(--font-inter)",
                                            fontSize: "15px",
                                            letterSpacing: "-0.15px",
                                            lineHeight: "1.30",
                                        }}
                                    >
                                        Add a bio
                                    </p>
                                )}
                                <button
                                    onClick={() => setEditingBio(true)}
                                    className="p-1 rounded-full hover:bg-[#1c1c1c]"
                                >
                                    <Edit className="w-4 h-4 text-[#999999]" />
                                </button>
                            </div>
                        )}

                        <div className="space-y-4 mt-8">
                            {links
                                .filter((l) => l.isActive !== false)
                                .map((link) => {
                                    const IconComp = link.icon ? faIcons[`Fa${link.icon}`] : null;
                                    return (
                                        <div
                                            key={link._id}
                                            className="flex items-center justify-center gap-3 px-4 py-3 rounded-[20px] text-center font-medium"
                                            style={{
                                                background: theme.buttonBg,
                                                color: theme.buttonText,
                                                fontFamily: "var(--font-inter)",
                                                fontSize: "14px",
                                                letterSpacing: "-0.14px",
                                                lineHeight: "1.0",
                                            }}
                                        >
                                            {IconComp && <IconComp className="w-5 h-5" />}
                                            {link.title}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="links">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-4"
                        >
                            {links.map((link, index) => (
                                <Draggable
                                    key={link._id}
                                    draggableId={link._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`bg-[#141414] rounded-[20px] p-4 border border-[#262626] ${
                                                snapshot.isDragging
                                                    ? "opacity-80"
                                                    : ""
                                            }`}
                                        >
                                            {editingId === link._id ? (
                                                <div className="space-y-4">
                                                    <input
                                                        value={editTitle}
                                                        onChange={(e) =>
                                                            setEditTitle(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Title"
                                                        className="w-full px-4 py-3 bg-[#141414] text-white placeholder:text-[#999999] border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-inter)",
                                                            fontSize: "15px",
                                                            letterSpacing:
                                                                "-0.15px",
                                                            lineHeight: "1.30",
                                                        }}
                                                    />
                                                    <input
                                                        value={editUrl}
                                                        onChange={(e) =>
                                                            setEditUrl(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="URL"
                                                        className="w-full px-4 py-3 bg-[#141414] text-white placeholder:text-[#999999] border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-inter)",
                                                            fontSize: "15px",
                                                            letterSpacing:
                                                                "-0.15px",
                                                            lineHeight: "1.30",
                                                        }}
                                                    />
                                                    {/* Icon Picker Button for Edit */}
                                                    <button
                                                        onClick={() => {
                                                            setIconPickerTarget(
                                                                "edit",
                                                            );
                                                            setIconPickerOpen(
                                                                true,
                                                            );
                                                        }}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] bg-[#090909] border border-[#262626] hover:bg-[#1c1c1c] transition-colors"
                                                    >
                                                        {editIcon ? (
                                                            <>
                                                                {(() => {
                                                                    const IconComp =
                                                                        faIcons[
                                                                            `Fa${editIcon}`
                                                                        ];
                                                                    return IconComp ? (
                                                                        <IconComp className="w-5 h-5 text-white" />
                                                                    ) : null;
                                                                })()}
                                                                <span
                                                                    className="text-white font-medium"
                                                                    style={{
                                                                        fontFamily:
                                                                            "var(--font-inter)",
                                                                        fontSize:
                                                                            "14px",
                                                                        letterSpacing:
                                                                            "-0.14px",
                                                                        lineHeight:
                                                                            "1.0",
                                                                    }}
                                                                >
                                                                    {editIcon}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ImageIcon className="w-5 h-5 text-[#999999]" />
                                                                <span
                                                                    className="text-[#999999] font-medium"
                                                                    style={{
                                                                        fontFamily:
                                                                            "var(--font-inter)",
                                                                        fontSize:
                                                                            "14px",
                                                                        letterSpacing:
                                                                            "-0.14px",
                                                                        lineHeight:
                                                                            "1.0",
                                                                    }}
                                                                >
                                                                    Choose an
                                                                    icon
                                                                </span>
                                                            </>
                                                        )}
                                                    </button>
                                                    <div className="flex gap-3 justify-end">
                                                        <button
                                                            onClick={() =>
                                                                setEditingId(
                                                                    null,
                                                                )
                                                            }
                                                            className="px-4 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors border border-[#262626]"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-inter)",
                                                                fontSize:
                                                                    "14px",
                                                                letterSpacing:
                                                                    "-0.14px",
                                                                lineHeight:
                                                                    "1.0",
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleEditLink(
                                                                    link._id,
                                                                )
                                                            }
                                                            className="px-4 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-inter)",
                                                                fontSize:
                                                                    "14px",
                                                                letterSpacing:
                                                                    "-0.14px",
                                                                lineHeight:
                                                                    "1.0",
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="cursor-grab active:cursor-grabbing text-[#999999] hover:text-white"
                                                    >
                                                        <GripVertical className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p
                                                            className="text-white truncate"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-inter)",
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    "500",
                                                                letterSpacing:
                                                                    "-0.14px",
                                                                lineHeight:
                                                                    "1.40",
                                                            }}
                                                        >
                                                            {link.title}
                                                        </p>
                                                        <p
                                                            className="text-[#999999] truncate"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-inter)",
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight:
                                                                    "400",
                                                                letterSpacing:
                                                                    "-0.12px",
                                                                lineHeight:
                                                                    "1.20",
                                                            }}
                                                        >
                                                            {link.url}
                                                        </p>
                                                    </div>
                                                    {/* Toggle switch here, styled to match */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditTitle(
                                                                    link.title,
                                                                );
                                                                setEditUrl(
                                                                    link.url,
                                                                );
                                                                setEditIcon(
                                                                    link.icon ||
                                                                        null,
                                                                );
                                                                setEditingId(
                                                                    link._id,
                                                                );
                                                            }}
                                                            className="p-2 rounded-full text-[#999999] hover:text-white hover:bg-[#1c1c1c] transition-colors"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteLink(
                                                                    link._id,
                                                                )
                                                            }
                                                            className="p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {isAdding ? (
                <div className="bg-[#141414] rounded-[20px] p-4 border border-[#262626]">
                    <div className="space-y-4">
                        <input
                            value={addTitle}
                            onChange={(e) => setAddTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full px-4 py-3 bg-[#141414] text-white placeholder:text-[#999999] border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "15px",
                                letterSpacing: "-0.15px",
                                lineHeight: "1.30",
                            }}
                        />
                        <input
                            value={addUrl}
                            onChange={(e) => setAddUrl(e.target.value)}
                            placeholder="URL"
                            className="w-full px-4 py-3 bg-[#141414] text-white placeholder:text-[#999999] border border-[#262626] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#0099ff]/50"
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "15px",
                                letterSpacing: "-0.15px",
                                lineHeight: "1.30",
                            }}
                        />
                        {/* Icon Picker Button */}
                        <button
                            onClick={() => {
                                setIconPickerTarget("add");
                                setIconPickerOpen(true);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] bg-[#090909] border border-[#262626] hover:bg-[#1c1c1c] transition-colors"
                        >
                            {addIcon ? (
                                <>
                                    {(() => {
                                        const IconComp = faIcons[`Fa${addIcon}`];
                                        return IconComp ? (
                                            <IconComp className="w-5 h-5 text-white" />
                                        ) : null;
                                    })()}
                                    <span
                                        className="text-white font-medium"
                                        style={{
                                            fontFamily: "var(--font-inter)",
                                            fontSize: "14px",
                                            letterSpacing: "-0.14px",
                                            lineHeight: "1.0",
                                        }}
                                    >
                                        {addIcon}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="w-5 h-5 text-[#999999]" />
                                    <span
                                        className="text-[#999999] font-medium"
                                        style={{
                                            fontFamily: "var(--font-inter)",
                                            fontSize: "14px",
                                            letterSpacing: "-0.14px",
                                            lineHeight: "1.0",
                                        }}
                                    >
                                        Choose an icon
                                    </span>
                                </>
                            )}
                        </button>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setAddIcon(null);
                                }}
                                className="px-4 py-3 rounded-full bg-[#141414] text-white font-medium hover:bg-[#1c1c1c] transition-colors border border-[#262626]"
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "14px",
                                    letterSpacing: "-0.14px",
                                    lineHeight: "1.0",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddLink}
                                className="px-4 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "14px",
                                    letterSpacing: "-0.14px",
                                    lineHeight: "1.0",
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    disabled={isAtLinkLimit}
                    className="w-full px-4 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                        letterSpacing: "-0.14px",
                        lineHeight: "1.0",
                    }}
                >
                    {isAtLinkLimit ? (
                        <>
                            <Lock className="w-4 h-4" />
                            Upgrade to Pro for unlimited links
                        </>
                    ) : (
                        "Add Link"
                    )}
                </button>
            )}

            <div className="bg-[#141414] rounded-[20px] p-6 border border-[#262626]">
                <h2 className={`${plusJakarta.className} text-xl font-bold text-white mb-4`} style={{ letterSpacing: "-1.0px" }}>
                    Appearance
                </h2>
                <ThemePicker currentTheme={currentTheme} isPro={isPro} />
            </div>

            {/* Icon Picker Modal */}
            <IconPicker
                selectedIcon={
                    iconPickerTarget === "add" ? addIcon :
                    iconPickerTarget === "edit" ? editIcon : null
                }
                onSelectIcon={(iconName) => {
                    if (iconPickerTarget === "add") {
                        setAddIcon(iconName);
                    } else if (iconPickerTarget === "edit") {
                        setEditIcon(iconName);
                    }
                    setIconPickerOpen(false);
                }}
                onClearIcon={() => {
                    if (iconPickerTarget === "add") {
                        setAddIcon(null);
                    } else if (iconPickerTarget === "edit") {
                        setEditIcon(null);
                    }
                    setIconPickerOpen(false);
                }}
                isOpen={iconPickerOpen}
                onClose={() => setIconPickerOpen(false)}
            />
        </div>
    );
}
