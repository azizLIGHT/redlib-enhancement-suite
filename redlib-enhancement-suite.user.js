// ==UserScript==
// @name         Redlib Enhancement Suite
// @namespace    https://github.com/azizLIGHT/redlib-enhancement-suite
// @version      1.1.4
// @description  A comprehensive userscript that supercharges your Redlib experience with RES-style features, smooth animations, and powerful customization options.
// @author       azizLIGHT
// @match        https://redlib.catsarch.com/*
// @match        https://redlib.freedit.eu/*
// @match        https://red.artemislena.eu/*
// @match        https://redlib.privacyredirect.com/*
// @match        https://r.darklab.sh/*
// @match        https://redlib.minihoot.site/*
// @match        https://rl.blitzw.in/*
// @match        https://redlib.nohost.network/*
// @match        https://redlib.jaydenha.uk/*
// @match        https://redlib.private.coffee/*
// @match        https://redlib.einfachzocken.eu/*
// @match        https://redlib.astrial.org/*
// @match        https://libreddit.privacydev.net/*
// @match        https://rl.bloat.cat/*
// @match        https://redlib.ducks.party/*
// @match        https://redlib.nadeko.net/*
// @match        https://redlib.4o1x5.dev/*
// @match        https://redlib.zaggy.nl/*
// @match        https://libreddit.kavin.rocks/*
// @match        https://libreddit.bus-hit.me/*
// @match        https://redlib.seasi.dev/*
// @match        https://rl.citw.lgbt/*
// @match        https://reddit.rtrace.io/*
// @match        https://lr.ggtyler.dev/*
// @match        https://red.arancia.click/*
// @match        https://redlib.privacy.com.de/*
// @match        https://redlib.kylrth.com/*
// @match        https://libreddit.eu.org/*
// @match        https://nyc1.lr.ggtyler.dev/*
// @match        https://l.opnxng.com/*
// @match        https://reddit.idevicehacked.com/*
// @match        https://redlib.privadency.com/*
// @match        https://redlib.thebunny.zone/*
// @match        https://redlib.perennialte.ch/*
// @match        https://redlib.r4fo.com/*
// @match        https://red.ngn.tf/*
// @match        https://reddit.nerdvpn.de/*
// @match        https://redlib.reallyaweso.me/*
// @match        https://safereddit.com/*
// @grant        none
// @homepageURL https://github.com/azizLIGHT/redlib-enhancement-suite
// @supportURL  https://github.com/azizLIGHT/redlib-enhancement-suite/issues
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    // Script version - update this when you change @version above
    const SCRIPT_VERSION = '1.1.4';


    // ============================================================================
    // COMBINED CSS STYLES
    // ============================================================================
    function addCombinedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ========== POST COLLAPSER STYLES ========== */

            /* Manual text expansion when button is clicked */
            .post_preview.redlib-text-expanded {
                -webkit-mask-image: none !important;
                mask-image: none !important;
                opacity: 1 !important;
                max-height: none !important;
                overflow: visible !important;
            }

            /* Minimized state without fadeout effect */
            .post.redlib-text-minimized .post_body,
            .post.redlib-text-minimized .post_media_content,
            .post.redlib-text-minimized .gallery,
            .post.redlib-text-minimized .post_thumbnail {
                display: none !important;
            }

            /* Keep thumbnails visible in minimized state for post listing pages */
            .post.redlib-text-minimized .post_thumbnail {
                display: block !important;
                max-width: 140px !important;
                max-height: 140px !important;
            }

            .post.redlib-text-minimized .post_thumbnail div {
                max-width: 140px !important;
                max-height: 140px !important;
            }

            .post.redlib-text-minimized .post_thumbnail svg {
                width: 140px !important;
                height: 140px !important;
                max-width: 140px !important;
                max-height: 140px !important;
            }

            /* Expand button styling */
            .redlib-expand-btn {
                background: var(--color-bg, #1a1a1b);
                border: 1px solid var(--color-border, #343536);
                color: var(--color-text, #d7dadc);
                cursor: pointer;
                font-size: 12px;
                font-weight: bold;
                margin-right: 8px;
                padding: 2px 6px;
                border-radius: 3px;
                min-width: 24px;
                line-height: 1;
            }

            /* Hide expand button when post is collapsed/hidden */
            .redlib-collapsed .redlib-expand-btn {
                display: none !important;
            }

.redlib-expand-btn:hover {
    background: var(--accent, #d54455);
    color: var(--foreground, #222);
}

            .redlib-expand-btn:active {
                transform: scale(0.95);
            }

            /* Collapsed post styling - only for post listing pages, NOT comment pages */
            .redlib-collapsed:not(.highlighted) {
                opacity: 0.3;
                filter: grayscale(0.4) blur(0.5px);
                transform: scale(0.98);
                transition: all 0.3s ease;
            }

            .redlib-collapsed:not(.highlighted):hover {
                opacity: 0.8;
                filter: grayscale(0.1) blur(0px);
                transform: scale(1);
            }

            /* Collapsed post thumbnails - keep visible but make smaller */
            .redlib-collapsed .post_thumbnail {
                display: block !important;
                max-width: 140px !important;
                max-height: 140px !important;
            }

            .redlib-collapsed .post_thumbnail div {
                max-width: 140px !important;
                max-height: 140px !important;
            }

            .redlib-collapsed .post_thumbnail svg {
                width: 140px !important;
                height: 140px !important;
                max-width: 140px !important;
                max-height: 140px !important;
            }

            /* Hide original media content when video thumbnail is shown */
            .redlib-collapsed .post_media_content[data-hidden-for-thumbnail] {
                display: none !important;
            }

            /* Keep gallery thumbnails visible in collapsed state */
            .redlib-collapsed .gallery {
                display: block !important;
                max-height: 140px !important;
                overflow: hidden !important;
            }

            .redlib-collapsed .gallery figure {
                max-width: 140px !important;
                max-height: 140px !important;
            }

            .redlib-collapsed .gallery img {
                max-width: 140px !important;
                max-height: 140px !important;
                object-fit: cover !important;
            }

            /* Comment page posts stay normal when collapsed - you came here to see this specific post */
            .redlib-collapsed.highlighted {
                opacity: 1;
                filter: none;
                transform: none;
            }

            .redlib-collapse-btn {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                background: var(--color-bg, #1a1a1b) !important;
                border: 1px solid var(--color-border, #343536) !important;
                color: var(--color-text, #d7dadc) !important;
                cursor: pointer !important;
                font-size: 14px !important;
                font-weight: bold !important;
                padding: 4px 6px !important;
                border-radius: 3px !important;
                min-width: 28px !important;
                line-height: 1 !important;
                z-index: 1 !important;
                transition: all 0.2s ease !important;
            }

.redlib-collapse-btn:hover {
    background: var(--accent, #d54455) !important;
    color: var(--foreground, #222) !important;
    transform: scale(1.05) !important;
}

            .redlib-collapse-btn:active {
                transform: scale(0.95) !important;
            }

/* Ensure posts have relative positioning for absolute button */
.post {
    position: relative !important;
}

/* Smooth height transitions for hide/unhide */
.post.redlib-animating {
    transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
}

/* Prevent expand button from interfering during transitions */
.post.redlib-animating .redlib-expand-btn {
    pointer-events: none;
    opacity: 0.7;
}

.post.redlib-animating .redlib-collapse-btn {
    pointer-events: none;
    opacity: 0.7;
}

/* Smooth height transitions for expand/collapse buttons */
.post.redlib-text-animating {
    transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
}

/* Prevent button interference during text transitions */
.post.redlib-text-animating .redlib-expand-btn {
    pointer-events: none;
    opacity: 0.7;
}

            /* Ensure post header elements stay visible when collapsed */
            .redlib-collapsed .post_header {
                display: block !important;
            }

            /* Smooth transition for collapse/expand */
            .redlib-collapsible {
                transition: all 0.2s ease;
            }

            /* Ensure collapsed posts take minimal space */
            .redlib-collapsed {
                min-height: auto !important;
                height: auto !important;
            }

            /* Force proper layout recalculation */
            #posts {
                height: auto !important;
                min-height: auto !important;
            }

            main {
                height: auto !important;
                min-height: auto !important;
            }

            body {
                height: auto !important;
                min-height: 100vh !important;
            }

            /* Ensure hidden elements don't reserve space */
            .redlib-collapsible[style*="display: none"] {
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                overflow: hidden !important;
            }

            /* FLOATING VIDEO PLAYER STYLES */
            .redlib-floating-video {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: black;
                border: 2px solid var(--highlighted, #333);
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                min-width: 200px;
                max-width: 90vw;
                max-height: 90vh;
            }

            /* Min-height only applies when NOT minimized */
            .redlib-floating-video:not(.minimized) {
                min-height: 150px;
            }

            /* Invisible resize handles on all corners */
            .redlib-resize-handle {
                position: absolute;
                z-index: 10001;
                background: transparent;
                width: 15px;
                height: 15px;
            }

            .redlib-resize-se {
                bottom: -5px;
                right: -5px;
                cursor: se-resize;
            }

            .redlib-resize-nw {
                top: -5px;
                left: -5px;
                cursor: nw-resize;
            }

            .redlib-resize-ne {
                top: -5px;
                right: -5px;
                cursor: ne-resize;
            }

            .redlib-resize-sw {
                bottom: -5px;
                left: -5px;
                cursor: sw-resize;
            }

            /* Hide resize handles when minimized */
            .redlib-floating-video.minimized .redlib-resize-handle {
                display: none;
            }

            /* Vertical video adjustments - only when NOT minimized */
            .redlib-floating-video.vertical-video:not(.minimized) {
                bottom: 20px;
                right: 20px;
                min-width: 150px;
                min-height: 200px;
            }

            .redlib-floating-video.minimized {
                height: 32px !important;
                width: 200px !important;
                bottom: 0px !important;
                right: 20px !important;
                left: auto !important;
                top: auto !important;
                transform: none !important;
                position: fixed !important;
                z-index: 10001 !important;
                background: var(--foreground, #222) !important;
                border: 1px solid var(--highlighted, #333) !important;
                border-bottom: none !important;
                border-radius: 4px 4px 0 0 !important;
                box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3) !important;
                overflow: hidden !important;
            }

            .redlib-floating-video.minimized .redlib-floating-video-content {
                display: none !important;
            }

            .redlib-floating-video.minimized .redlib-floating-video-header {
                background: transparent !important;
                border-bottom: none !important;
                padding: 6px 8px !important;
                height: 32px !important;
                font-size: 12px !important;
                margin: 0 !important;
                box-sizing: border-box !important;
            }

            .redlib-floating-video.minimized .redlib-floating-video-title {
                font-size: 11px !important;
                font-weight: normal !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                white-space: nowrap !important;
                max-width: 120px !important;
            }

            .redlib-floating-video.minimized .redlib-floating-video-controls button {
                width: 16px !important;
                height: 16px !important;
                font-size: 10px !important;
                padding: 0 !important;
                line-height: 1 !important;
            }

            .redlib-floating-video-header {
                background: var(--foreground, #222);
                padding: 8px 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: grab;
                user-select: none;
                border-bottom: 1px solid var(--highlighted, #333);
                flex-shrink: 0;
                height: 40px;
                box-sizing: border-box;
            }

            .redlib-floating-video-header:active {
                cursor: grabbing;
            }

            .redlib-floating-video-title {
                color: var(--text, #d7dadc);
                font-size: 14px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .redlib-floating-video-controls {
                display: flex;
                gap: 4px;
                flex-shrink: 0;
            }

            .redlib-floating-video-minimize,
            .redlib-floating-video-close {
                background: var(--highlighted, #333);
                border: 1px solid var(--accent, #d54455);
                color: var(--text, #d7dadc);
                width: 24px;
                height: 24px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
                line-height: 1;
                flex-shrink: 0;
            }

            .redlib-floating-video-minimize:hover,
            .redlib-floating-video-close:hover {
                background: var(--accent, #d54455);
                color: var(--foreground, #222);
            }

            .redlib-floating-video-content {
                flex: 1;
                display: flex;
                background: black;
                min-height: 0;
                position: relative;
                overflow: hidden;
            }

            .redlib-floating-video-content video {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
            }

            /* Hide quality selector in floating video player */
            .redlib-floating-video-content .quality-selector {
                display: none !important;
            }

            /* FIXED: Basic post styling - NO automatic sticky positioning */
            body:has(.post.highlighted) .post.highlighted {
                background: var(--post, #161616) !important;
                border-bottom: 1px solid var(--highlighted, #333) !important;
                margin-bottom: 16px !important;
                padding-bottom: 12px !important;
            }

            /* FIXED: Sticky mode activated with solid background and high z-index */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode {
                position: fixed !important;
                top: var(--nav-height, 60px) !important;
                /* Width, left, and transform will be set by JavaScript */
                margin: 0 !important;
                padding: 4px 16px !important;
                border-bottom: 2px solid var(--highlighted, #333) !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
                background: var(--post, #161616) !important;
                cursor: pointer !important;
                z-index: 1000 !important;

                /* Ensure completely opaque background */
                background-color: #161616 !important;
                opacity: 1 !important;
            }

            /* Compact header in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_header {
                margin: 2px 0 !important;
                line-height: 1.2 !important;
                font-size: 13px !important;
            }

            /* Compact score in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_score {
                padding: 2px 8px !important;
                font-size: 12px !important;
                min-width: 30px !important;
            }

            /* Hide collapse button on comment pages - only auto-collapse via scroll */
            body:has(.post.highlighted) .post.highlighted .redlib-collapse-btn {
                display: none !important;
            }

            /* Hover effect for sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
                border-bottom-color: var(--accent, #d54455) !important;
            }

            /* Hide footer links when in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_footer {
                display: none !important;
            }

            /* Keep collapsed posts solid in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode.redlib-collapsed {
                opacity: 1 !important;
            }

            /* ONLY compact content when in sticky mode (scrolled down) */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body {
                max-height: 3em !important;
                overflow: hidden !important;
                line-height: 1.4 !important;
                display: -webkit-box !important;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical !important;
            }

            /* When sticky mode is expanded (on hover), make text scrollable */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode:not(.redlib-collapsed) .post_body {
                max-height: 120px !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                display: block !important;
                -webkit-line-clamp: unset !important;
                -webkit-box-orient: unset !important;
                line-height: 1.4 !important;
                padding: 8px !important;
                margin: 4px 0 !important;
                border: 1px solid var(--highlighted, #333) !important;
                border-radius: 4px !important;
            }

            /* Style the scrollbar in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar {
                width: 6px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar-track {
                background: var(--background, #0f0f0f) !important;
                border-radius: 3px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar-thumb {
                background: var(--accent, #d54455) !important;
                border-radius: 3px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar-thumb:hover {
                background: var(--highlighted, #333) !important;
            }

            /* ONLY compact gallery when in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .gallery {
                display: flex !important;
                gap: 8px !important;
                overflow-x: auto !important;
                max-height: 120px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .gallery figure {
                flex-shrink: 0 !important;
                width: 80px !important;
                height: 80px !important;
                margin: 0 !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .gallery img {
                width: 80px !important;
                height: 80px !important;
                object-fit: cover !important;
                border-radius: 4px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .gallery figcaption {
                display: none !important;
            }

            /* ONLY compact video when in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_video {
                max-width: 200px !important;
                max-height: 120px !important;
            }

            /* ONLY compact other media when in sticky mode */
            /* Make single images behave like gallery thumbnails in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_content:not(:has(.gallery)) {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                max-height: 80px !important;
                overflow: hidden !important;
                margin: 4px 0 !important;
            }

            /* Style the single image link container to be thumbnail-sized */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_content:not(:has(.gallery)) .post_media_image {
                max-width: 80px !important;
                max-height: 80px !important;
                width: 80px !important;
                height: 80px !important;
                flex-shrink: 0 !important;
                display: block !important;
                border-radius: 4px !important;
                overflow: hidden !important;
            }

            /* Style SVG elements within single images */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_content:not(:has(.gallery)) .post_media_image svg {
                width: 80px !important;
                height: 80px !important;
                max-width: 80px !important;
                max-height: 80px !important;
                object-fit: cover !important;
                border-radius: 4px !important;
            }

            /* Style SVG image elements */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_content:not(:has(.gallery)) .post_media_image svg image {
                width: 80px !important;
                height: 80px !important;
                object-fit: cover !important;
            }

            /* Style direct img elements within single images */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_content:not(:has(.gallery)) .post_media_image img {
                width: 80px !important;
                height: 80px !important;
                object-fit: cover !important;
                border-radius: 4px !important;
            }

            /* Fallback for any remaining single image rules */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_media_image {
                max-width: 80px !important;
                max-height: 80px !important;
                object-fit: cover !important;
                border-radius: 4px !important;
            }

            /* Collapsed state overrides for comment pages - revert to original behavior (no thumbnails) */
            body:has(.post.highlighted) .post.highlighted.redlib-collapsed .post_body,
            body:has(.post.highlighted) .post.highlighted.redlib-collapsed .post_media_content,
            body:has(.post.highlighted) .post.highlighted.redlib-collapsed .gallery,
            body:has(.post.highlighted) .post.highlighted.redlib-collapsed .post_thumbnail {
                display: none !important;
            }

            /* Force collapsed appearance immediately after clicking hide, even on hover */
.redlib-just-collapsed:not(.highlighted) {
    opacity: 0.3 !important;
    filter: grayscale(0.4) blur(0.5px) !important;
    transform: scale(0.98) !important;
    transition: all 0.3s ease !important;
}

/* ========== HOVER COMMENTS STYLES ========== */

._redlib_popup {
    position: absolute;
    background: var(--color-bg, #1a1a1b);
    border: 1px solid var(--color-border, #343536);
    border-radius: 4px;
    padding: 0;
    z-index: 9999;
    max-width: 600px;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 12px;
    line-height: 1.3;
    display: none;
    color: var(--color-text, #d7dadc);
    box-sizing: border-box;
}

/* Reset all comment backgrounds - consistent spacing */
._redlib_popup .comment,
._redlib_popup .reply {
    background-color: transparent !important;
    border: none !important;
    margin: 0 !important;
    padding: 8px !important;
    border-radius: 0;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
    display: block;
    width: 100% !important;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

._redlib_popup .comment:last-child,
._redlib_popup .reply:last-child {
    border-bottom: none !important;
}

/* Replies containers - consistent 12px indentation per level, NO VERTICAL LINES */
._redlib_popup .replies {
    margin-left: 16px !important;
    margin-top: 0 !important;
    border-left: none !important;
    padding-left: 8px !important;
}

/* ALTERNATING BACKGROUND COLORS BY DEPTH */

/* Top level comments - GRAY */
._redlib_popup > .comment:not(.reply) {
    background-color: #161616 !important;
}

/* Level 1 children - BLACK */
._redlib_popup .replies > .reply {
    background-color: #1f1f1f !important;
}

/* Level 2 children - GRAY */
._redlib_popup .replies .replies > .reply {
    background-color: #161616 !important;
}

/* Level 3 children - BLACK */
._redlib_popup .replies .replies .replies > .reply {
    background-color: #1f1f1f !important;
}

/* Level 4 children - GRAY */
._redlib_popup .replies .replies .replies .replies > .reply {
    background-color: #161616 !important;
}

/* Level 5 children - BLACK */
._redlib_popup .replies .replies .replies .replies .replies > .reply {
    background-color: #1f1f1f !important;
}

/* Level 6 children - GRAY */
._redlib_popup .replies .replies .replies .replies .replies .replies > .reply {
    background-color: #161616 !important;
}

/* Level 7 children - BLACK */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: #1f1f1f !important;
}

/* Level 8 children - GRAY */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: #161616 !important;
}

/* Level 9 children - BLACK */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: #1f1f1f !important;
}

/* Level 10 children - GRAY */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: #161616 !important;
}

._redlib_popup .comment_header {
    margin-bottom: 3px;
    font-size: 12px;
    color: var(--color-text-muted, #818384);
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 6px;
}

._redlib_popup .comment_author {
    color: var(--accent, #0079d3);
    font-weight: normal;
    text-decoration: none;
    white-space: nowrap;
}

._redlib_popup .comment_author:hover {
    text-decoration: underline;
}

._redlib_popup .comment_meta_separator {
    margin: 0 2px;
    color: var(--color-text-muted, #818384);
}

._redlib_popup .comment_points {
    white-space: nowrap;
}

._redlib_popup .comment_time {
    white-space: nowrap;
}

._redlib_popup .comment_body {
    font-size: 13px;
    line-height: 1.4;
    color: var(--color-text, #d7dadc);
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    display: block;
    width: 100%;
    clear: both;
    box-sizing: border-box;
}

._redlib_popup .comment_body p {
    margin: 0 0 0.5em 0;
}

._redlib_popup .comment_body p:last-child {
    margin-bottom: 0;
}

._redlib_popup .comment_body blockquote {
    margin: 0.3em 0;
    padding-left: 0.8em;
    border-left: 2px solid var(--color-border, #343536);
    color: var(--color-text-muted, #818384);
}

._redlib_popup .comment_body code {
    background: var(--color-code-bg, rgba(255,255,255,0.1));
    padding: 1px 3px;
    border-radius: 2px;
    font-size: 0.9em;
}

._redlib_popup .comment_body pre {
    background: var(--color-code-bg, rgba(255,255,255,0.1));
    padding: 6px;
    border-radius: 3px;
    overflow-x: auto;
    margin: 0.3em 0;
    word-wrap: break-word;
    white-space: pre-wrap;
}

._redlib_popup .comment_body a {
    word-break: break-all;
    overflow-wrap: break-word;
}

._redlib_popup .comment_body * {
    max-width: 100%;
    box-sizing: border-box;
}

._redlib_popup .next_reply {
    color: var(--accent, #0079d3);
    cursor: pointer;
    font-size: 11px;
    margin-top: 4px;
    padding: 3px 5px;
    border-radius: 3px;
    background: var(--color-toggle-bg, rgba(255,255,255,0.05));
    display: inline-block;
    user-select: none;
    border: 1px solid transparent;
}

._redlib_popup .next_reply:hover {
    background: var(--color-toggle-hover, rgba(255,255,255,0.1));
    border-color: var(--accent, #0079d3);
}

._redlib_popup .loading {
    text-align: center;
    padding: 8px 10px;
    color: var(--color-text-muted, #818384);
    font-size: 12px;
    line-height: 1.3;
    font-style: normal;
    background: var(--color-comment-bg, rgba(255,255,255,0.05));
    border-radius: 4px;
    margin: 4px;
}

._redlib_popup .loading::before {
    content: "⏳ ";
    margin-right: 4px;
}

._redlib_popup .error {
    color: var(--color-error, #ea0027);
    text-align: center;
    padding: 16px;
    font-size: 13px;
}

._redlib_popup .next_comment {
    text-align: center;
    padding: 5px;
    cursor: pointer;
    color: var(--accent, #0079d3);
    border-bottom: 1px solid var(--color-border, #343536);
    margin: 0;
    user-select: none;
    position: sticky;
    top: 0;
    background: var(--color-bg, #1a1a1b) !important;
    z-index: 1;
    font-size: 12px;
    opacity: 1 !important;
}

._redlib_popup .next_comment:hover {
    background: var(--color-hover-bg, #2a2a2b) !important;
    color: var(--accent, #0079d3);
}

._redlib_popup .next_comment.loaded {
    cursor: default !important;
    pointer-events: none;
    opacity: 1 !important;
    background: var(--color-bg, #1a1a1b) !important;
    position: sticky;
    top: 0;
    z-index: 1;
    color: var(--color-text-muted, #818384) !important;
}

._redlib_popup .next_comment.loaded:hover {
    background: var(--color-bg, #1a1a1b) !important;
    color: var(--color-text-muted, #818384) !important;
}

._redlib_popup .popup-close {
    position: fixed;
    top: 8px;
    right: 8px;
    background: var(--highlighted, #333);
    color: var(--text, #d7dadc);
    border: 1px solid var(--accent, #d54455);
    border-radius: 3px;
    width: 22px;
    height: 22px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1003;
    pointer-events: auto;
    will-change: transform;
}

._redlib_popup .popup-close:hover {
    background: var(--accent, #d54455);
    color: var(--foreground, #222);
}

/* ========== COMMENT COLLAPSER STYLES ========== */

            /* ========== COMMENT COLLAPSER STYLES ========== */
            /* Comment collapser styles are now applied conditionally in a separate function */

            /* ========== SIDEBAR TOGGLE STYLES ========== */

            /* Sidebar Toggle Styles */
.redlib-sidebar-toggle {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: var(--accent, #d54455);
    color: var(--foreground, #222);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    user-select: none;
}

            .redlib-sidebar-toggle:hover {
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
                transform: translateY(-50%) scale(1.1);
            }

            /* Hide sidebar when toggled */
            .redlib-sidebar-hidden aside {
                display: none !important;
            }

            /* Expand main content when sidebar is hidden */
            .redlib-sidebar-hidden main {
                max-width: calc(100% - 40px) !important;
            }

            .redlib-sidebar-hidden #column_one {
                max-width: 100% !important;
            }

/* Smooth transition for layout changes */
main, #column_one {
    transition: max-width 0.3s ease !important;
}

aside {
    transition: all 0.3s ease !important;
}

/* Ensure posts animate width changes */
.post {
    transition: max-width 0.3s ease !important;
}
/* Transition state for smooth sidebar animations */
.redlib-sidebar-transitioning main,
.redlib-sidebar-transitioning #column_one,
.redlib-sidebar-transitioning .post,
.redlib-sidebar-transitioning aside {
    transition: all 0.3s ease !important;
}
            /* Adjust toggle button position when sidebar is hidden */
            .redlib-sidebar-hidden .redlib-sidebar-toggle {
                right: 20px;
            }

            /* When sidebar is hidden, ensure posts use full available width */
            .redlib-sidebar-hidden .post {
                max-width: 100%;
            }

            /* Tooltip for the toggle button */
            .redlib-sidebar-toggle::before {
                content: attr(data-tooltip);
                position: absolute;
                right: 60px;
                top: 50%;
                transform: translateY(-50%);
                background: var(--background, #0f0f0f);
                color: var(--text, #d7dadc);
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: normal;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border: 1px solid var(--highlighted, #333);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                z-index: 1002;
            }

            .redlib-sidebar-toggle:hover::before {
                opacity: 1;
                visibility: visible;
            }

            /* Arrow for tooltip */
            .redlib-sidebar-toggle::after {
                content: '';
                position: absolute;
                right: 52px;
                top: 50%;
                transform: translateY(-50%);
                border: 6px solid transparent;
                border-left-color: var(--highlighted, #333);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1003;
            }

            .redlib-sidebar-toggle:hover::after {
                opacity: 1;
                visibility: visible;
            }

            /* Mobile responsive adjustments */

            /* Force sidebar transitions at all viewport sizes */
@media screen and (max-width: 1200px) {
    .redlib-sidebar-hidden main,
    body:not(.redlib-sidebar-hidden) main,
    .redlib-sidebar-hidden #column_one,
    body:not(.redlib-sidebar-hidden) #column_one {
        transition: max-width 0.3s ease !important;
    }
}

            @media screen and (max-width: 800px) {
                :root {
                    --nav-height: 100px;
                }

                body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode {
                    top: 100px !important;
                    /* Width and position will be handled by JavaScript based on original post */
                    padding: 4px 10px !important; /* Reduce padding on mobile */
                }

                /* Mobile touch interactions */
                body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode {
                    -webkit-tap-highlight-color: transparent !important;
                }

                /* Adjust floating video for mobile */
                .redlib-floating-video {
                    max-width: calc(100vw - 20px);
                    max-height: calc(100vh - 120px);
                    bottom: 10px;
                    right: 10px;
                }

                .redlib-floating-video.vertical-video {
                    max-width: 60vw;
                    max-height: calc(100vh - 120px);
                }

                .redlib-floating-video.minimized {
                    width: auto !important;
                    min-width: 200px !important;
                    max-width: calc(100vw - 20px) !important;
                    height: 32px !important;
                }

                /* Larger resize handles on mobile for better touch */
                .redlib-resize-handle {
                    width: 20px;
                    height: 20px;
                }

                /* Hide sidebar toggle on mobile */
                .redlib-sidebar-toggle {
                    display: none !important;
                }

                @media screen and (max-width: 800px) {
    /* Force transitions on mobile */
    main, #column_one, .post, aside {
        transition: all 0.3s ease !important;
    }

    /* Ensure sidebar transitions work on mobile */
    .redlib-sidebar-transitioning main,
    .redlib-sidebar-transitioning #column_one,
    .redlib-sidebar-transitioning .post,
    .redlib-sidebar-transitioning aside {
        transition: all 0.3s ease !important;
    }
}

            }

            @media screen and (max-width: 480px) {
                .redlib-floating-video {
                    max-width: calc(100vw - 20px);
                    max-height: calc(100vh - 80px);
                    bottom: 10px;
                    left: 10px;
                    right: 10px;
                }

                .redlib-floating-video.vertical-video {
                    max-width: 70vw;
                    left: 50%;
                    transform: translateX(-50%);
                    right: auto;
                }

                .redlib-floating-video.minimized {
                    left: 10px !important;
                    right: 10px !important;
                    transform: none !important;
                    width: calc(100vw - 20px) !important;
                    min-width: unset !important;
                    height: 32px !important;
                }

                /* Even larger resize handles on small mobile */
                .redlib-resize-handle {
                    width: 25px;
                    height: 25px;
                }
            }
            /* ========== SETTINGS OVERLAY STYLES ========== */

            .redlib-settings-icon {
                position: fixed;
                top: 70px;
                right: 15px;
                background: var(--accent, #d54455);
                color: var(--foreground, #222);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                z-index: 10000;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: bold;
            }

            .redlib-settings-icon:hover {
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
                transform: scale(1.1);
            }

            .redlib-settings-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(4px);
                z-index: 10001;
                display: none;
                align-items: center;
                justify-content: center;
            }

            .redlib-settings-modal {
                background: var(--background, #0f0f0f);
                border: 2px solid var(--highlighted, #333);
                border-radius: 12px;
                max-width: 600px;
                max-height: 80vh;
                width: 90%;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
            }

            .redlib-settings-header {
                background: var(--post, #161616);
                padding: 20px;
                border-bottom: 2px solid var(--highlighted, #333);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
            }

            .redlib-settings-apply {
                background: var(--accent, #d54455);
                color: var(--foreground, #222);
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: all 0.2s ease;
            }

            .redlib-settings-apply:hover {
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
            }

            .redlib-settings-apply:disabled {
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
                opacity: 0.5;
                cursor: not-allowed;
            }

            .redlib-settings-apply.pending {
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
            }

            .redlib-settings-title {
                color: var(--text, #d7dadc);
                font-size: 20px;
                font-weight: bold;
                margin: 0;
            }

            .redlib-settings-close {
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
                border: 1px solid var(--accent, #d54455);
                border-radius: 50%;
                width: 32px;
                height: 32px;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .redlib-settings-close:hover {
                background: var(--accent, #d54455);
                color: var(--foreground, #222);
            }

            .redlib-settings-content {
                padding: 20px;
                max-height: 60vh;
                overflow-y: auto;
                flex: 1;
                min-height: 0;
            }

            .redlib-settings-section {
                margin-bottom: 24px;
                padding-bottom: 24px;
                border-bottom: 1px solid var(--highlighted, #333);
            }

            .redlib-settings-section:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }

            .redlib-settings-section-title {
                color: var(--accent, #d54455);
                font-size: 16px;
                font-weight: bold;
                margin: 0 0 12px 0;
            }

            .redlib-settings-option {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 16px;
                gap: 16px;
            }

            .redlib-settings-option:last-child {
                margin-bottom: 0;
            }

            .redlib-settings-option-info {
                flex: 1;
            }

            .redlib-settings-option-title {
                color: var(--text, #d7dadc);
                font-weight: bold;
                margin: 0 0 4px 0;
                font-size: 14px;
            }

            .redlib-settings-option-description {
                color: var(--text, #d7dadc);
                opacity: 0.7;
                font-size: 13px;
                line-height: 1.4;
                margin: 0;
            }

            .redlib-settings-toggle {
                position: relative;
                display: inline-block;
                width: 48px;
                height: 24px;
                flex-shrink: 0;
            }

            .redlib-settings-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .redlib-settings-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--highlighted, #333);
                transition: 0.3s;
                border-radius: 24px;
            }

            .redlib-settings-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: var(--foreground, #222);
                transition: 0.3s;
                border-radius: 50%;
            }

            .redlib-settings-toggle input:checked + .redlib-settings-slider {
                background-color: var(--accent, #d54455);
            }

            .redlib-settings-toggle input:checked + .redlib-settings-slider:before {
                transform: translateX(24px);
                background-color: var(--foreground, #222);
            }

            .redlib-settings-footer {
                background: var(--post, #161616);
                padding: 16px 20px;
                border-top: 2px solid var(--highlighted, #333);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
            }

            .redlib-settings-footer-actions {
                display: flex;
                gap: 12px;
                align-items: center;
            }

            .redlib-settings-version {
                color: var(--text, #d7dadc);
                opacity: 0.6;
                font-size: 12px;
            }

            .redlib-settings-reset {
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
                border: 1px solid var(--accent, #d54455);
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
            }

            .redlib-settings-reset:hover {
                background: var(--accent, #d54455);
                color: var(--foreground, #222);
            }

            .redlib-settings-toggle input:disabled + .redlib-settings-slider {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .redlib-settings-toggle input:disabled + .redlib-settings-slider:before {
                opacity: 0.4;
            }
            .redlib-settings-subsetting {
                margin-left: 20px;
                margin-top: 4px;
                margin-bottom: 16px;
                padding-left: 16px;
                border-left: 2px solid var(--highlighted, #333);
                opacity: 0.8;
            }

            .redlib-settings-subsetting .redlib-settings-option-title {
                font-size: 13px;
                font-weight: normal;
            }

            .redlib-settings-subsetting .redlib-settings-option-description {
                font-size: 12px;
            }

            .redlib-settings-subsetting.disabled {
                opacity: 0.4;
                pointer-events: none;
            }

            /* Mobile responsive */
            @media screen and (max-width: 600px) {
                .redlib-settings-modal {
                    width: 95%;
                    max-height: 90vh;
                    margin: 5vh auto;
                }

                .redlib-settings-header {
                    padding: 16px;
                }

                .redlib-settings-content {
                    padding: 16px;
                    /* Ensure content doesn't take up too much space on mobile */
                    max-height: calc(90vh - 120px); /* Account for header and footer */
                }

                .redlib-settings-footer {
                    padding: 12px 16px;
                }

                .redlib-settings-footer-actions {
                    gap: 8px;
                }

                .redlib-settings-reset,
                .redlib-settings-apply {
                    padding: 6px 12px;
                    font-size: 11px;
                }

                .redlib-settings-option {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }

                .redlib-settings-toggle {
                    align-self: flex-end;
                }

                .redlib-settings-version {
                    font-size: 10px;
                }
            }

            @media screen and (max-width: 400px) {
                .redlib-settings-modal {
                    width: 98%;
                    max-height: 95vh;
                    margin: 2.5vh auto;
                }

                .redlib-settings-content {
                    max-height: calc(95vh - 100px); /* Even more compact for very small screens */
                }

                .redlib-settings-footer {
                    flex-direction: column;
                    gap: 8px;
                    align-items: stretch;
                }

                .redlib-settings-footer-actions {
                    width: 100%;
                    justify-content: space-between;
                }

                .redlib-settings-reset,
                .redlib-settings-apply {
                    flex: 1;
                }
            }
        `;

        if (SettingsManager.getSetting('commentStyling', 'enabled')) {
            style.textContent += `
        /* ========== COMMENT STYLING STYLES ========== */

        /* ULTRA compact comment layout */
        .comment {
            margin-bottom: 0px !important;
            padding: 2px !important;
            padding-bottom: 0 !important;
        }

        .comment_body {
            margin: 0px !important;
            padding: 2px 5px !important;
            padding-bottom: 0 !important;
        }

        .comment_data {
            margin: 0px !important;
            padding: 1px 0 !important;
            line-height: 1.2 !important;
        }

        .comment_right {
            padding: 2px 0 2px 5px !important;
        }

        .comment_left {
            padding: 2px 0 !important;
        }

        /* Reduce spacing in reply chains */
        .replies {
            margin: 0px !important;
            padding: 0px !important;
        }

        /* Make the thread lines more compact */
        .comment_left .line {
            margin: 0 !important;
        }

        /* Reduce overall thread spacing */
        .thread {
            margin-bottom: 1px !important;
        }

        /* Tighter blockquote replies */
        blockquote.replies {
            margin: 0px !important;
            padding: 0px !important;
        }

        /* Compact score display */
        .comment_score {
            padding: 2px 0 !important;
            margin: 0 !important;
        }

        /* TRUE ALTERNATING PATTERN - Extended to Level 15 */

        /* Level 0: Top level comments - GRAY */
        .thread > .comment {
            background-color: #161616 !important;
        }

        /* Level 1: First children - BLACK */
        .thread > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 2: Grandchildren - GRAY */
        .thread > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 3: Great grandchildren - BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 4: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 5: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 6: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 7: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 8: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 9: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 10: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 11: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 12: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 13: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

        /* Level 14: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #161616 !important;
        }

        /* Level 15: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: #1f1f1f !important;
        }

/* Custom expand/collapse button styling - unified with other buttons */
.expand-children {
    background: var(--color-bg, #1a1a1b) !important;
    border: 1px solid var(--color-border, #343536) !important;
    color: var(--color-text, #d7dadc) !important;
    cursor: pointer !important;
    font-size: 12px !important;
    font-weight: bold !important;
    margin-right: 8px !important;
    padding: 2px 6px !important;
    border-radius: 3px !important;
    min-width: 24px !important;
    line-height: 1 !important;
    transition: all 0.2s ease !important;
}

.expand-children:hover {
    background: var(--accent, #d54455) !important;
    color: var(--foreground, #222) !important;
    text-decoration: none !important;
}

.expand-children:active {
    transform: scale(0.95) !important;
}

    `;
        }
        document.head.appendChild(style);
    }

    // ============================================================================
    // POST COLLAPSER MODULE
    // ============================================================================
    const PostCollapser = (function() {
        const STORAGE_KEY = 'redlib_collapsed_posts';
        const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days

        let floatingVideoContainer = null;
        let originalVideoParent = null;
        let originalVideoNextSibling = null;
        let originalVideo = null;

        let savedVideoPosition = {
            bottom: 20,
            right: 20,
            width: null,
            height: null
        };

        function saveVideoPosition() {
            try {
                const rect = floatingVideoContainer?.getBoundingClientRect();
                if (rect) {
                    savedVideoPosition = {
                        bottom: window.innerHeight - rect.bottom,
                        right: window.innerWidth - rect.right,
                        width: floatingVideoContainer.style.width,
                        height: floatingVideoContainer.style.height
                    };
                }
            } catch (e) {
                console.warn('[Redlib Enhancement Suite] Could not save video position');
            }
        }

        function getCollapsedPosts() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (!stored) return {};

                const data = JSON.parse(stored);
                const now = Date.now();
                const validPosts = {};
                let expiredCount = 0;

                for (const [postId, entry] of Object.entries(data)) {
                    if (typeof entry === 'object' && entry.timestamp) {
                        const age = now - entry.timestamp;
                        if (age < EXPIRATION_TIME) {
                            validPosts[postId] = entry;
                        } else {
                            expiredCount++;
                        }
                    } else {
                        expiredCount++;
                    }
                }

                if (expiredCount > 0) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(validPosts));
                }

                return validPosts;
            } catch (e) {
                console.error('[Redlib Enhancement Suite] Error reading localStorage:', e);
                return {};
            }
        }

        function saveCollapsedPosts(collapsedPosts) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsedPosts));
            } catch (e) {
                console.warn('Failed to save collapsed posts state');
            }
        }

        function forceLayoutRecalculation() {
            requestAnimationFrame(() => {
                document.body.style.height = 'auto';
                const main = document.querySelector('main');
                if (main) {
                    main.style.height = 'auto';
                }
                const posts = document.querySelector('#posts');
                if (posts) {
                    posts.style.height = 'auto';
                }

                document.body.offsetHeight;

                const currentScrollY = window.scrollY;
                if (currentScrollY > document.body.scrollHeight - window.innerHeight) {
                    window.scrollTo(0, Math.max(0, document.body.scrollHeight - window.innerHeight));
                }
            });
        }

        function createFloatingVideoPlayer(video) {
            if (floatingVideoContainer) {
                removeFloatingVideoPlayer();
            }

            originalVideo = video;
            originalVideoParent = video.parentElement;
            originalVideoNextSibling = video.nextElementSibling;

            let videoWidth = parseInt(video.getAttribute('width')) || video.videoWidth || video.offsetWidth || 320;
            let videoHeight = parseInt(video.getAttribute('height')) || video.videoHeight || video.offsetHeight || 240;

            const aspectRatio = videoWidth / videoHeight;
            const isVertical = aspectRatio < 1;

            let containerWidth, containerHeight;
            const headerHeight = 40;

            if (isVertical) {
                const desiredVideoHeight = Math.min(400, window.innerHeight * 0.6);
                containerHeight = desiredVideoHeight + headerHeight;
                containerWidth = Math.max(200, desiredVideoHeight * aspectRatio);
            } else {
                const desiredVideoWidth = Math.min(500, window.innerWidth * 0.4);
                containerWidth = desiredVideoWidth;
                containerHeight = (desiredVideoWidth / aspectRatio) + headerHeight;
            }

            floatingVideoContainer = document.createElement('div');
            floatingVideoContainer.className = 'redlib-floating-video';
            if (isVertical) {
                floatingVideoContainer.classList.add('vertical-video');
            }

            if (savedVideoPosition.width && savedVideoPosition.height &&
                savedVideoPosition.bottom !== undefined && savedVideoPosition.right !== undefined) {
                floatingVideoContainer.style.width = savedVideoPosition.width;
                floatingVideoContainer.style.height = savedVideoPosition.height;
                floatingVideoContainer.style.bottom = savedVideoPosition.bottom + 'px';
                floatingVideoContainer.style.right = savedVideoPosition.right + 'px';
            } else {
                floatingVideoContainer.style.width = containerWidth + 'px';
                floatingVideoContainer.style.height = containerHeight + 'px';
                floatingVideoContainer.style.bottom = '20px';
                floatingVideoContainer.style.right = '20px';
            }

            floatingVideoContainer.style.top = 'auto';
            floatingVideoContainer.style.left = 'auto';

            floatingVideoContainer.innerHTML =
                '<div class="redlib-floating-video-header">' +
                '<span class="redlib-floating-video-title">Video Player</span>' +
                '<div class="redlib-floating-video-controls">' +
                '<button class="redlib-floating-video-minimize" title="Minimize">−</button>' +
                '<button class="redlib-floating-video-close" title="Close">×</button>' +
                '</div>' +
                '</div>' +
                '<div class="redlib-floating-video-content">' +
                '</div>' +
                '<div class="redlib-resize-handle redlib-resize-se" data-direction="se"></div>' +
                '<div class="redlib-resize-handle redlib-resize-nw" data-direction="nw"></div>' +
                '<div class="redlib-resize-handle redlib-resize-ne" data-direction="ne"></div>' +
                '<div class="redlib-resize-handle redlib-resize-sw" data-direction="sw"></div>';

            const videoContent = floatingVideoContainer.querySelector('.redlib-floating-video-content');
            videoContent.appendChild(video);

            const originalWidth = containerWidth;
            const originalHeight = containerHeight;
            const storedAspectRatio = aspectRatio;

            const closeBtn = floatingVideoContainer.querySelector('.redlib-floating-video-close');
            const minimizeBtn = floatingVideoContainer.querySelector('.redlib-floating-video-minimize');
            const header = floatingVideoContainer.querySelector('.redlib-floating-video-header');
            const resizeHandles = floatingVideoContainer.querySelectorAll('.redlib-resize-handle');

            closeBtn.addEventListener('click', () => {
                removeFloatingVideoPlayer(true);
            });

            minimizeBtn.addEventListener('click', () => {
                const isMinimized = floatingVideoContainer.classList.contains('minimized');

                if (isMinimized) {
                    floatingVideoContainer.classList.remove('minimized');

                    floatingVideoContainer.style.removeProperty('height');
                    floatingVideoContainer.style.removeProperty('width');
                    floatingVideoContainer.style.removeProperty('bottom');
                    floatingVideoContainer.style.removeProperty('right');
                    floatingVideoContainer.style.removeProperty('left');
                    floatingVideoContainer.style.removeProperty('top');

                    if (savedVideoPosition.width && savedVideoPosition.height) {
                        floatingVideoContainer.style.width = savedVideoPosition.width;
                        floatingVideoContainer.style.height = savedVideoPosition.height;
                        floatingVideoContainer.style.bottom = savedVideoPosition.bottom + 'px';
                        floatingVideoContainer.style.right = savedVideoPosition.right + 'px';
                    } else {
                        floatingVideoContainer.style.width = originalWidth + 'px';
                        floatingVideoContainer.style.height = originalHeight + 'px';
                        floatingVideoContainer.style.bottom = '20px';
                        floatingVideoContainer.style.right = '20px';
                    }
                    floatingVideoContainer.style.left = 'auto';
                    floatingVideoContainer.style.top = 'auto';
                    minimizeBtn.textContent = '−';
                    minimizeBtn.title = 'Minimize';
                } else {
                    const rect = floatingVideoContainer.getBoundingClientRect();
                    savedVideoPosition.width = floatingVideoContainer.style.width;
                    savedVideoPosition.height = floatingVideoContainer.style.height;
                    savedVideoPosition.bottom = window.innerHeight - rect.bottom;
                    savedVideoPosition.right = window.innerWidth - rect.right;

                    floatingVideoContainer.classList.add('minimized');

                    floatingVideoContainer.style.setProperty('height', '32px', 'important');
                    floatingVideoContainer.style.setProperty('width', '200px', 'important');
                    floatingVideoContainer.style.setProperty('bottom', '0px', 'important');
                    floatingVideoContainer.style.setProperty('right', '20px', 'important');
                    floatingVideoContainer.style.setProperty('left', 'auto', 'important');
                    floatingVideoContainer.style.setProperty('top', 'auto', 'important');

                    minimizeBtn.textContent = '+';
                    minimizeBtn.title = 'Restore';
                }
            });

            // Resize and drag functionality
            let isResizing = false;
            let resizeDirection = null;
            let resizeStart = {
                x: 0, y: 0,
                width: 0, height: 0,
                bottom: 0, right: 0,
                top: 0, left: 0
            };

            resizeHandles.forEach(handle => {
                handle.addEventListener('mousedown', (e) => {
                    if (floatingVideoContainer.classList.contains('minimized')) return;

                    e.preventDefault();
                    e.stopPropagation();

                    isResizing = true;
                    resizeDirection = handle.dataset.direction;

                    const rect = floatingVideoContainer.getBoundingClientRect();
                    resizeStart = {
                        x: e.clientX,
                        y: e.clientY,
                        width: rect.width,
                        height: rect.height,
                        bottom: window.innerHeight - rect.bottom,
                        right: window.innerWidth - rect.right,
                        top: rect.top,
                        left: rect.left
                    };

                    document.body.style.userSelect = 'none';
                });
            });

            let isDragging = false;
            let dragStart = { x: 0, y: 0 };
            let initialPos = { bottom: 0, right: 0 };

            header.addEventListener('mousedown', (e) => {
                if (isResizing || floatingVideoContainer.classList.contains('minimized')) return;

                isDragging = true;
                dragStart.x = e.clientX;
                dragStart.y = e.clientY;
                const rect = floatingVideoContainer.getBoundingClientRect();
                initialPos.bottom = window.innerHeight - rect.bottom;
                initialPos.right = window.innerWidth - rect.right;
                floatingVideoContainer.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging && !floatingVideoContainer.classList.contains('minimized')) {
                    const deltaX = e.clientX - dragStart.x;
                    const deltaY = e.clientY - dragStart.y;

                    let newRight = initialPos.right - deltaX;
                    let newBottom = initialPos.bottom - deltaY;

                    newRight = Math.max(0, Math.min(window.innerWidth - floatingVideoContainer.offsetWidth, newRight));
                    newBottom = Math.max(0, Math.min(window.innerHeight - floatingVideoContainer.offsetHeight, newBottom));

                    floatingVideoContainer.style.right = newRight + 'px';
                    floatingVideoContainer.style.bottom = newBottom + 'px';
                    floatingVideoContainer.style.top = 'auto';
                    floatingVideoContainer.style.left = 'auto';

                } else if (isResizing && !floatingVideoContainer.classList.contains('minimized')) {
                    const deltaX = e.clientX - resizeStart.x;
                    const deltaY = e.clientY - resizeStart.y;

                    let newWidth = resizeStart.width;
                    let newHeight = resizeStart.height;
                    let newRight = resizeStart.right;
                    let newBottom = resizeStart.bottom;

                    switch (resizeDirection) {
                        case 'se':
                            newWidth = Math.max(200, resizeStart.width + deltaX);
                            newHeight = Math.max(150, newWidth / storedAspectRatio + 40);
                            newRight = resizeStart.right - deltaX;
                            newBottom = resizeStart.bottom - (newHeight - resizeStart.height);
                            break;

                        case 'nw':
                            newWidth = Math.max(200, resizeStart.width - deltaX);
                            newHeight = Math.max(150, newWidth / storedAspectRatio + 40);
                            break;

                        case 'ne':
                            newWidth = Math.max(200, resizeStart.width + deltaX);
                            newHeight = Math.max(150, newWidth / storedAspectRatio + 40);
                            newRight = resizeStart.right - deltaX;
                            break;

                        case 'sw':
                            newWidth = Math.max(200, resizeStart.width - deltaX);
                            newHeight = Math.max(150, newWidth / storedAspectRatio + 40);
                            newBottom = resizeStart.bottom - (newHeight - resizeStart.height);
                            break;
                    }

                    const maxBottom = window.innerHeight - 40;
                    const maxRight = window.innerWidth - 200;

                    newBottom = Math.max(0, Math.min(newBottom, maxBottom));
                    newRight = Math.max(0, Math.min(newRight, maxRight));

                    if (newWidth < 200) newWidth = 200;
                    if (newHeight < 150) newHeight = 150;

                    floatingVideoContainer.style.width = newWidth + 'px';
                    floatingVideoContainer.style.height = newHeight + 'px';
                    floatingVideoContainer.style.right = newRight + 'px';
                    floatingVideoContainer.style.bottom = newBottom + 'px';
                    floatingVideoContainer.style.top = 'auto';
                    floatingVideoContainer.style.left = 'auto';
                }
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    floatingVideoContainer.style.cursor = '';
                    saveVideoPosition();
                }

                if (isResizing) {
                    isResizing = false;
                    resizeDirection = null;
                    document.body.style.userSelect = '';
                    saveVideoPosition();
                }
            });

            document.body.appendChild(floatingVideoContainer);
        }

        function removeFloatingVideoPlayer(clearSavedPosition = false) {
            if (floatingVideoContainer && originalVideo && originalVideoParent) {
                if (!clearSavedPosition) {
                    saveVideoPosition();
                } else {
                    savedVideoPosition = {
                        bottom: 20,
                        right: 20,
                        width: null,
                        height: null
                    };
                }

                if (originalVideoNextSibling) {
                    originalVideoParent.insertBefore(originalVideo, originalVideoNextSibling);
                } else {
                    originalVideoParent.appendChild(originalVideo);
                }

                floatingVideoContainer.remove();

                floatingVideoContainer = null;
                originalVideoParent = null;
                originalVideoNextSibling = null;
                originalVideo = null;
            }
        }

        function hasVideoContent(postElement) {
            return postElement.querySelector('.post_media_video') !== null;
        }

        function togglePost(postElement, postId) {
            const isCollapsed = postElement.classList.contains('redlib-collapsed');
            const collapsedPosts = getCollapsedPosts();
            const isCommentPage = window.location.pathname.includes('/comments/');

            if (isCollapsed) {
                // Expand post with animation
                animatePostExpansion(postElement, () => {
                    // Expand post
                    postElement.classList.remove('redlib-collapsed');
                    delete collapsedPosts[postId];

                    // Only restore thumbnails on post listing pages, not comment pages
                    if (!isCommentPage) {
                        restoreVideoFromThumbnail(postElement);
                        restoreImageFromThumbnail(postElement);
                    }

                    // Show all collapsible elements
                    const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
                    collapsibleElements.forEach(el => {
                        el.style.display = '';
                        el.style.height = '';
                        el.style.overflow = '';
                    });

                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) {
                        button.innerHTML = '✕';
                        button.title = 'Hide post';
                    }

                    // Reset expand button to default state and show it when unhiding post
                    const expandButton = postElement.querySelector('.redlib-expand-btn');
                    if (expandButton) {
                        // Remove any text expansion states
                        const postPreview = postElement.querySelector('.post_preview');
                        if (postPreview) {
                            postPreview.classList.remove('redlib-text-expanded');
                        }
                        postElement.classList.remove('redlib-text-minimized');

                        // Reset to default state
                        expandButton.textContent = '[±]';
                        expandButton.title = 'Expand post text';

                        // Show the expand button
                        expandButton.style.display = '';
                        expandButton.style.opacity = '1';
                    }

                    saveCollapsedPosts(collapsedPosts);
                });

            } else {
                // Add immediate visual feedback class to override hover effects
                postElement.classList.add('redlib-just-collapsed');

                // Remove the override class after animation completes so normal hover works
                setTimeout(() => {
                    postElement.classList.remove('redlib-just-collapsed');
                }, 500);

                // First, hide the expand button immediately
                const expandButton = postElement.querySelector('.redlib-expand-btn');
                if (expandButton) {
                    expandButton.style.transition = 'opacity 0.2s ease';
                    expandButton.style.opacity = '0';

                    // Wait for button fade, then hide completely and start collapse
                    setTimeout(() => {
                        expandButton.style.display = 'none';

                        // Check if post is already minimized - if so, skip height animation
                        const isAlreadyMinimized = postElement.classList.contains('redlib-text-minimized');

                        if (isAlreadyMinimized) {
                            // Post is already minimized, apply collapse state directly without animation
                            applyCollapseStateDirectly(postElement, postId, collapsedPosts, isCommentPage);
                        } else {
                            // Collapse post with animation
                            animatePostCollapse(postElement, () => {
                                applyCollapseStateDirectly(postElement, postId, collapsedPosts, isCommentPage);
                            });
                        }
                    }, 200);
                } else {
                    // No expand button, proceed directly
                    const isAlreadyMinimized = postElement.classList.contains('redlib-text-minimized');

                    if (isAlreadyMinimized) {
                        applyCollapseStateDirectly(postElement, postId, collapsedPosts, isCommentPage);
                    } else {
                        animatePostCollapse(postElement, () => {
                            applyCollapseStateDirectly(postElement, postId, collapsedPosts, isCommentPage);
                        });
                    }
                }
            }

            forceLayoutRecalculation();
        }

        function applyCollapseStateDirectly(postElement, postId, collapsedPosts, isCommentPage) {
            // Collapse post
            postElement.classList.add('redlib-collapsed');
            collapsedPosts[postId] = {
                collapsed: true,
                timestamp: Date.now()
            };

            // Only convert to thumbnails on post listing pages, not comment pages
            if (!isCommentPage) {
                convertVideoToThumbnail(postElement);
                convertImageToThumbnail(postElement);
            }

            // Hide all collapsible elements
            const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
            collapsibleElements.forEach(el => {
                el.style.display = 'none';
                el.style.height = '0';
                el.style.overflow = 'hidden';
            });

            const button = postElement.querySelector('.redlib-collapse-btn');
            if (button) {
                button.innerHTML = '↶';
                button.title = 'Unhide post';
            }

            saveCollapsedPosts(collapsedPosts);
        }

        // Add hover effects to collapsed posts
function addHoverEffectsToCollapsedPost(postElement) {
    let hasLeftPost = false;

    const hoverIn = () => {
        if (!hasLeftPost) return; // Don't allow hover until mouse has left

        if (postElement.classList.contains('redlib-post-collapsed') && !postElement.classList.contains('highlighted')) {
            postElement.style.transition = 'all 0.3s ease';
            postElement.style.opacity = '0.6';
            postElement.style.filter = 'grayscale(0.2) blur(0.2px)';
            postElement.style.transform = 'scale(0.995)';
        }
    };

    const hoverOut = () => {
        if (postElement.classList.contains('redlib-post-collapsed') && !postElement.classList.contains('highlighted')) {
            postElement.style.transition = 'all 0.3s ease';
            postElement.style.opacity = '0.3';
            postElement.style.filter = 'grayscale(0.4) blur(0.5px)';
            postElement.style.transform = 'scale(0.98)';
        }
    };

    const trackMouseLeave = () => {
        hasLeftPost = true;
        postElement.removeEventListener('mouseleave', trackMouseLeave);
        hoverOut(); // Apply the collapsed styling when mouse leaves
    };

    // Initially, track when mouse leaves for the first time
    postElement.addEventListener('mouseleave', trackMouseLeave);

    // Add normal hover effects that only work after mouse has left once
    postElement.addEventListener('mouseenter', hoverIn);
    postElement.addEventListener('mouseleave', hoverOut);
}

        function animatePostCollapse(postElement, callback) {
            // Get current height
            const startHeight = postElement.offsetHeight;

            // Create a hidden clone to measure collapsed height accurately
            const clone = postElement.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';
            clone.style.visibility = 'hidden';
            clone.style.height = 'auto';

            // Add clone to document
            document.body.appendChild(clone);

            // Apply collapsed state to clone to measure height
            const isCommentPage = window.location.pathname.includes('/comments/');

            clone.classList.add('redlib-collapsed');

            // Convert to thumbnails on clone
            if (!isCommentPage) {
                convertVideoToThumbnail(clone);
                convertImageToThumbnail(clone);
            }

            // Hide collapsible elements on clone
            const collapsibleElements = clone.querySelectorAll('.redlib-collapsible');
            collapsibleElements.forEach(el => {
                el.style.display = 'none';
                el.style.height = '0';
                el.style.overflow = 'hidden';
            });

            // Force layout and measure
            clone.offsetHeight;
            const targetHeight = clone.offsetHeight;

            // Remove clone
            document.body.removeChild(clone);

            // Now animate with the correct target height
            postElement.classList.add('redlib-animating');
            postElement.style.height = startHeight + 'px';

            // Force layout
            postElement.offsetHeight;

            // Animate to target height
            requestAnimationFrame(() => {
                postElement.style.height = targetHeight + 'px';

                // Apply the actual collapse changes during animation
                setTimeout(() => {
                    callback(); // This applies the actual collapsed state
                }, 200); // Halfway through animation

                // Clean up after animation
                setTimeout(() => {
                    postElement.style.height = '';
                    postElement.classList.remove('redlib-animating');
                }, 400);
            });
        }

        function animatePostExpansion(postElement, callback) {
            // Get current collapsed height
            const startHeight = postElement.offsetHeight;

            // Apply expansion changes
            callback();

            // Force layout to get expanded height
            const endHeight = postElement.offsetHeight;

            // Set up animation
            postElement.classList.add('redlib-animating');
            postElement.style.height = startHeight + 'px';

            // Force layout
            postElement.offsetHeight;

            // Animate to expanded height
            requestAnimationFrame(() => {
                postElement.style.height = endHeight + 'px';

                // Clean up after animation
                setTimeout(() => {
                    postElement.style.height = '';
                    postElement.classList.remove('redlib-animating');
                }, 400);
            });
        }

        function expandPostWithTransition(postElement, postId, collapsedPosts, isCommentPage) {
            // Start with current collapsed height
            const collapsedHeight = postElement.offsetHeight;

            // Temporarily expand to measure target height
            postElement.classList.remove('redlib-collapsed');

            // Only restore thumbnails on post listing pages, not comment pages
            if (!isCommentPage) {
                restoreVideoFromThumbnail(postElement);
                restoreImageFromThumbnail(postElement);
            }

            // Show all collapsible elements temporarily to measure
            const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
            collapsibleElements.forEach(el => {
                el.style.display = '';
                el.style.height = '';
                el.style.overflow = '';
            });

            // Force layout calculation
            postElement.offsetHeight;

            // Measure the target expanded height
            const expandedHeight = postElement.offsetHeight;

            // Collapse it back temporarily
            postElement.classList.add('redlib-collapsed');
            postElement.style.height = collapsedHeight + 'px';

            // Force layout
            postElement.offsetHeight;

            // Now animate to expanded state
            requestAnimationFrame(() => {
                postElement.classList.remove('redlib-collapsed');
                postElement.style.height = expandedHeight + 'px';

                // Show all collapsible elements
                collapsibleElements.forEach(el => {
                    el.style.display = '';
                    el.style.height = '';
                    el.style.overflow = '';
                });

                const button = postElement.querySelector('.redlib-collapse-btn');
                if (button) {
                    button.innerHTML = '✕';
                    button.title = 'Hide post';
                }

                // Reset expand button to default state when unhiding post
                const expandButton = postElement.querySelector('.redlib-expand-btn');
                if (expandButton) {
                    // Remove any text expansion states
                    const postPreview = postElement.querySelector('.post_preview');
                    if (postPreview) {
                        postPreview.classList.remove('redlib-text-expanded');
                    }
                    postElement.classList.remove('redlib-text-minimized');

                    // Reset to default state
                    expandButton.textContent = '[±]';
                    expandButton.title = 'Expand post text';
                }

                // Clean up after transition
                setTimeout(() => {
                    postElement.style.height = '';
                    postElement.classList.remove('redlib-transitioning');
                    forceLayoutRecalculation();
                }, 300);
            });

            delete collapsedPosts[postId];
            saveCollapsedPosts(collapsedPosts);
        }

        function collapsePostWithTransition(postElement, postId, collapsedPosts, isCommentPage) {
            // Check if post is currently in expanded text state
            const postPreview = postElement.querySelector('.post_preview');
            const isTextExpanded = postPreview && postPreview.classList.contains('redlib-text-expanded');

            let currentHeight = postElement.offsetHeight;

            // If text is expanded, first transition to normal state, then to collapsed
            if (isTextExpanded) {
                // First collapse text to normal state
                postPreview.classList.remove('redlib-text-expanded');
                postElement.classList.remove('redlib-text-minimized');

                // Force layout calculation
                postElement.offsetHeight;
                const normalHeight = postElement.offsetHeight;

                // Set explicit height and animate to normal state first
                postElement.style.height = currentHeight + 'px';

                requestAnimationFrame(() => {
                    postElement.style.height = normalHeight + 'px';

                    // After first transition, proceed to collapse
                    setTimeout(() => {
                        proceedToCollapse(postElement, normalHeight, postId, collapsedPosts, isCommentPage);
                    }, 150); // Half the transition time
                });
            } else {
                // Direct collapse from current state
                proceedToCollapse(postElement, currentHeight, postId, collapsedPosts, isCommentPage);
            }
        }

        function proceedToCollapse(postElement, startHeight, postId, collapsedPosts, isCommentPage) {
            // Apply collapsed state to measure target height
            postElement.classList.add('redlib-collapsed');

            // Only convert to thumbnails on post listing pages, not comment pages
            if (!isCommentPage) {
                convertVideoToThumbnail(postElement);
                convertImageToThumbnail(postElement);
            }

            // Hide all collapsible elements
            const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
            collapsibleElements.forEach(el => {
                el.style.display = 'none';
                el.style.height = '0';
                el.style.overflow = 'hidden';
            });

            const button = postElement.querySelector('.redlib-collapse-btn');
            if (button) {
                button.innerHTML = '↶';
                button.title = 'Unhide post';
            }

            // Force layout to get collapsed height
            postElement.offsetHeight;
            const collapsedHeight = postElement.offsetHeight;

            // Set starting height and animate to collapsed height
            postElement.style.height = startHeight + 'px';

            requestAnimationFrame(() => {
                postElement.style.height = collapsedHeight + 'px';

                // Clean up after transition
                setTimeout(() => {
                    postElement.style.height = '';
                    postElement.classList.remove('redlib-transitioning');
                    forceLayoutRecalculation();
                }, 300);
            });

            collapsedPosts[postId] = {
                collapsed: true,
                timestamp: Date.now()
            };
            saveCollapsedPosts(collapsedPosts);
        }

        function convertVideoToThumbnail(postElement) {
            const videos = postElement.querySelectorAll('.post_media_video');

            videos.forEach(video => {
                const poster = video.getAttribute('poster');
                if (poster && !video.hasAttribute('data-original-poster')) {
                    // Store original attributes
                    video.setAttribute('data-original-poster', poster);
                    video.setAttribute('data-original-src', video.src || '');
                    video.setAttribute('data-original-controls', video.hasAttribute('controls') ? 'true' : 'false');

                    // Create thumbnail structure similar to gallery thumbnails
                    const thumbnailLink = document.createElement('a');
                    thumbnailLink.className = 'post_thumbnail video-thumbnail-link';
                    thumbnailLink.href = '#'; // Will be updated to actual post link
                    thumbnailLink.setAttribute('rel', 'nofollow');

                    // Create container div
                    const containerDiv = document.createElement('div');
                    containerDiv.style.cssText = 'max-width:140px;max-height:140px;';

                    // Use regular img element instead of SVG for better compatibility
                    const thumbnailImg = document.createElement('img');
                    thumbnailImg.setAttribute('loading', 'lazy');
                    thumbnailImg.setAttribute('alt', 'Video Thumbnail');
                    thumbnailImg.setAttribute('src', poster);
                    thumbnailImg.style.cssText =
                        'width: 140px;' +
                        'height: 140px;' +
                        'object-fit: cover;' +
                        'display: block;';

                    containerDiv.appendChild(thumbnailImg);

                    // Add video label
                    const videoLabel = document.createElement('span');
                    videoLabel.textContent = 'video';

                    thumbnailLink.appendChild(containerDiv);
                    thumbnailLink.appendChild(videoLabel);

                    // Set the correct link href if possible
                    const postLink = postElement.querySelector('.post_title a');
                    if (postLink) {
                        thumbnailLink.href = postLink.href;
                    }

                    // Hide the original video container and insert thumbnail
                    const mediaContent = video.parentNode;
                    mediaContent.style.display = 'none';
                    mediaContent.setAttribute('data-hidden-for-thumbnail', 'true');

                    // Insert thumbnail before the media content
                    mediaContent.parentNode.insertBefore(thumbnailLink, mediaContent);
                }
            });
        }

        function convertImageToThumbnail(postElement) {
            const imageLinks = postElement.querySelectorAll('.post_media_image');

            imageLinks.forEach(imageLink => {
                if (!imageLink.hasAttribute('data-original-href')) {
                    // Get image source - try multiple methods
                    let imageSrc = null;

                    // Method 1: Check for SVG image element
                    const svgImage = imageLink.querySelector('svg image');
                    if (svgImage) {
                        imageSrc = svgImage.getAttribute('href') || svgImage.getAttribute('xlink:href');
                    }

                    // Method 2: Check for desc img element
                    if (!imageSrc) {
                        const descImg = imageLink.querySelector('desc img');
                        if (descImg) {
                            imageSrc = descImg.getAttribute('src');
                        }
                    }

                    // Method 3: Check if imageLink itself has href
                    if (!imageSrc) {
                        imageSrc = imageLink.getAttribute('href');
                    }

                    if (imageSrc) {
                        // Store original attributes
                        imageLink.setAttribute('data-original-href', imageLink.href || '');

                        // Create thumbnail structure similar to gallery thumbnails
                        const thumbnailLink = document.createElement('a');
                        thumbnailLink.className = 'post_thumbnail image-thumbnail-link';
                        thumbnailLink.href = imageLink.href || '#';
                        thumbnailLink.setAttribute('rel', 'nofollow');

                        // Create container div
                        const containerDiv = document.createElement('div');
                        containerDiv.style.cssText = 'max-width:140px;max-height:140px;';

                        // Use regular img element
                        const thumbnailImg = document.createElement('img');
                        thumbnailImg.setAttribute('loading', 'lazy');
                        thumbnailImg.setAttribute('alt', 'Image Thumbnail');
                        thumbnailImg.setAttribute('src', imageSrc);
                        thumbnailImg.style.cssText =
                            'width: 140px;' +
                            'height: 140px;' +
                            'object-fit: cover;' +
                            'display: block;';

                        containerDiv.appendChild(thumbnailImg);

                        // Add image label
                        const imageLabel = document.createElement('span');
                        imageLabel.textContent = 'image';

                        thumbnailLink.appendChild(containerDiv);
                        thumbnailLink.appendChild(imageLabel);

                        // Hide the original image container and insert thumbnail
                        const mediaContent = imageLink.closest('.post_media_content');
                        if (mediaContent) {
                            mediaContent.style.display = 'none';
                            mediaContent.setAttribute('data-hidden-for-thumbnail', 'true');

                            // Insert thumbnail before the media content
                            mediaContent.parentNode.insertBefore(thumbnailLink, mediaContent);
                        }
                    }
                }
            });
        }

        function restoreVideoFromThumbnail(postElement) {
            const videos = postElement.querySelectorAll('.post_media_video[data-original-poster]');

            videos.forEach(video => {
                // Remove thumbnail link
                const thumbnailLink = postElement.querySelector('.video-thumbnail-link');
                if (thumbnailLink) {
                    thumbnailLink.remove();
                }

                // Restore original media content
                const mediaContent = video.parentNode;
                if (mediaContent.hasAttribute('data-hidden-for-thumbnail')) {
                    mediaContent.style.display = '';
                    mediaContent.removeAttribute('data-hidden-for-thumbnail');
                }

                // Clean up video attributes
                video.removeAttribute('data-original-poster');
                video.removeAttribute('data-original-src');
                video.removeAttribute('data-original-controls');
            });
        }

        function restoreImageFromThumbnail(postElement) {
            const imageLinks = postElement.querySelectorAll('.post_media_image[data-original-href]');

            imageLinks.forEach(imageLink => {
                // Remove thumbnail link
                const thumbnailLink = postElement.querySelector('.image-thumbnail-link');
                if (thumbnailLink) {
                    thumbnailLink.remove();
                }

                // Restore original media content
                const mediaContent = imageLink.closest('.post_media_content');
                if (mediaContent && mediaContent.hasAttribute('data-hidden-for-thumbnail')) {
                    mediaContent.style.display = '';
                    mediaContent.removeAttribute('data-hidden-for-thumbnail');
                }

                // Clean up image attributes
                imageLink.removeAttribute('data-original-href');
            });
        }

        function createCollapseButton(postElement, postId) {
            const button = document.createElement('button');
            button.className = 'redlib-collapse-btn';
            button.innerHTML = '✕'; // X icon for hide
            button.title = 'Hide post';

            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePost(postElement, postId);
            });

            return button;
        }

        function getPostIdFromUrl() {
            const match = window.location.pathname.match(/\/r\/[^\/]+\/comments\/([^\/]+)\//);
            return match ? match[1] : null;
        }

        function markCollapsibleElements(postElement) {
            const isCommentPage = window.location.pathname.includes('/comments/');

            let selectors = ['.post_body'];

            // On comment pages, hide all media when collapsed (no thumbnails)
            // On post listing pages, only hide post_body (thumbnails will replace media)
            if (isCommentPage) {
                selectors.push('.post_media_content', '.post_thumbnail', '.gallery');
            }

            selectors.forEach(selector => {
                const elements = postElement.querySelectorAll(selector);
                elements.forEach(el => {
                    el.classList.add('redlib-collapsible');
                });
            });
        }

        function processPost(postElement) {
            let postId = postElement.id;
            if (!postId && postElement.classList.contains('highlighted')) {
                postId = getPostIdFromUrl();
            }

            if (!postId) {
                return;
            }

            const isCommentPage = window.location.pathname.includes('/comments/');

            // Only add collapse button on post listing pages, not comment pages
            if (!isCommentPage && !postElement.querySelector('.redlib-collapse-btn')) {
                markCollapsibleElements(postElement);

                const postHeader = postElement.querySelector('.post_header');
                if (!postHeader) return;

                const collapseButton = createCollapseButton(postElement, postId);

                // Add collapse button to post container (top right)
                postElement.appendChild(collapseButton);

                const collapsedPosts = getCollapsedPosts();
                const postData = collapsedPosts[postId];

                if (postData && (postData === true || (postData.collapsed && postData.timestamp))) {
                    // Post should be collapsed - apply collapse state
                    postElement.classList.add('redlib-collapsed');

                    // Convert to thumbnails on post listing pages
                    convertVideoToThumbnail(postElement);
                    convertImageToThumbnail(postElement);

                    // Hide collapsible elements
                    const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
                    collapsibleElements.forEach(el => {
                        el.style.display = 'none';
                        el.style.height = '0';
                        el.style.overflow = 'hidden';
                    });

                    // Update button
                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) {
                        button.innerHTML = '↶';
                        button.title = 'Show post';
                    }

                    // Check for saved text expansion state (if you want to persist this)
                    // For now, always start in default state - you can add localStorage later if needed
                    const expandButton = postElement.querySelector('.redlib-expand-btn');
                    if (expandButton) {
                        expandButton.textContent = '[±]';
                        expandButton.title = 'Expand post text';
                    }

                }
            } else if (isCommentPage) {
                // On comment pages, just mark collapsible elements but don't add manual controls
                markCollapsibleElements(postElement);
            }
        }

        function processAllPosts() {
            const posts = document.querySelectorAll('.post, .post.highlighted');
            posts.forEach(processPost);
        }

        function handleStickyMode() {
            const post = document.querySelector('.post.highlighted');
            if (!post) return;

            const hasVideo = hasVideoContent(post);
            const video = hasVideo ? post.querySelector('.post_media_video') : null;

            const nav = document.querySelector('nav');
            const getNavHeight = () => {
                if (nav) {
                    return nav.offsetHeight;
                }
                return window.innerWidth <= 800 ? 100 : 60;
            };

            let wasManuallyCollapsedBeforeSticky = false;
            let isHovering = false;
            let isInStickyMode = false;
            let originalPostWidth = null; // Store original width

            const getPostId = () => {
                let postId = post.id;
                if (!postId && post.classList.contains('highlighted')) {
                    postId = getPostIdFromUrl();
                }
                return postId;
            };

            const visualTogglePost = (postElement, shouldCollapse) => {
                const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
                const isCommentPage = window.location.pathname.includes('/comments/');

                if (shouldCollapse) {
                    postElement.classList.add('redlib-collapsed');

                    // Only convert to thumbnails on post listing pages, not comment pages
                    if (!isCommentPage) {
                        convertVideoToThumbnail(postElement);
                        convertImageToThumbnail(postElement);
                    }

                    collapsibleElements.forEach(el => {
                        el.style.display = 'none';
                        el.style.height = '0';
                        el.style.overflow = 'hidden';
                    });
                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) button.textContent = '[+]';
                } else {
                    postElement.classList.remove('redlib-collapsed');

                    // Only restore thumbnails on post listing pages, not comment pages
                    if (!isCommentPage) {
                        restoreVideoFromThumbnail(postElement);
                        restoreImageFromThumbnail(postElement);
                    }

                    collapsibleElements.forEach(el => {
                        el.style.display = '';
                        el.style.height = '';
                        el.style.overflow = '';
                    });
                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) button.textContent = '[-]';
                }
                forceLayoutRecalculation();
            };

            const handleScroll = () => {
                const navHeight = getNavHeight();

                const commentForms = document.querySelector('#commentQueryForms');
                const firstCommentThread = document.querySelector('.thread');
                const triggerElement = commentForms || firstCommentThread;

                let shouldEnableSticky = false;

                if (triggerElement) {
                    const triggerRect = triggerElement.getBoundingClientRect();
                    shouldEnableSticky = triggerRect.top <= navHeight;
                }

                const wasInStickyModeBefore = isInStickyMode;
                isInStickyMode = shouldEnableSticky;

                // Capture original width if not already captured (handles page refresh case)
                if (originalPostWidth === null && !post.classList.contains('redlib-sticky-mode')) {
                    const postRect = post.getBoundingClientRect();
                    originalPostWidth = postRect.width;
                }

                if (shouldEnableSticky && !wasInStickyModeBefore) {
                    const postRect = post.getBoundingClientRect();
                    const postStyles = window.getComputedStyle(post);

                    // Store original width on first sticky activation
                    if (originalPostWidth === null) {
                        originalPostWidth = postRect.width;
                    }

                    const placeholder = document.createElement('div');
                    placeholder.id = 'redlib-sticky-placeholder';
                    placeholder.style.cssText =
                        'height: ' + postRect.height + 'px;' +
                        'width: ' + originalPostWidth + 'px;' +
                        'margin-left: ' + postStyles.marginLeft + ';' +
                        'margin-right: ' + postStyles.marginRight + ';' +
                        'margin-top: ' + postStyles.marginTop + ';' +
                        'margin-bottom: ' + postStyles.marginBottom + ';' +
                        'visibility: hidden;' +
                        'padding: 0;' +
                        'border: 0;' +
                        'box-sizing: border-box;';

                    post.parentNode.insertBefore(placeholder, post);

                    post.classList.add('redlib-sticky-mode');
                    post.style.setProperty('top', navHeight + 'px', 'important');

                    // Calculate width accounting for sticky mode padding using original width
                    // Desktop: 4px 16px = 32px total horizontal, Mobile: 4px 10px = 20px total horizontal
                    const isMobile = window.innerWidth <= 800;
                    const paddingAdjustment = isMobile ? 20 : 32;
                    const stickyWidth = originalPostWidth - paddingAdjustment;
                    post.style.setProperty('width', stickyWidth + 'px', 'important');
                    post.style.setProperty('max-width', stickyWidth + 'px', 'important');
                    post.style.setProperty('left', postRect.left + 'px', 'important');
                    post.style.setProperty('transform', 'none', 'important');

                    wasManuallyCollapsedBeforeSticky = post.classList.contains('redlib-collapsed');

                    if (!wasManuallyCollapsedBeforeSticky && !isHovering) {
                        visualTogglePost(post, true);
                    }

                    if (hasVideo && video) {
                        if (SettingsManager.getSetting('postCollapser', 'floatingVideo')) {
                            createFloatingVideoPlayer(video);
                        }
                    }

                } else if (!shouldEnableSticky && wasInStickyModeBefore) {
                    // Store scroll position before any changes
                    const currentScrollY = window.scrollY;

                    const placeholder = document.getElementById('redlib-sticky-placeholder');
                    if (placeholder) {
                        placeholder.remove();
                    }

                    removeFloatingVideoPlayer(false);

                    post.classList.remove('redlib-sticky-mode');
                    post.style.removeProperty('width');
                    post.style.removeProperty('max-width');
                    post.style.removeProperty('left');
                    post.style.removeProperty('top');
                    post.style.removeProperty('transform');
                    post.style.removeProperty('position');

                    // CRITICAL FIX: Prevent jump by maintaining scroll position
                    // Wait for layout to complete, then restore smooth scrolling
                    requestAnimationFrame(() => {
                        const scrollDifference = window.scrollY - currentScrollY;

                        // If there was a significant jump (more than 50px), smooth it out
                        if (Math.abs(scrollDifference) > 50) {
                            window.scrollTo({
                                top: currentScrollY,
                                behavior: 'instant'
                            });
                        }
                    });

                    visualTogglePost(post, wasManuallyCollapsedBeforeSticky);

                } else if (shouldEnableSticky) {
                    post.style.setProperty('top', navHeight + 'px', 'important');
                }
            };

            const handleMouseEnter = () => {
                if (!isInStickyMode) return;

                isHovering = true;
                if (post.classList.contains('redlib-collapsed')) {
                    visualTogglePost(post, false);
                }

                const postBody = post.querySelector('.post_body');
                if (postBody) {
                    postBody.addEventListener('wheel', handlePostBodyScroll, { passive: false });
                }
            };

            const handleMouseLeave = () => {
                if (!isInStickyMode) return;

                isHovering = false;

                const postBody = post.querySelector('.post_body');
                if (postBody) {
                    postBody.removeEventListener('wheel', handlePostBodyScroll);
                }

                setTimeout(() => {
                    if (!isHovering && isInStickyMode) {
                        visualTogglePost(post, true);
                    }
                }, 100);
            };

            const handlePostBodyScroll = (e) => {
                if (!isInStickyMode || !isHovering) return;

                const postBody = e.currentTarget;
                const scrollTop = postBody.scrollTop;
                const scrollHeight = postBody.scrollHeight;
                const clientHeight = postBody.clientHeight;

                const scrollingUp = e.deltaY < 0;
                const scrollingDown = e.deltaY > 0;

                const canScrollUp = scrollTop > 0;
                const canScrollDown = scrollTop < (scrollHeight - clientHeight);

                if ((scrollingUp && canScrollUp) || (scrollingDown && canScrollDown)) {
                    e.preventDefault();
                    e.stopPropagation();

                    postBody.scrollTop += e.deltaY * 0.5;
                }
            };

            const handleTouch = (e) => {
                if (!isInStickyMode) return;

                if (e.target.classList.contains('redlib-collapse-btn')) return;

                if (post.classList.contains('redlib-collapsed')) {
                    e.preventDefault();
                    visualTogglePost(post, false);
                }
            };

            const handleResize = () => {
                if (post.classList.contains('redlib-sticky-mode') && originalPostWidth !== null) {
                    const navHeight = getNavHeight();
                    post.style.setProperty('top', navHeight + 'px', 'important');

                    const placeholder = document.getElementById('redlib-sticky-placeholder');
                    if (placeholder) {
                        const placeholderRect = placeholder.getBoundingClientRect();

                        // Calculate width accounting for sticky mode padding using original width
                        // Desktop: 4px 16px = 32px total horizontal, Mobile: 4px 10px = 20px total horizontal
                        const isMobile = window.innerWidth <= 800;
                        const paddingAdjustment = isMobile ? 20 : 32;
                        const stickyWidth = originalPostWidth - paddingAdjustment;
                        post.style.setProperty('width', stickyWidth + 'px', 'important');
                        post.style.setProperty('max-width', stickyWidth + 'px', 'important');
                        post.style.setProperty('left', placeholderRect.left + 'px', 'important');
                        post.style.setProperty('transform', 'none', 'important');
                    }
                }
            };

            const supportsHover = window.matchMedia('(hover: hover)').matches;

            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);

            if (supportsHover) {
                post.addEventListener('mouseenter', handleMouseEnter);
                post.addEventListener('mouseleave', handleMouseLeave);
            } else {
                post.addEventListener('click', handleTouch);
                post.addEventListener('touchstart', handleTouch);
            }

            handleScroll();
        }

        function addKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Only enable manual keyboard shortcuts on post listing pages
                const isCommentPage = window.location.pathname.includes('/comments/');

                if (e.ctrlKey && e.shiftKey && e.key === 'C' && !isCommentPage) {
                    e.preventDefault();
                    const posts = document.querySelectorAll('.post:not(.highlighted)');
                    const collapsedCount = document.querySelectorAll('.post.redlib-collapsed:not(.highlighted)').length;
                    const shouldCollapse = collapsedCount < posts.length / 2;

                    posts.forEach(post => {
                        let postId = post.id;

                        if (postId) {
                            const isCurrentlyCollapsed = post.classList.contains('redlib-collapsed');
                            if (shouldCollapse && !isCurrentlyCollapsed) {
                                togglePost(post, postId);
                            } else if (!shouldCollapse && isCurrentlyCollapsed) {
                                togglePost(post, postId);
                            }
                        }
                    });

                    setTimeout(forceLayoutRecalculation, 100);
                }

                if (e.key === 'Escape' && floatingVideoContainer) {
                    removeFloatingVideoPlayer(true);
                }
            });
        }

        function init() {
            const collapsedPosts = getCollapsedPosts();
            processAllPosts();
            if (SettingsManager.getSetting('postCollapser', 'stickyMode')) {
                handleStickyMode();
            }
            addKeyboardShortcuts();

            const pageType = document.querySelector('.post.highlighted') ? 'comment page' : 'posts page';
            console.log('[Redlib Enhancement Suite] Post Collapser initialized on ' + pageType);
        }

        return {
            init: init,
            convertVideoToThumbnail: convertVideoToThumbnail,
            convertImageToThumbnail: convertImageToThumbnail,
            restoreVideoFromThumbnail: restoreVideoFromThumbnail,
            restoreImageFromThumbnail: restoreImageFromThumbnail
        };
    })();

    // ============================================================================
    // POST EXPAND BUTTONS MODULE
    // ============================================================================
    const PostExpandButtons = (function() {

        function createExpandButton(postElement) {
            const button = document.createElement('button');
            button.className = 'redlib-expand-btn';
            button.textContent = '[±]';
            button.title = 'Expand/Collapse post text';

            button.style.cssText =
                'background: var(--color-bg, #1a1a1b);' +
                'border: 1px solid var(--color-border, #343536);' +
                'color: var(--color-text, #d7dadc);' +
                'cursor: pointer;' +
                'font-size: 12px;' +
                'font-weight: bold;' +
                'margin-right: 8px;' +
                'padding: 2px 6px;' +
                'border-radius: 3px;' +
                'min-width: 24px;' +
                'line-height: 1;';

            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = 'var(--accent, #d54455)';
                button.style.color = 'var(--foreground, #222)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = 'var(--color-bg, #1a1a1b)';
                button.style.color = 'var(--color-text, #d7dadc)';
            });

            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePostTextExpansion(postElement, button);
            });

            // Check if posts should be expanded by default
            if (SettingsManager.getSetting('postCollapser', 'expandByDefault')) {
                const postPreview = postElement.querySelector('.post_preview');
                if (postPreview) {
                    postPreview.classList.add('redlib-text-expanded');
                    button.textContent = '[−]';
                    button.title = 'Minimize post';
                }
            }

            return button;
        }

        function togglePostTextExpansion(postElement, button) {
            const postPreview = postElement.querySelector('.post_preview');
            if (!postPreview) return;

            const isExpanded = postPreview.classList.contains('redlib-text-expanded');
            const isMinimized = postElement.classList.contains('redlib-text-minimized');
            const isCommentPage = window.location.pathname.includes('/comments/');

            if (isMinimized) {
                // State 3 -> State 1: Minimized to Default (with fadeout)
                animateTextStateChange(postElement, () => {
                    postElement.classList.remove('redlib-text-minimized');
                    postPreview.classList.remove('redlib-text-expanded');

                    // Restore thumbnails back to full media if PostCollapser is available
                    if (!isCommentPage && window.PostCollapser) {
                        PostCollapser.restoreVideoFromThumbnail(postElement);
                        PostCollapser.restoreImageFromThumbnail(postElement);
                    }

                    button.textContent = '[±]';
                    button.title = 'Expand post text';
                });
            } else if (isExpanded) {
                // State 2 -> State 3: Expanded to Minimized (no fadeout)
                animateTextStateChange(postElement, () => {
                    postPreview.classList.remove('redlib-text-expanded');
                    postElement.classList.add('redlib-text-minimized');

                    // Convert to thumbnails on post listing pages if PostCollapser is available
                    if (!isCommentPage && window.PostCollapser) {
                        PostCollapser.convertVideoToThumbnail(postElement);
                        PostCollapser.convertImageToThumbnail(postElement);
                    }

                    button.textContent = '[+]';
                    button.title = 'Restore post';
                });
            } else {
                // State 1 -> State 2: Default to Expanded (no fadeout)
                // Check if this will actually change height significantly
                const currentHeight = postElement.offsetHeight;

                // Temporarily expand to measure height difference
                postPreview.classList.add('redlib-text-expanded');
                const expandedHeight = postElement.offsetHeight;
                postPreview.classList.remove('redlib-text-expanded');

                if (Math.abs(expandedHeight - currentHeight) > 30) {
                    // Significant height change, animate it
                    animateTextStateChange(postElement, () => {
                        postPreview.classList.add('redlib-text-expanded');
                        button.textContent = '[−]';
                        button.title = 'Minimize post';
                    });
                } else {
                    // Minor height change, just apply directly
                    postPreview.classList.add('redlib-text-expanded');
                    button.textContent = '[−]';
                    button.title = 'Minimize post';
                }
            }
        }

        function animateTextStateChange(postElement, callback) {
            // Get current height
            const startHeight = postElement.offsetHeight;

            // Create a hidden clone to measure target height accurately
            const clone = postElement.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';
            clone.style.visibility = 'hidden';
            clone.style.height = 'auto';

            // Add clone to document
            document.body.appendChild(clone);

            // Get the current state elements from clone
            const clonePreview = clone.querySelector('.post_preview');
            const isCommentPage = window.location.pathname.includes('/comments/');

            // Apply the target state to clone to measure
            const isExpanded = clonePreview?.classList.contains('redlib-text-expanded');
            const isMinimized = clone.classList.contains('redlib-text-minimized');

            if (isMinimized) {
                // Going from minimized to default
                clone.classList.remove('redlib-text-minimized');
                if (clonePreview) clonePreview.classList.remove('redlib-text-expanded');
                if (!isCommentPage && window.PostCollapser) {
                    PostCollapser.restoreVideoFromThumbnail(clone);
                    PostCollapser.restoreImageFromThumbnail(clone);
                }
            } else if (isExpanded) {
                // Going from expanded to minimized
                if (clonePreview) clonePreview.classList.remove('redlib-text-expanded');
                clone.classList.add('redlib-text-minimized');
                if (!isCommentPage && window.PostCollapser) {
                    PostCollapser.convertVideoToThumbnail(clone);
                    PostCollapser.convertImageToThumbnail(clone);
                }
            } else {
                // Going from default to expanded
                if (clonePreview) clonePreview.classList.add('redlib-text-expanded');
            }

            // Force layout and measure target height
            clone.offsetHeight;
            const targetHeight = clone.offsetHeight;

            // Remove clone
            document.body.removeChild(clone);

            // Only animate if there's a meaningful height difference
            if (Math.abs(targetHeight - startHeight) < 20) {
                // Minor change, apply directly
                callback();
                return;
            }

            // Animate the height change
            postElement.classList.add('redlib-text-animating');
            postElement.style.height = startHeight + 'px';

            // Force layout
            postElement.offsetHeight;

            // Animate to target height
            requestAnimationFrame(() => {
                postElement.style.height = targetHeight + 'px';

                // Apply the actual state changes during animation
                setTimeout(() => {
                    callback();
                }, 200); // Halfway through animation

                // Clean up after animation
                setTimeout(() => {
                    postElement.style.height = '';
                    postElement.classList.remove('redlib-text-animating');
                }, 400);
            });
        }

        function processPost(postElement) {
            const isCommentPage = window.location.pathname.includes('/comments/');

            // Only add expand buttons on post listing pages, not comment pages
            if (!isCommentPage && !postElement.querySelector('.redlib-expand-btn')) {
                const postHeader = postElement.querySelector('.post_header');
                if (postHeader) {
                    const expandButton = createExpandButton(postElement);
                    postHeader.insertBefore(expandButton, postHeader.firstChild);
                }
            }
        }

        function processAllPosts() {
            const posts = document.querySelectorAll('.post, .post.highlighted');
            posts.forEach(processPost);
        }

        function init() {
            processAllPosts();
            console.log('[Redlib Enhancement Suite] Post Expand Buttons initialized');
        }

        return {
            init: init
        };
    })();

    // ============================================================================
    // HOVER COMMENTS MODULE
    // ============================================================================
    const HoverComments = (function() {
        class RedlibCommentPreview {
            constructor() {
                if (this.shouldSkipPage()) {
                    return;
                }

                this.popup = null;
                this.currentLink = null;
                this.currentUrl = null;
                this.currentCommentIndex = 0;
                this.comments = [];
                this.timeoutId = null;
                this.hideTimeoutId = null;
                this.cache = new Map();
                this.replyIndices = new Map();
                this.init();
            }

            shouldSkipPage() {
                const path = window.location.pathname;
                if (path.includes('/comments/')) {
                    return true;
                }
                return false;
            }

            init() {
                this.createPopup();
                this.bindEvents();
            }

            createPopup() {
                this.popup = document.createElement('div');
                this.popup.className = '_redlib_popup';
                document.body.appendChild(this.popup);

                // Prevent scroll events in username/subreddit popups from affecting comment popup close button
                const self = this;
                document.addEventListener('scroll', (e) => {
                    const usernamePopup = document.querySelector('._redlib_username_popup');
                    const subredditPopup = document.querySelector('._redlib_subreddit_popup');

                    if ((usernamePopup && usernamePopup.contains(e.target)) ||
                        (subredditPopup && subredditPopup.contains(e.target))) {
                        // Don't reposition comment popup close button for scrolls in other popups
                        return;
                    }

                    // Only reposition if the scroll is related to the comment popup
                    if (self.popup && self.popup.style.display === 'block') {
                        const closeBtn = self.popup.querySelector('.popup-close');
                        if (closeBtn) {
                            const rect = self.popup.getBoundingClientRect();
                            closeBtn.style.top = (rect.top + 8) + 'px';
                            closeBtn.style.right = (window.innerWidth - rect.right + 8) + 'px';
                        }
                    }
                }, true);
            }

            bindEvents() {
                document.addEventListener('mouseover', (e) => {
                    const commentLink = this.getCommentLink(e.target);
                    if (commentLink && commentLink !== this.currentLink) {
                        this.handleMouseEnter(commentLink);
                    }
                });

                document.addEventListener('mouseout', (e) => {
                    const commentLink = this.getCommentLink(e.target);
                    if (commentLink && !this.popup.contains(e.relatedTarget)) {
                        this.handleMouseLeave();
                    }
                });

                this.popup.addEventListener('mouseenter', () => {
                    this.clearHideTimeout();
                });

                this.popup.addEventListener('mouseleave', () => {
                    this.hidePopup();
                });

                this.popup.addEventListener('click', (e) => {
                    if (e.target.classList.contains('next_comment')) {
                        this.showNextComment();
                    } else if (e.target.classList.contains('next_reply')) {
                        const commentId = e.target.getAttribute('data-comment-id');
                        const parentId = e.target.getAttribute('data-parent-id') || null;
                        this.showNextReply(commentId, parentId);
                    }
                });
            }

            getCommentLink(element) {
                if (element.classList && element.classList.contains('post_comments')) {
                    return element;
                }

                let parent = element.parentElement;
                let depth = 0;
                while (parent && depth < 3) {
                    if (parent.classList && parent.classList.contains('post_comments')) {
                        return parent;
                    }
                    parent = parent.parentElement;
                    depth++;
                }

                return null;
            }

            handleMouseEnter(link) {
                this.currentLink = link;
                this.clearShowTimeout();
                this.clearHideTimeout();

                const url = link.href;

                if (this.cache.has(url)) {
                    const cached = this.cache.get(url);
                    this.comments = cached.comments;
                    this.currentCommentIndex = cached.currentIndex || 0;
                    this.replyIndices = cached.replyIndices || new Map();
                    this.currentUrl = url;
                    this.displayComments();
                    this.positionPopup(link.getBoundingClientRect());
                    this.popup.style.display = 'block';

                    // Ensure close button is functional even with cached data
                    const closeBtn = this.popup.querySelector('.popup-close');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            this.hidePopup();
                        });

                        // Position close button relative to popup
                        const rect = this.popup.getBoundingClientRect();
                        closeBtn.style.top = (rect.top + 8) + 'px';
                        closeBtn.style.right = (window.innerWidth - rect.right + 8) + 'px';
                    }
                    return;
                }

                this.showLoading(link);

                this.timeoutId = setTimeout(() => {
                    this.fetchAndShowPreview(link);
                }, 250);
            }

            handleMouseLeave() {
                this.clearShowTimeout();
                this.hidePopupDelayed();
            }

            clearShowTimeout() {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
            }

            clearHideTimeout() {
                if (this.hideTimeoutId) {
                    clearTimeout(this.hideTimeoutId);
                    this.hideTimeoutId = null;
                }
            }

            hidePopupDelayed() {
                this.hideTimeoutId = setTimeout(() => {
                    this.hidePopup();
                }, 500);
            }

            async fetchAndShowPreview(link) {
                const url = link.href;

                this.currentUrl = url;
                this.currentCommentIndex = 0;
                this.comments = [];
                this.replyIndices = new Map();

                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('HTTP ' + response.status + ': ' + response.statusText);

                    const html = await response.text();

                    this.parseComments(html);
                    this.cache.set(url, {
                        comments: this.comments,
                        currentIndex: this.currentCommentIndex,
                        replyIndices: new Map(this.replyIndices)
                    });
                    this.displayComments();
                } catch (error) {
                    this.showError('Failed to load comments');
                }
            }

            showLoading(link) {
                const rect = link.getBoundingClientRect();
                this.popup.innerHTML = '<div class="loading">Loading comments...</div>';
                this.positionPopup(rect);
                this.popup.style.display = 'block';
            }

            showError(message) {
                this.popup.innerHTML = '<div class="error">' + message + '</div>';
            }

            parseComments(html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const commentDivs = doc.querySelectorAll('div.thread > div.comment[id]');

                this.comments = [];

                commentDivs.forEach((commentDiv, index) => {
                    try {
                        const isCollapsedMod = this.isCollapsedModeratorPost(commentDiv);
                        if (isCollapsedMod && index === 0) {
                            return;
                        }

                        const comment = this.extractCommentData(commentDiv);

                        if (comment && comment.body.trim() && comment.body !== '[No content]') {
                            this.comments.push(comment);
                        }
                    } catch (error) {
                        // Skip failed comments
                    }
                });
            }

            isCollapsedModeratorPost(commentDiv) {
                const moderatorLink = commentDiv.querySelector('.comment_author.moderator');
                const detailsElement = commentDiv.querySelector('details.comment_right');

                const isCollapsed = detailsElement && !detailsElement.hasAttribute('open');
                const isModerator = !!moderatorLink;

                return isModerator && isCollapsed;
            }

            extractCommentData(commentDiv) {
                const authorLink = commentDiv.querySelector('a.comment_author');
                let author = '[deleted]';
                if (authorLink) {
                    author = authorLink.textContent.trim();
                    if (author.startsWith('u/')) {
                        author = author.substring(2);
                    }
                }

                const scoreElement = commentDiv.querySelector('.comment_score');
                let score = 0;
                if (scoreElement) {
                    const scoreText = scoreElement.textContent.trim();
                    const scoreMatch = scoreText.match(/([0-9,]+\.?[0-9]*[km]?)/i);
                    if (scoreMatch) {
                        let scoreStr = scoreMatch[1].toLowerCase();
                        if (scoreStr.includes('k')) {
                            score = parseFloat(scoreStr.replace('k', '')) * 1000;
                        } else if (scoreStr.includes('m')) {
                            score = parseFloat(scoreStr.replace('m', '')) * 1000000;
                        } else {
                            score = parseInt(scoreStr.replace(/,/g, '')) || 0;
                        }
                    }
                }

                const bodyDiv = commentDiv.querySelector('.comment_body .md, .comment_body');
                let body = '[No content]';

                if (bodyDiv) {
                    body = bodyDiv.innerHTML;
                    body = body.replace(/<script[^>]*>.*?<\/script>/gi, '');

                    if (!body.includes('<')) {
                        body = '<p>' + body + '</p>';
                    }
                }

                const timeSpan = commentDiv.querySelector('.created, .live-timestamp');
                const timeAgo = timeSpan ? timeSpan.textContent.trim() : '';

                const replies = this.extractReplies(commentDiv);

                return {
                    id: commentDiv.id,
                    author: author,
                    score: score,
                    body: body,
                    timeAgo: timeAgo,
                    replies: replies
                };
            }

            extractReplies(commentDiv) {
                const replies = [];
                const repliesContainer = commentDiv.querySelector('blockquote.replies');

                if (!repliesContainer) {
                    return replies;
                }

                const replyDivs = repliesContainer.querySelectorAll(':scope > div.comment[id]');

                replyDivs.forEach((replyDiv) => {
                    try {
                        const reply = this.extractSingleReply(replyDiv);
                        if (reply && reply.body.trim() && reply.body !== '[No content]') {
                            replies.push(reply);
                        }
                    } catch (error) {
                        // Skip failed replies
                    }
                });

                return replies;
            }

            extractSingleReply(replyDiv) {
                const authorLink = replyDiv.querySelector('a.comment_author');
                let author = '[deleted]';
                if (authorLink) {
                    author = authorLink.textContent.trim();
                    if (author.startsWith('u/')) {
                        author = author.substring(2);
                    }
                }

                const scoreElement = replyDiv.querySelector('.comment_score');
                let score = 0;
                if (scoreElement) {
                    const scoreText = scoreElement.textContent.trim();
                    const scoreMatch = scoreText.match(/([0-9,]+\.?[0-9]*[km]?)/i);
                    if (scoreMatch) {
                        let scoreStr = scoreMatch[1].toLowerCase();
                        if (scoreStr.includes('k')) {
                            score = parseFloat(scoreStr.replace('k', '')) * 1000;
                        } else if (scoreStr.includes('m')) {
                            score = parseFloat(scoreStr.replace('m', '')) * 1000000;
                        } else {
                            score = parseInt(scoreStr.replace(/,/g, '')) || 0;
                        }
                    }
                }

                const bodyDiv = replyDiv.querySelector('.comment_body .md, .comment_body');
                let body = '[No content]';

                if (bodyDiv) {
                    body = bodyDiv.innerHTML;
                    body = body.replace(/<script[^>]*>.*?<\/script>/gi, '');
                    if (!body.includes('<')) {
                        body = '<p>' + body + '</p>';
                    }
                }

                const timeSpan = replyDiv.querySelector('.created, .live-timestamp');
                const timeAgo = timeSpan ? timeSpan.textContent.trim() : '';

                const nestedReplies = this.extractReplies(replyDiv);

                return {
                    id: replyDiv.id,
                    author: author,
                    score: score,
                    body: body,
                    timeAgo: timeAgo,
                    replies: nestedReplies
                };
            }

            displayComments() {
                if (this.comments.length === 0) {
                    this.popup.innerHTML = '<div class="error">No top-level comments found</div>';
                    return;
                }

                const hasMore = this.currentCommentIndex < this.comments.length - 1;

                let html = '';

                // Add close button
                html += '<button class="popup-close">×</button>';


                if (this.comments.length > 1) {
                    if (hasMore) {
                        const remaining = this.comments.length - this.currentCommentIndex - 1;
                        html += '<div class="next_comment">▼ Show next (' + remaining + ' more top-level comments)</div>';
                    } else {
                        const totalShown = this.currentCommentIndex + 1;
                        html += '<div class="next_comment loaded">Loaded all ' + totalShown + ' top-level comments</div>';
                    }
                }

                for (let i = this.currentCommentIndex; i >= 0; i--) {
                    if (this.comments[i]) {
                        html += this.renderComment(this.comments[i]);
                    }
                }

                this.popup.innerHTML = html;
                // Add close button functionality
                const closeBtn = this.popup.querySelector('.popup-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        this.hidePopup();
                    });

                    // Position close button relative to popup and prevent interference from other popups
                    const rect = this.popup.getBoundingClientRect();
                    closeBtn.style.top = (rect.top + 8) + 'px';
                    closeBtn.style.right = (window.innerWidth - rect.right + 8) + 'px';

                    // Prevent repositioning from scroll events in child elements
                    closeBtn.style.position = 'fixed';
                    closeBtn.style.zIndex = '1003';
                }
            }

            renderComment(comment) {
                const replyIndex = this.replyIndices.get(comment.id) ?? -1;

                const score = comment.score > 0 ? comment.score.toLocaleString() : comment.score;
                const scoreText = Math.abs(comment.score) === 1 ? 'point' : 'points';

                let html =
                    '<div class="comment" data-comment-id="' + comment.id + '">' +
                    '<div class="comment_header">' +
                    '<a href="/user/' + comment.author + '" class="comment_author">u/' + comment.author + '</a>' +
                    '<span class="comment_meta_separator">•</span>' +
                    '<span class="comment_points">' + score + ' ' + scoreText + '</span>';

                if (comment.timeAgo) {
                    html += '<span class="comment_meta_separator">•</span><span class="comment_time">' + comment.timeAgo + '</span>';
                }

                html += '</div>' +
                    '<div class="comment_body">' + comment.body + '</div>';

                if (comment.replies && comment.replies.length > 0) {
                    const hasMoreReplies = replyIndex < comment.replies.length - 1;

                    if (hasMoreReplies) {
                        const remaining = comment.replies.length - replyIndex - 1;
                        const replyText = remaining === 1 ? 'reply' : 'replies';
                        html += '<div class="next_reply" data-comment-id="' + comment.id + '">' +
                            '▼ Next reply (' + remaining + ' more ' + replyText + ')' +
                            '</div>';
                    }
                }

                if (comment.replies && comment.replies.length > 0 && replyIndex >= 0) {
                    html += '<div class="replies" data-comment-id="' + comment.id + '">';

                    for (let i = replyIndex; i >= 0; i--) {
                        if (comment.replies[i]) {
                            html += this.renderReply(comment.replies[i], comment.id);
                        }
                    }

                    html += '</div>';
                }

                html += '</div>';
                return html;
            }

            renderReply(reply, parentId) {
                const score = reply.score > 0 ? reply.score.toLocaleString() : reply.score;
                const scoreText = Math.abs(reply.score) === 1 ? 'point' : 'points';

                const nestedReplyIndex = this.replyIndices.get(reply.id) ?? -1;

                let html =
                    '<div class="reply" data-reply-id="' + reply.id + '">' +
                    '<div class="comment_header">' +
                    '<a href="/user/' + reply.author + '" class="comment_author">u/' + reply.author + '</a>' +
                    '<span class="comment_meta_separator">•</span>' +
                    '<span class="comment_points">' + score + ' ' + scoreText + '</span>';

                if (reply.timeAgo) {
                    html += '<span class="comment_meta_separator">•</span><span class="comment_time">' + reply.timeAgo + '</span>';
                }

                html += '</div>' +
                    '<div class="comment_body">' + reply.body + '</div>';

                if (reply.replies && reply.replies.length > 0) {
                    const hasMoreNestedReplies = nestedReplyIndex < reply.replies.length - 1;
                    if (hasMoreNestedReplies) {
                        const remaining = reply.replies.length - nestedReplyIndex - 1;
                        const replyText = remaining === 1 ? 'reply' : 'replies';
                        html += '<div class="next_reply" data-comment-id="' + reply.id + '" data-parent-id="' + parentId + '">' +
                            '▼ Next reply (' + remaining + ' more ' + replyText + ')' +
                            '</div>';
                    }
                }

                if (reply.replies && reply.replies.length > 0 && nestedReplyIndex >= 0) {
                    html += '<div class="replies" data-comment-id="' + reply.id + '">';

                    for (let i = nestedReplyIndex; i >= 0; i--) {
                        if (reply.replies[i]) {
                            html += this.renderReply(reply.replies[i], reply.id);
                        }
                    }

                    html += '</div>';
                }

                html += '</div>';
                return html;
            }

            showNextComment() {
                if (this.currentCommentIndex < this.comments.length - 1) {
                    this.currentCommentIndex++;
                    this.displayComments();

                    if (this.currentUrl && this.cache.has(this.currentUrl)) {
                        this.cache.set(this.currentUrl, {
                            comments: this.comments,
                            currentIndex: this.currentCommentIndex,
                            replyIndices: new Map(this.replyIndices)
                        });
                    }
                }
            }

            showNextReply(commentId, parentId = null) {
                let targetComment = null;

                if (parentId) {
                    for (let comment of this.comments) {
                        const reply = this.findReplyById(comment, commentId);
                        if (reply) {
                            targetComment = reply;
                            break;
                        }
                    }
                } else {
                    targetComment = this.comments.find(c => c.id === commentId);
                }

                if (!targetComment) {
                    return;
                }

                if (!targetComment.replies || targetComment.replies.length === 0) {
                    return;
                }

                const currentIndex = this.replyIndices.get(commentId) ?? -1;
                const newIndex = currentIndex + 1;

                if (newIndex >= targetComment.replies.length) {
                    return;
                }

                const keyToStore = String(commentId);
                this.replyIndices.set(keyToStore, newIndex);

                this.displayComments();

                if (this.currentUrl && this.cache.has(this.currentUrl)) {
                    this.cache.set(this.currentUrl, {
                        comments: this.comments,
                        currentIndex: this.currentCommentIndex,
                        replyIndices: new Map(this.replyIndices)
                    });
                }
            }

            findReplyById(comment, replyId) {
                if (comment.replies) {
                    for (let reply of comment.replies) {
                        if (reply.id === replyId) {
                            return reply;
                        }
                        const nestedReply = this.findReplyById(reply, replyId);
                        if (nestedReply) {
                            return nestedReply;
                        }
                    }
                }
                return null;
            }

            positionPopup(rect) {
                const scrollTop = window.pageYOffset;
                const scrollLeft = window.pageXOffset;

                let top = rect.bottom + scrollTop + 2;
                let left = rect.left + scrollLeft;

                if (left + 600 > window.innerWidth) {
                    left = Math.max(10, window.innerWidth - 620);
                }

                this.popup.style.top = top + 'px';
                this.popup.style.left = left + 'px';
            }

            hidePopup() {
                // Don't hide if mouse is over a username/subreddit popup
                const usernamePopup = document.querySelector('._redlib_username_popup');
                const subredditPopup = document.querySelector('._redlib_subreddit_popup');

                if ((usernamePopup && usernamePopup.style.display === 'block') ||
                    (subredditPopup && subredditPopup.style.display === 'block')) {
                    // Set up a delayed check to hide when other popups are gone
                    this.clearHideTimeout();
                    this.hideTimeoutId = setTimeout(() => {
                        this.hidePopup(); // Re-check after delay
                    }, 300);
                    return;
                }

                if (this.popup) {
                    this.popup.style.display = 'none';
                }
                this.currentLink = null;
            }
        }

        function init() {
            new RedlibCommentPreview();
            console.log('[Redlib Enhancement Suite] Hover Comments initialized');
        }

        return {
            init: init
        };
    })();

    // ============================================================================
    // COMMENT COLLAPSER MODULE
    // ============================================================================
    const CommentCollapser = (function() {
        const initializedComments = new Set();

        function initializeComments() {
            if (!window.location.pathname.includes('/comments/')) {
                return;
            }

            const allChildComments = document.querySelectorAll('.thread .comment .replies .comment');
            allChildComments.forEach(comment => {
                const details = comment.querySelector('.comment_right');
                if (details && details.hasAttribute('open')) {
                    details.removeAttribute('open');
                }
            });

            const allComments = document.querySelectorAll('.comment');
            allComments.forEach(comment => {
                if (!initializedComments.has(comment)) {
                    addCustomExpandButton(comment);
                    initializedComments.add(comment);
                }
            });
        }

        function addCustomExpandButton(comment) {
            const summary = comment.querySelector('.comment_right > summary');
            if (!summary || summary.querySelector('.expand-children')) {
                return;
            }

            const expandButton = document.createElement('span');
            expandButton.className = 'expand-children';
            expandButton.textContent = '[±]';
            expandButton.setAttribute('data-expanded', 'false');
            expandButton.title = 'Expand direct replies';

            expandButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleCustomToggle(comment, expandButton);
            });

            summary.insertBefore(expandButton, summary.firstChild);
        }

        function handleCustomToggle(comment, button) {
            const isExpanded = button.getAttribute('data-expanded') === 'true';

            if (isExpanded) {
                collapseDirectChildren(comment);
                button.textContent = '[+]';
                button.setAttribute('data-expanded', 'false');
                button.title = 'Expand direct replies';
            } else {
                expandDirectChildrenOnly(comment);
                button.textContent = '[−]';
                button.setAttribute('data-expanded', 'true');
                button.title = 'Collapse direct replies';
            }
        }

        function expandDirectChildrenOnly(parentComment) {
            const directChildren = parentComment.querySelectorAll(':scope > .comment_right > .replies > .comment');

            directChildren.forEach(child => {
                const childDetails = child.querySelector('.comment_right');
                if (childDetails) {
                    childDetails.setAttribute('open', '');
                }

                const grandchildren = child.querySelectorAll(':scope > .comment_right > .replies > .comment');
                grandchildren.forEach(grandchild => {
                    const grandchildDetails = grandchild.querySelector('.comment_right');
                    if (grandchildDetails && grandchildDetails.hasAttribute('open')) {
                        grandchildDetails.removeAttribute('open');
                    }

                    const grandchildButton = grandchild.querySelector('.expand-children');
                    if (grandchildButton) {
                        grandchildButton.textContent = '[+]';
                        grandchildButton.setAttribute('data-expanded', 'false');
                    }
                });
            });
        }

        function collapseDirectChildren(parentComment) {
            const directChildren = parentComment.querySelectorAll(':scope > .comment_right > .replies > .comment');

            directChildren.forEach(child => {
                const childDetails = child.querySelector('.comment_right');
                if (childDetails) {
                    childDetails.removeAttribute('open');
                }

                const childButton = child.querySelector('.expand-children');
                if (childButton) {
                    childButton.textContent = '[+]';
                    childButton.setAttribute('data-expanded', 'false');
                }

                const descendants = child.querySelectorAll('.comment_right');
                descendants.forEach(desc => {
                    desc.removeAttribute('open');
                });

                const descendantButtons = child.querySelectorAll('.expand-children');
                descendantButtons.forEach(btn => {
                    btn.textContent = '[+]';
                    btn.setAttribute('data-expanded', 'false');
                });
            });
        }

        function collapseCommentAndDescendants(comment) {
            const details = comment.querySelector(':scope > .comment_right');
            if (details && details.hasAttribute('open')) {
                details.removeAttribute('open');
            }

            const button = comment.querySelector(':scope > .comment_right > summary > .expand-children');
            if (button) {
                button.textContent = '[+]';
                button.setAttribute('data-expanded', 'false');
            }

            const descendants = comment.querySelectorAll('.comment_right');
            descendants.forEach(desc => {
                desc.removeAttribute('open');
            });

            const descendantButtons = comment.querySelectorAll('.expand-children');
            descendantButtons.forEach(btn => {
                btn.textContent = '[+]';
                btn.setAttribute('data-expanded', 'false');
            });
        }

        function initializeNewComment(comment) {
            if (!initializedComments.has(comment)) {
                collapseCommentAndDescendants(comment);
                addCustomExpandButton(comment);
                initializedComments.add(comment);

                const childComments = comment.querySelectorAll('.comment');
                childComments.forEach(childComment => {
                    if (!initializedComments.has(childComment)) {
                        collapseCommentAndDescendants(childComment);
                        addCustomExpandButton(childComment);
                        initializedComments.add(childComment);
                    }
                });
            }
        }

        function init() {
            if (!window.location.pathname.includes('/comments/')) {
                return;
            }

            initializeComments();

            setTimeout(initializeComments, 1000);

            window.redlibEnhanced = {
                initializeNewComment: initializeNewComment,
                addCustomExpandButton: addCustomExpandButton
            };

            console.log('[Redlib Enhancement Suite] Comment Collapser initialized');
        }

        return {
            init: init
        };
    })();

    // ============================================================================
    // AJAX COMMENT LOADER MODULE
    // ============================================================================
    const AjaxCommentLoader = (function() {

        function isBotProtectionPage(html) {
            return html.includes('<title>Just a moment...</title>') ||
                html.includes('redlib.nohost.network needs to review the security of your connection');
        }

        function extractCommentId(url) {
            const patterns = [
                /\/([a-z0-9]+)(?:\/?\?|$)/,
                /\/([a-z0-9]+)(?:\/?#|$)/,
                /\/comments\/[^\/]+\/[^\/]+\/([a-z0-9]+)/,
                /\/([a-z0-9]+)$/
            ];

            for (let pattern of patterns) {
                const match = url.match(pattern);
                if (match) {
                    return match[1];
                }
            }
            return null;
        }

        function removeDuplicateComments(parentContainer) {
            const seenIds = new Set();
            const comments = parentContainer.querySelectorAll(':scope > div.comment');

            comments.forEach(comment => {
                const commentId = comment.id;
                if (commentId) {
                    if (seenIds.has(commentId)) {
                        comment.remove();
                    } else {
                        seenIds.add(commentId);
                    }
                }
            });
        }

        function loadMoreComments(link) {
            const url = link.href;
            const parentBlockquote = link.closest('blockquote.replies');

            if (!parentBlockquote) {
                return;
            }

            link.classList.add('ajax-loading');

            fetch(url)
                .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status + ': ' + response.statusText);
                }
                return response.text();
            })
                .then(html => {
                if (isBotProtectionPage(html)) {
                    throw new Error('Bot protection triggered - please refresh the page and complete the verification');
                }

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const commentId = extractCommentId(url);
                const targetComment = doc.querySelector('#' + commentId);

                if (!targetComment) {
                    throw new Error('Comment not found in response');
                }

                const newRepliesBlockquote = targetComment.querySelector('blockquote.replies');

                if (newRepliesBlockquote) {
                    const newComments = newRepliesBlockquote.querySelectorAll(':scope > div.comment');

                    link.remove();

                    newComments.forEach((comment) => {
                        const clonedComment = comment.cloneNode(true);
                        initializeNewComment(clonedComment);
                        parentBlockquote.appendChild(clonedComment);
                    });

                    removeDuplicateComments(parentBlockquote);

                    const newMoreRepliesLinks = newRepliesBlockquote.querySelectorAll('a.deeper_replies');
                    newMoreRepliesLinks.forEach(newLink => {
                        const clonedLink = newLink.cloneNode(true);
                        clonedLink.href = newLink.href;

                        const newLinkComment = newLink.closest('div.comment');
                        if (newLinkComment) {
                            const correspondingComment = parentBlockquote.querySelector('#' + newLinkComment.id);
                            if (correspondingComment) {
                                const correspondingReplies = correspondingComment.querySelector('blockquote.replies');
                                if (correspondingReplies) {
                                    correspondingReplies.appendChild(clonedLink);
                                    attachMoreRepliesListener(clonedLink);
                                }
                            }
                        }
                    });
                } else {
                    link.remove();
                }
            })
                .catch(error => {
                console.error('Error loading comments:', error);
                link.classList.remove('ajax-loading');
                link.classList.add('ajax-error');

                link.textContent = '→ ' + error.message + ' (Click to retry)';
                link.style.pointerEvents = 'auto';
                link.style.cursor = 'pointer';

                link.onclick = function(e) {
                    e.preventDefault();
                    link.classList.remove('ajax-error');
                    link.textContent = '→ More replies';
                    link.onclick = null;
                    loadMoreComments(link);
                };
            });
        }

        function initializeNewComment(comment) {
            // Check if CommentCollapser is enabled and initialize accordingly
            if (SettingsManager.getSetting('commentCollapser', 'enabled') && window.redlibEnhanced) {
                window.redlibEnhanced.initializeNewComment(comment);
            }
        }

        function attachMoreRepliesListener(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                loadMoreComments(this);
            });
        }

        function attachMoreRepliesListeners(container = document) {
            const moreRepliesLinks = container.querySelectorAll('a.deeper_replies');
            moreRepliesLinks.forEach(attachMoreRepliesListener);
        }

        function init() {
            if (!window.location.pathname.includes('/comments/')) {
                return;
            }

            attachMoreRepliesListeners();

            console.log('[Redlib Enhancement Suite] AJAX Comment Loader initialized');
        }

        return {
            init: init,
            attachMoreRepliesListeners: attachMoreRepliesListeners,
            initializeNewComment: initializeNewComment
        };
    })();

    // ============================================================================
    // SIDEBAR TOGGLE MODULE
    // ============================================================================
    const SidebarToggle = (function() {
        const STORAGE_KEY = 'redlib_sidebar_hidden';

        function getSidebarState() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored === null ? null : stored === 'true';
            } catch (e) {
                return null;
            }
        }

        function setSidebarState(hidden) {
            try {
                localStorage.setItem(STORAGE_KEY, hidden.toString());
            } catch (e) {
                console.warn('Could not save sidebar state to localStorage');
            }
        }

        function updateToggleButton(button, isHidden) {
            button.textContent = isHidden ? '←' : '→';
            button.setAttribute('data-tooltip', isHidden ? 'Show Subreddit Info & Sidebar' : 'Hide Subreddit Info & Sidebar');
        }

        function toggleSidebar() {
            const isCurrentlyHidden = document.body.classList.contains('redlib-sidebar-hidden');
            const newHiddenState = !isCurrentlyHidden;

            // Add transition class to trigger smooth animations
            document.body.classList.add('redlib-sidebar-transitioning');

            if (newHiddenState) {
                document.body.classList.add('redlib-sidebar-hidden');
            } else {
                document.body.classList.remove('redlib-sidebar-hidden');
            }

            // Update button appearance
            const toggleButton = document.querySelector('.redlib-sidebar-toggle');
            if (toggleButton) {
                updateToggleButton(toggleButton, newHiddenState);
            }

            // Save state
            setSidebarState(newHiddenState);

            // Force layout recalculation for smooth transition
            requestAnimationFrame(() => {
                document.body.offsetHeight;

                // Remove transition class after animation completes
                setTimeout(() => {
                    document.body.classList.remove('redlib-sidebar-transitioning');
                }, 300);
            });
        }

        function createToggleButton() {
            const button = document.createElement('button');
            button.className = 'redlib-sidebar-toggle';
            button.title = 'Toggle Sidebar';

            const isHidden = getSidebarState();
            updateToggleButton(button, isHidden);

            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
            });

            return button;
        }

        function applySavedState() {
            // Check if sidebars should be hidden by default
            const hideByDefault = SettingsManager.getSetting('sidebarToggle', 'hideByDefault');
            const savedState = getSidebarState();

            // If hideByDefault is true and no explicit saved state, hide sidebar
            const shouldHide = hideByDefault && savedState === null ? true : savedState;

            if (shouldHide) {
                document.body.classList.add('redlib-sidebar-hidden');
            }
        }

        function shouldShowToggle() {
            // Only show on subreddit listing pages, not on comment pages or other pages
            const path = window.location.pathname;

            // Check if we're on a subreddit page (not a comment page)
            if (path.includes('/comments/')) {
                return false;
            }

            // Check if we're on a subreddit listing page
            if (path.startsWith('/r/') && !path.includes('/wiki/') && !path.includes('/search')) {
                return true;
            }

            // Also show on homepage and main feeds
            if (path === '/' || path.startsWith('/r/popular') || path.startsWith('/r/all')) {
                return true;
            }

            return false;
        }

        function init() {
            // Only initialize on appropriate pages
            if (!shouldShowToggle()) {
                return;
            }

            // Check if sidebar exists
            const sidebar = document.querySelector('aside');
            if (!sidebar) {
                return;
            }

            // Apply saved state immediately
            applySavedState();

            // Create and add toggle button
            const toggleButton = createToggleButton();
            document.body.appendChild(toggleButton);

            // Handle keyboard shortcut (Ctrl+Shift+S)
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                    e.preventDefault();
                    toggleSidebar();
                }
            });

            console.log('[Redlib Enhancement Suite] Sidebar Toggle initialized');
        }

        return {
            init: init
        };
    })();

    // ============================================================================
    // SUBREDDIT HOVER MODULE
    // ============================================================================
    const SubredditHover = (function() {
        let popup = null;
        let currentLink = null;
        let currentSubreddit = null;
        let timeoutId = null;
        let hideTimeoutId = null;
        let cache = new Map(); // Cache subreddit data

        // Extract subreddit name from a link
        function getSubredditFromUrl(url) {
            try {
                const urlObj = new URL(url, window.location.origin);
                const match = urlObj.pathname.match(/^\/r\/([^\/]+)\/?$/);
                return match ? match[1] : null;
            } catch (e) {
                return null;
            }
        }

        // Check if a link is a username link
        function isSubredditLink(element) {
            if (element.tagName !== 'A' || !element.href) return false;

            // Skip navigation buttons (PREV/NEXT)
            const text = element.textContent.trim().toLowerCase();
            if (text === 'prev' || text === 'next' || text === '‹ prev' || text === 'next ›') {
                return false;
            }

            // Skip if element has navigation-related classes or IDs
            if (element.classList.contains('nav') || element.classList.contains('pagination') ||
                element.id.includes('nav') || element.id.includes('pagination')) {
                return false;
            }

            const subreddit = getSubredditFromUrl(element.href);

            // Skip special aggregate pages that aren't real subreddits
            if (subreddit && (subreddit.toLowerCase() === 'all' || subreddit.toLowerCase() === 'popular')) {
                return false;
            }

            return !!subreddit;
        }

        // Create the popup element
        function createPopup() {
            popup = document.createElement('div');
            popup.className = '_redlib_subreddit_popup';
            popup.style.cssText = `
        position: absolute;
        background: var(--background, #0f0f0f);
        border: 1px solid var(--highlighted, #333);
        border-radius: 8px;
        padding: 0;
        z-index: 9999;
        max-width: 320px;
        min-width: 280px;
        width: 320px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        display: none;
        color: var(--text, #d7dadc);
        font-size: 14px;
        line-height: 1.4;
        overflow: hidden;
    `;
            document.body.appendChild(popup);

            // Add event listeners to popup
            popup.addEventListener('mouseenter', clearHideTimeout);
            popup.addEventListener('mouseleave', hidePopupDelayed);
        }

        // Add CSS styles for the popup
        function addStyles() {
            const style = document.createElement('style');
            style.textContent = `
._redlib_subreddit_popup {
    position: absolute;
    background: var(--background, #0f0f0f);
    border: 1px solid var(--highlighted, #333);
    border-radius: 8px;
    padding: 0;
    z-index: 999;
    max-width: 320px;
    min-width: 280px;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: none;
    color: var(--text, #d7dadc);
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
}

            ._redlib_subreddit_popup .popup-header {
                background: var(--post, #161616);
                padding: 12px 16px;
                border-bottom: 1px solid var(--highlighted, #333);
                display: flex;
                align-items: center;
                gap: 12px;
            }

            ._redlib_subreddit_popup .popup-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                flex-shrink: 0;
            }

            ._redlib_subreddit_popup .popup-info h3 {
                margin: 0 0 4px 0;
                font-size: 16px;
                font-weight: bold;
                color: var(--text, #d7dadc);
            }

            ._redlib_subreddit_popup .popup-info .subreddit-name {
                margin: 0;
                font-size: 12px;
                color: var(--accent, #d54455);
                font-weight: normal;
            }

            ._redlib_subreddit_popup .popup-body {
                padding: 12px 16px;
            }

            ._redlib_subreddit_popup .popup-description {
                margin: 0 0 12px 0;
                font-size: 13px;
                line-height: 1.4;
                color: var(--text-muted, #818384);
                max-height: 60px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }

            ._redlib_subreddit_popup .popup-stats {
                display: flex;
                gap: 16px;
                margin-bottom: 12px;
                font-size: 12px;
            }

            ._redlib_subreddit_popup .popup-stat {
                text-align: center;
            }

            ._redlib_subreddit_popup .popup-stat-value {
                font-weight: bold;
                color: var(--text, #d7dadc);
                display: block;
            }

            ._redlib_subreddit_popup .popup-stat-label {
                color: var(--text-muted, #818384);
                font-size: 11px;
            }

            ._redlib_subreddit_popup .popup-actions {
                display: flex;
                gap: 8px;
            }

            ._redlib_subreddit_popup .popup-btn {
                flex: 1;
                padding: 6px 12px;
                border: 1px solid var(--highlighted, #333);
                border-radius: 4px;
                background: var(--foreground, #222);
                color: var(--text, #d7dadc);
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
                font-family: inherit;
            }

            ._redlib_subreddit_popup .popup-btn:hover {
                background: var(--highlighted, #333);
            }

            ._redlib_subreddit_popup .popup-btn.subscribe {
                background: var(--accent, #d54455);
                border-color: var(--accent, #d54455);
                color: var(--foreground, #222);
            }

            ._redlib_subreddit_popup .popup-btn.subscribe:hover {
                background: #b73d4a;
            }

            ._redlib_subreddit_popup .popup-btn.unsubscribe {
                background: var(--highlighted, #333);
                border-color: var(--accent, #d54455);
                color: var(--accent, #d54455);
            }

            ._redlib_subreddit_popup .popup-btn.filtered {
                background: var(--highlighted, #333);
                border-color: var(--accent, #d54455);
                color: var(--accent, #d54455);
            }

            ._redlib_subreddit_popup .popup-loading {
                padding: 20px;
                text-align: center;
                color: var(--text-muted, #818384);
                font-size: 13px;
            }

            ._redlib_subreddit_popup .popup-error {
                padding: 20px;
                text-align: center;
                color: var(--accent, #d54455);
                font-size: 13px;
            }

._redlib_subreddit_popup .popup-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--highlighted, #333);
    color: var(--text, #d7dadc);
    border: 1px solid var(--accent, #d54455);
    border-radius: 3px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}


._redlib_subreddit_popup .popup-close:hover {
    background: var(--accent, #d54455);
    color: var(--foreground, #222);
}

        `;
            document.head.appendChild(style);
        }

        // Fetch subreddit data
        // Fetch subreddit data
        async function fetchSubredditData(subreddit) {
            if (cache.has(subreddit)) {
                return cache.get(subreddit);
            }

            try {
                const response = await fetch(`/r/${subreddit}`, {
                    headers: {
                        'Accept': 'text/html'
                    }
                });

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Check if this is an error page (banned subreddit, etc.) regardless of status code
                const errorDiv = doc.querySelector('#error');
                if (errorDiv) {
                    const errorTitle = errorDiv.querySelector('h1');
                    if (errorTitle) {
                        const errorMessage = errorTitle.textContent.trim();
                        throw new Error(errorMessage);
                    } else {
                        throw new Error('This subreddit is not available');
                    }
                }

                // If we got a non-200 status and no error div, throw the HTTP error
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                // Extract subreddit info from the sidebar
                const subredditPanel = doc.querySelector('#subreddit');
                if (!subredditPanel) {
                    throw new Error('Subreddit panel not found');
                }

                const icon = subredditPanel.querySelector('#sub_icon');
                const title = subredditPanel.querySelector('#sub_title');
                const name = subredditPanel.querySelector('#sub_name');
                const description = subredditPanel.querySelector('#sub_description');
                const details = subredditPanel.querySelectorAll('#sub_details > div');
                const subscribeForm = subredditPanel.querySelector('#sub_subscription form');
                const filterForm = subredditPanel.querySelector('#sub_filter form');

                // Debug logging for troubleshooting
                console.debug(`[Redlib Enhancement Suite] Parsing subreddit ${subreddit}:`, {
                    hasIcon: !!icon,
                    hasTitle: !!title,
                    hasName: !!name,
                    hasDescription: !!description,
                    detailsCount: details.length,
                    hasSubscribeForm: !!subscribeForm,
                    hasFilterForm: !!filterForm
                });

                // Safely check subscription status
                let isSubscribed = false;
                if (subscribeForm && subscribeForm.action) {
                    isSubscribed = subscribeForm.action.includes('unsubscribe');
                }

                // Safely check filter status
                let isFiltered = false;
                if (filterForm) {
                    // Look for filter button with various possible selectors
                    const filterButton = filterForm.querySelector('.filter') ||
                          filterForm.querySelector('.filtered') ||
                          filterForm.querySelector('button[class*="filter"]') ||
                          filterForm.querySelector('button');

                    if (filterButton && filterButton.textContent) {
                        const buttonText = filterButton.textContent.trim().toLowerCase();
                        isFiltered = buttonText.includes('unfilter') ||
                            buttonText.includes('filtered') ||
                            filterButton.classList.contains('filtered');

                        console.debug(`[Redlib Enhancement Suite] Filter button for ${subreddit}:`, {
                            text: buttonText,
                            isFiltered: isFiltered,
                            className: filterButton.className
                        });
                    }
                }

                const data = {
                    icon: icon ? icon.src : null,
                    title: title ? title.textContent?.trim() || `r/${subreddit}` : `r/${subreddit}`,
                    name: name ? name.textContent?.trim() || `r/${subreddit}` : `r/${subreddit}`,
                    description: description ? description.textContent?.trim() || '' : '',
                    members: details[0] ? details[0].textContent?.trim() || '0' : '0',
                    active: details[1] ? details[1].textContent?.trim() || '0' : '0',
                    isSubscribed: isSubscribed,
                    isFiltered: isFiltered,
                    subreddit: subreddit
                };

                cache.set(subreddit, data);
                return data;
            } catch (error) {
                console.error('[Redlib Enhancement Suite] Error fetching subreddit data for', subreddit, ':', error);

                // Log more details for debugging
                if (error.message.includes('Cannot read properties of null')) {
                    console.warn('[Redlib Enhancement Suite] This might be a filtered/private subreddit with different HTML structure');
                }

                throw error;
            }
        }

        // Show loading state
        function showLoading() {
            popup.innerHTML = '<div class="popup-loading">Loading subreddit info...</div>';
            popup.style.display = 'block';
        }

        // Show error state
        function showError(message) {
            popup.innerHTML = `<div class="popup-error">Failed to load: ${message}</div>`;
        }

        // Render subreddit data
        function renderSubredditData(data) {
            const subscribeButtonText = data.isSubscribed ? 'Unsubscribe' : 'Subscribe';
            const subscribeButtonClass = data.isSubscribed ? 'unsubscribe' : 'subscribe';
            const filterButtonText = data.isFiltered ? 'Unfilter' : 'Filter';
            const filterButtonClass = data.isFiltered ? 'filtered' : '';

            popup.innerHTML = `
        <div class="popup-header">
            ${data.icon ? `<img class="popup-icon" src="${data.icon}" alt="r/${data.subreddit}">` : ''}
            <div class="popup-info">
                <h3>${data.title}</h3>
                <p class="subreddit-name">${data.name}</p>
            </div>
        </div>
        <button class="popup-close">×</button>
        <div class="popup-body">
            ${data.description ? `<p class="popup-description">${data.description}</p>` : ''}
            <div class="popup-stats">
                <div class="popup-stat">
                    <span class="popup-stat-value">${data.members}</span>
                    <span class="popup-stat-label">Members</span>
                </div>
                <div class="popup-stat">
                    <span class="popup-stat-value">${data.active}</span>
                    <span class="popup-stat-label">Active</span>
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-btn ${subscribeButtonClass}" data-action="subscribe" data-subreddit="${data.subreddit}">
                    ${subscribeButtonText}
                </button>
                <button class="popup-btn ${filterButtonClass}" data-action="filter" data-subreddit="${data.subreddit}">
                    ${filterButtonText}
                </button>
            </div>
        </div>
    `;

            // Add click handlers to buttons
            const subscribeBtn = popup.querySelector('[data-action="subscribe"]');
            const filterBtn = popup.querySelector('[data-action="filter"]');

            if (subscribeBtn) {
                subscribeBtn.addEventListener('click', () => handleAction('subscribe', data));
            }
            if (filterBtn) {
                filterBtn.addEventListener('click', () => handleAction('filter', data));
            }

            // Add close button functionality
            const closeBtn = popup.querySelector('.popup-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    hidePopup();
                });
            }
        }

        // Handle subscribe/filter actions
        async function handleAction(action, data) {
            const button = popup.querySelector(`[data-action="${action}"]`);
            if (!button) return;

            const originalText = button.textContent;
            button.textContent = 'Loading...';
            button.disabled = true;

            try {
                let endpoint, method = 'POST';

                if (action === 'subscribe') {
                    endpoint = data.isSubscribed
                        ? `/r/${data.subreddit}/unsubscribe?redirect=r/${data.subreddit}`
                    : `/r/${data.subreddit}/subscribe?redirect=r/${data.subreddit}`;
                } else if (action === 'filter') {
                    // Use different endpoints for filter vs unfilter
                    endpoint = data.isFiltered
                        ? `/r/${data.subreddit}/unfilter?redirect=r/${data.subreddit}`
                    : `/r/${data.subreddit}/filter?redirect=r/${data.subreddit}`;
                }

                const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

                if (response.ok) {
                    // Update cache and UI
                    if (action === 'subscribe') {
                        data.isSubscribed = !data.isSubscribed;
                        button.textContent = data.isSubscribed ? 'Unsubscribe' : 'Subscribe';
                        button.className = `popup-btn ${data.isSubscribed ? 'unsubscribe' : 'subscribe'}`;
                    } else if (action === 'filter') {
                        data.isFiltered = !data.isFiltered;
                        button.textContent = data.isFiltered ? 'Unfilter' : 'Filter';
                        button.className = `popup-btn ${data.isFiltered ? 'filtered' : ''}`;
                    }

                    // Update cache
                    cache.set(data.subreddit, data);

                    // Clear cache for this subreddit to force refresh on next hover
                    // This ensures we get the updated state from the server
                    setTimeout(() => {
                        cache.delete(data.subreddit);
                    }, 100);
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('[Redlib Enhancement Suite] Action failed:', error);
                button.textContent = 'Error';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            } finally {
                button.disabled = false;
            }
        }

        // Position popup relative to link
        function positionPopup(link) {
            const rect = link.getBoundingClientRect();
            const scrollTop = window.pageYOffset;
            const scrollLeft = window.pageXOffset;

            let top = rect.bottom + scrollTop + 2;
            let left = rect.left + scrollLeft;

            if (left + 600 > window.innerWidth) {
                left = Math.max(10, window.innerWidth - 620);
            }

            popup.style.top = top + 'px';
            popup.style.left = left + 'px';
        }

        // Show popup for subreddit
        async function showPopup(link, subreddit) {
            if (!popup) {
                createPopup();
            }

            currentLink = link;
            currentSubreddit = subreddit;

            showLoading();
            positionPopup(link);

            try {
                const data = await fetchSubredditData(subreddit);
                if (currentSubreddit === subreddit) { // Still showing same subreddit
                    renderSubredditData(data);
                    positionPopup(link); // Reposition after content is rendered
                }
            } catch (error) {
                if (currentSubreddit === subreddit) {
                    showError(error.message);
                }
            }
        }

        // Hide popup
        function hidePopup() {
            // Don't hide if comments popup is still active
            const commentsPopup = document.querySelector('._redlib_popup');
            if (commentsPopup && commentsPopup.style.display === 'block') {
                const commentsRect = commentsPopup.getBoundingClientRect();
                const mouseX = event?.clientX || 0;
                const mouseY = event?.clientY || 0;

                // If mouse is near comments popup, delay hiding longer
                if (mouseX >= commentsRect.left - 20 && mouseX <= commentsRect.right + 20 &&
                    mouseY >= commentsRect.top - 20 && mouseY <= commentsRect.bottom + 20) {
                    this.hideTimeoutId = setTimeout(() => this.hidePopup(), 1000);
                    return;
                }
            }
            if (popup) {
                popup.style.display = 'none';
            }
            currentLink = null;
            currentSubreddit = null;
        }

        // Clear hide timeout
        function clearHideTimeout() {
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId);
                hideTimeoutId = null;
            }
        }

        // Hide popup with delay
        function hidePopupDelayed() {
            hideTimeoutId = setTimeout(hidePopup, 500);
        }

        // Handle mouse enter on subreddit link
        function handleMouseEnter(event) {
            const link = event.target;
            const subreddit = getSubredditFromUrl(link.href);

            // Skip special aggregate pages
            if (!subreddit || subreddit.toLowerCase() === 'all' || subreddit.toLowerCase() === 'popular') {
                return;
            }

            clearTimeout(timeoutId);
            clearHideTimeout();

            // Show popup after short delay
            timeoutId = setTimeout(() => {
                showPopup(link, subreddit);
            }, 250);
        }

        // Handle mouse leave on subreddit link
        function handleMouseLeave(event) {
            clearTimeout(timeoutId);

            // Don't hide if moving to popup
            if (!popup || !popup.contains(event.relatedTarget)) {
                hidePopupDelayed();
            }
        }

        // Bind events to subreddit links
        function bindEvents() {
            // Use event delegation for better performance
            document.addEventListener('mouseover', (event) => {
                if (isSubredditLink(event.target)) {
                    console.log('Subreddit link detected:', event.target.href);
                    handleMouseEnter(event);
                }
            });

            document.addEventListener('mouseout', (event) => {
                if (isSubredditLink(event.target)) {
                    handleMouseLeave(event);
                }
            });
        }

        // Initialize the module
        function init() {
            addStyles();
            bindEvents();

            console.log('[Redlib Enhancement Suite] Subreddit Hover initialized');
        }

        return {
            init: init
        };
    })();

    // ============================================================================
    // USERNAME HOVER MODULE
    // ============================================================================
    const UsernameHover = (function() {
        let popup = null;
        let currentLink = null;
        let currentUsername = null;
        let timeoutId = null;
        let hideTimeoutId = null;
        let cache = new Map(); // Cache user data

        // Extract username from a link
        // Extract username from a link
        function getUsernameFromUrl(url) {
            try {
                const urlObj = new URL(url, window.location.origin);
                // Match both /u/username and /user/username formats
                const match = urlObj.pathname.match(/^\/u(?:ser)?\/([^\/]+)\/?$/);
                return match ? match[1] : null;
            } catch (e) {
                return null;
            }
        }

        // Check if a link is a username link
        // Check if a link is a username link
        function isUsernameLink(element) {
            if (element.tagName !== 'A' || !element.href) return false;

            // Check the URL format
            const username = getUsernameFromUrl(element.href);
            if (username) return true;

            // Also check if the text content looks like a username reference
            // This catches cases where the link text is "u/username" but might link elsewhere
            const textContent = element.textContent.trim();
            const textMatch = textContent.match(/^u\/([a-zA-Z0-9_-]+)$/);

            if (textMatch) {
                // Verify the link actually goes to a user page
                try {
                    const urlObj = new URL(element.href, window.location.origin);
                    const urlUsername = urlObj.pathname.match(/^\/u(?:ser)?\/([^\/]+)\/?$/);
                    return urlUsername && urlUsername[1] === textMatch[1];
                } catch (e) {
                    return false;
                }
            }

            return false;
        }

        // Create the popup element
        function createPopup() {
            popup = document.createElement('div');
            popup.className = '_redlib_username_popup';
            popup.style.cssText = `
        position: absolute;
        background: var(--background, #0f0f0f);
        border: 1px solid var(--highlighted, #333);
        border-radius: 8px;
        padding: 0;
        z-index: 9999;
        max-width: 320px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        display: none;
        color: var(--text, #d7dadc);
        font-size: 14px;
        line-height: 1.4;
        overflow: hidden;
    `;
            document.body.appendChild(popup);

            // Add event listeners to popup
            popup.addEventListener('mouseenter', clearHideTimeout);
            popup.addEventListener('mouseleave', hidePopupDelayed);
        }

        // Add CSS styles for the popup
        function addStyles() {
            const style = document.createElement('style');
            style.textContent = `
._redlib_username_popup {
    position: absolute;
    background: var(--background, #0f0f0f);
    border: 1px solid var(--highlighted, #333);
    border-radius: 8px;
    padding: 0;
    z-index: 999;
    max-width: 320px;
    min-width: 280px;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: none;
    color: var(--text, #d7dadc);
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
}

        ._redlib_username_popup .popup-header {
            background: var(--post, #161616);
            padding: 12px 16px;
            border-bottom: 1px solid var(--highlighted, #333);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        ._redlib_username_popup .popup-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        ._redlib_username_popup .popup-info h3 {
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: bold;
            color: var(--text, #d7dadc);
        }

        ._redlib_username_popup .popup-info .username-name {
            margin: 0;
            font-size: 12px;
            color: var(--accent, #d54455);
            font-weight: normal;
        }

._redlib_username_popup .popup-body {
    padding: 12px 16px;
}

._redlib_username_popup .popup-description {
    margin: 0 0 12px 0;
    font-size: 13px;
    line-height: 1.4;
    color: var(--text-muted, #818384);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

._redlib_username_popup .popup-description:empty {
    display: none;
    margin: 0;
}

        ._redlib_username_popup .popup-stats {
            display: flex;
            gap: 16px;
            margin-bottom: 12px;
            font-size: 12px;
        }

        ._redlib_username_popup .popup-stat {
            text-align: center;
        }

        ._redlib_username_popup .popup-stat-value {
            font-weight: bold;
            color: var(--text, #d7dadc);
            display: block;
        }

        ._redlib_username_popup .popup-stat-label {
            color: var(--text-muted, #818384);
            font-size: 11px;
        }

        ._redlib_username_popup .popup-actions {
            display: flex;
            gap: 8px;
        }

        ._redlib_username_popup .popup-btn {
            flex: 1;
            padding: 6px 12px;
            border: 1px solid var(--highlighted, #333);
            border-radius: 4px;
            background: var(--foreground, #222);
            color: var(--text, #d7dadc);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            font-family: inherit;
        }

        ._redlib_username_popup .popup-btn:hover {
            background: var(--highlighted, #333);
        }

        ._redlib_username_popup .popup-btn.follow {
            background: var(--accent, #d54455);
            border-color: var(--accent, #d54455);
            color: var(--foreground, #222);
        }

        ._redlib_username_popup .popup-btn.follow:hover {
            background: #b73d4a;
        }

        ._redlib_username_popup .popup-btn.unfollow {
            background: var(--highlighted, #333);
            border-color: var(--accent, #d54455);
            color: var(--accent, #d54455);
        }

        ._redlib_username_popup .popup-btn.filtered {
            background: var(--highlighted, #333);
            border-color: var(--accent, #d54455);
            color: var(--accent, #d54455);
        }

        ._redlib_username_popup .popup-loading {
            padding: 20px;
            text-align: center;
            color: var(--text-muted, #818384);
            font-size: 13px;
        }

        ._redlib_username_popup .popup-error {
            padding: 20px;
            text-align: center;
            color: var(--accent, #d54455);
            font-size: 13px;
        }

._redlib_username_popup .popup-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--highlighted, #333);
    color: var(--text, #d7dadc);
    border: 1px solid var(--accent, #d54455);
    border-radius: 3px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}

._redlib_username_popup .popup-close:hover {
    background: var(--accent, #d54455);
    color: var(--foreground, #222);
}


    `;
            document.head.appendChild(style);
        }

        // Fetch user data
        async function fetchUserData(username) {
            if (cache.has(username)) {
                return cache.get(username);
            }

            try {
                const response = await fetch(`/user/${username}`, {
                    headers: {
                        'Accept': 'text/html'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract user info from the user panel
                const userPanel = doc.querySelector('#user');
                if (!userPanel) {
                    throw new Error('User panel not found');
                }

                const icon = userPanel.querySelector('#user_icon');
                const title = userPanel.querySelector('#user_title');
                const name = userPanel.querySelector('#user_name');
                const description = userPanel.querySelector('#user_description');
                const details = userPanel.querySelectorAll('#user_details > div');
                const followForm = userPanel.querySelector('#user_subscription form');
                const filterForm = userPanel.querySelector('#user_filter form');

                // Check follow status
                let isFollowed = false;
                if (followForm && followForm.action) {
                    isFollowed = followForm.action.includes('unsubscribe');
                }

                // Check filter status
                let isFiltered = false;
                if (filterForm) {
                    const filterButton = filterForm.querySelector('button');
                    if (filterButton && filterButton.textContent) {
                        const buttonText = filterButton.textContent.trim().toLowerCase();
                        isFiltered = buttonText.includes('unfilter') ||
                            buttonText.includes('filtered');
                    }
                }

                const data = {
                    icon: icon ? icon.src : null,
                    title: title ? title.textContent?.trim() || username : username,
                    name: name ? name.textContent?.trim() || `u/${username}` : `u/${username}`,
                    description: description ? description.textContent?.trim() || '' : '',
                    karma: details[0] ? details[0].textContent?.trim() || '0' : '0',
                    created: details[1] ? details[1].textContent?.trim() || 'Unknown' : 'Unknown',
                    isFollowed: isFollowed,
                    isFiltered: isFiltered,
                    username: username
                };

                cache.set(username, data);
                return data;
            } catch (error) {
                console.error('[Redlib Enhancement Suite] Error fetching user data for', username, ':', error);
                throw error;
            }
        }

        // Show loading state
        function showLoading() {
            popup.innerHTML = '<div class="popup-loading">Loading user info...</div>';
            popup.style.display = 'block';
        }

        // Show error state
        function showError(message) {
            popup.innerHTML = `<div class="popup-error">Failed to load: ${message}</div>`;
        }

        // Render user data
        function renderUserData(data) {
            const followButtonText = data.isFollowed ? 'Unfollow' : 'Follow';
            const followButtonClass = data.isFollowed ? 'unfollow' : 'follow';
            const filterButtonText = data.isFiltered ? 'Unfilter' : 'Filter';
            const filterButtonClass = data.isFiltered ? 'filtered' : '';

            popup.innerHTML = `
            <div class="popup-header">
                ${data.icon ? `<img class="popup-icon" src="${data.icon}" alt="u/${data.username}">` : ''}
                <div class="popup-info">
                    <h3>${data.title}</h3>
                    <p class="username-name">${data.name}</p>
                </div>
                                <button class="popup-close">×</button>

            </div>
            <div class="popup-body">
                ${data.description ? `<p class="popup-description">${data.description}</p>` : ''}
                <div class="popup-stats">
                    <div class="popup-stat">
                        <span class="popup-stat-value">${data.karma}</span>
                        <span class="popup-stat-label">Karma</span>
                    </div>
                    <div class="popup-stat">
                        <span class="popup-stat-value">${data.created}</span>
                        <span class="popup-stat-label">Created</span>
                    </div>
                </div>
                <div class="popup-actions">
                    <button class="popup-btn ${followButtonClass}" data-action="follow" data-username="${data.username}">
                        ${followButtonText}
                    </button>
                    <button class="popup-btn ${filterButtonClass}" data-action="filter" data-username="${data.username}">
                        ${filterButtonText}
                    </button>
                </div>
            </div>
        `;

            // Add click handlers to buttons
            const followBtn = popup.querySelector('[data-action="follow"]');
            const filterBtn = popup.querySelector('[data-action="filter"]');

            if (followBtn) {
                followBtn.addEventListener('click', () => handleAction('follow', data));
            }
            if (filterBtn) {
                filterBtn.addEventListener('click', () => handleAction('filter', data));
            }

// Add close button functionality
const closeBtn = popup.querySelector('.popup-close');
if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hidePopupImmediate();
    });
}

        }

        // Handle follow/filter actions
        async function handleAction(action, data) {
            const button = popup.querySelector(`[data-action="${action}"]`);
            if (!button) return;

            const originalText = button.textContent;
            button.textContent = 'Loading...';
            button.disabled = true;

            try {
                let endpoint, method = 'POST';

                if (action === 'follow') {
                    endpoint = data.isFollowed
                        ? `/r/u_${data.username}/unsubscribe?redirect=user/${data.username}`
                    : `/r/u_${data.username}/subscribe?redirect=user/${data.username}`;
                } else if (action === 'filter') {
                    endpoint = data.isFiltered
                        ? `/r/u_${data.username}/unfilter?redirect=user/${data.username}`
                    : `/r/u_${data.username}/filter?redirect=user/${data.username}`;
                }

                const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

                if (response.ok) {
                    // Update cache and UI
                    if (action === 'follow') {
                        data.isFollowed = !data.isFollowed;
                        button.textContent = data.isFollowed ? 'Unfollow' : 'Follow';
                        button.className = `popup-btn ${data.isFollowed ? 'unfollow' : 'follow'}`;
                    } else if (action === 'filter') {
                        data.isFiltered = !data.isFiltered;
                        button.textContent = data.isFiltered ? 'Unfilter' : 'Filter';
                        button.className = `popup-btn ${data.isFiltered ? 'filtered' : ''}`;
                    }

                    // Update cache
                    cache.set(data.username, data);

                    // Clear cache for this user to force refresh on next hover
                    setTimeout(() => {
                        cache.delete(data.username);
                    }, 100);
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('[Redlib Enhancement Suite] Action failed:', error);
                button.textContent = 'Error';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            } finally {
                button.disabled = false;
            }
        }

        // Position popup relative to link
        function positionPopup(link) {
            const rect = link.getBoundingClientRect();
            const scrollTop = window.pageYOffset;
            const scrollLeft = window.pageXOffset;

            let top = rect.bottom + scrollTop + 8;
            let left = rect.left + scrollLeft;

            // Adjust if popup would go off-screen
            const popupRect = popup.getBoundingClientRect();
            if (left + 320 > window.innerWidth) {
                left = Math.max(10, window.innerWidth - 330);
            }

            if (top + popupRect.height > window.innerHeight + scrollTop) {
                top = rect.top + scrollTop - popupRect.height - 8;
            }

            popup.style.top = top + 'px';
            popup.style.left = left + 'px';
        }

        // Show popup for username
        async function showPopup(link, username) {
            if (!popup) {
                createPopup();
            }

            currentLink = link;
            currentUsername = username;

            showLoading();
            positionPopup(link);

            try {
                const data = await fetchUserData(username);
                if (currentUsername === username) { // Still showing same user
                    renderUserData(data);
                    positionPopup(link); // Reposition after content is rendered
                }
            } catch (error) {
                if (currentUsername === username) {
                    showError(error.message);
                }
            }
        }

        // Hide popup
        function hidePopup() {
            // Don't hide if comments popup is still active
            const commentsPopup = document.querySelector('._redlib_popup');
            if (commentsPopup && commentsPopup.style.display === 'block') {
                const commentsRect = commentsPopup.getBoundingClientRect();
                const mouseX = event?.clientX || 0;
                const mouseY = event?.clientY || 0;

                // If mouse is near comments popup, delay hiding longer
                if (mouseX >= commentsRect.left - 20 && mouseX <= commentsRect.right + 20 &&
                    mouseY >= commentsRect.top - 20 && mouseY <= commentsRect.bottom + 20) {
                    hideTimeoutId = setTimeout(() => hidePopup(), 1000);
                    return;
                }
            }
            if (popup) {
                popup.style.display = 'none';
            }
            currentLink = null;
            currentUsername = null;
        }

// Hide popup immediately (for close button clicks)
function hidePopupImmediate() {
    if (popup) {
        popup.style.display = 'none';
    }
    currentLink = null;
    currentUsername = null;
    // Clear any pending timeouts
    if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
        hideTimeoutId = null;
    }
}

        // Clear hide timeout
        function clearHideTimeout() {
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId);
                hideTimeoutId = null;
            }
        }

        // Hide popup with delay
        function hidePopupDelayed() {
            hideTimeoutId = setTimeout(hidePopup, 500);
        }

        // Handle mouse enter on username link
        function handleMouseEnter(event) {
            const link = event.target;
            const username = getUsernameFromUrl(link.href);

            if (!username) return;

            clearTimeout(timeoutId);
            clearHideTimeout();

            // Show popup after short delay
            timeoutId = setTimeout(() => {
                showPopup(link, username);
            }, 250);
        }

        // Handle mouse leave on username link
        function handleMouseLeave(event) {
            clearTimeout(timeoutId);

            // Don't hide if moving to popup
            if (!popup || !popup.contains(event.relatedTarget)) {
                hidePopupDelayed();
            }
        }

        // Bind events to username links
        function bindEvents() {
            // Use event delegation for better performance
            document.addEventListener('mouseover', (event) => {
                if (isUsernameLink(event.target)) {
                    handleMouseEnter(event);
                }
            });

            document.addEventListener('mouseout', (event) => {
                if (isUsernameLink(event.target)) {
                    handleMouseLeave(event);
                }
            });
        }

        // Initialize the module
        function init() {
            addStyles();
            bindEvents();

            console.log('[Redlib Enhancement Suite] Username Hover initialized');
        }

        return {
            init: init
        };
    })();

    // ============================================================================
    // SETTINGS MANAGER MODULE
    // ============================================================================
    const SettingsManager = (function() {
        const STORAGE_KEY = 'redlib_enhancement_settings';

        const DEFAULT_SETTINGS = {
            postCollapser: {
                enabled: true,
                floatingVideo: true,
                stickyMode: true,
                expandButtons: true,
                expandByDefault: false
            },
            hoverComments: {
                enabled: false
            },
            commentCollapser: {
                enabled: true
            },
            ajaxCommentLoading: {
                enabled: true
            },
            commentStyling: {
                enabled: true
            },
            sidebarToggle: {
                enabled: true,
                hideByDefault: false
            },
            subredditHover: {
                enabled: false
            },
            usernameHover: {
                enabled: false
            }
        };

        let currentSettings = { ...DEFAULT_SETTINGS };
        let pendingSettings = null; // Track pending changes
        let settingsOverlay = null;

        function loadSettings() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    currentSettings = mergeSettings(DEFAULT_SETTINGS, parsed);
                }
            } catch (e) {
                console.warn('[Redlib Enhancement Suite] Failed to load settings, using defaults');
                currentSettings = { ...DEFAULT_SETTINGS };
            }
            return currentSettings;
        }

        function saveSettings(settings = currentSettings) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
                return true;
            } catch (e) {
                console.warn('[Redlib Enhancement Suite] Failed to save settings');
                return false;
            }
        }

        function mergeSettings(defaults, stored) {
            const merged = { ...defaults };
            for (const [key, value] of Object.entries(stored)) {
                if (merged[key] && typeof value === 'object' && !Array.isArray(value)) {
                    merged[key] = { ...merged[key], ...value };
                } else {
                    merged[key] = value;
                }
            }
            return merged;
        }

        function getSetting(module, setting = null) {
            if (setting === null) {
                return currentSettings[module] || {};
            }
            return currentSettings[module]?.[setting] ?? false;
        }

        function setSetting(module, setting, value) {
            if (!currentSettings[module]) {
                currentSettings[module] = {};
            }
            if (typeof setting === 'object') {
                currentSettings[module] = { ...currentSettings[module], ...setting };
            } else {
                currentSettings[module][setting] = value;
            }
            saveSettings();
        }

        function setPendingSetting(module, setting, value) {
            if (!pendingSettings) {
                pendingSettings = JSON.parse(JSON.stringify(currentSettings)); // Deep clone
            }

            if (!pendingSettings[module]) {
                pendingSettings[module] = {};
            }

            if (typeof setting === 'object') {
                pendingSettings[module] = { ...pendingSettings[module], ...setting };
            } else {
                pendingSettings[module][setting] = value;
            }

            updateApplyButtonState();
        }

        function applyPendingSettings() {
            if (!pendingSettings) return false;

            const success = saveSettings(pendingSettings);
            if (success) {
                currentSettings = pendingSettings;
                pendingSettings = null;
                return true;
            }
            return false;
        }

        function hasPendingChanges() {
            return pendingSettings !== null && JSON.stringify(currentSettings) !== JSON.stringify(pendingSettings);
        }

        function updateApplyButtonState() {
            if (!settingsOverlay) return;

            const applyBtn = settingsOverlay.querySelector('.redlib-settings-apply');
            if (!applyBtn) return;

            if (hasPendingChanges()) {
                applyBtn.disabled = false;
                applyBtn.classList.add('pending');
                applyBtn.textContent = 'Apply Changes';
            } else {
                applyBtn.disabled = true;
                applyBtn.classList.remove('pending');
                applyBtn.textContent = 'Apply';
            }
        }

        function createSettingsIcon() {
            const icon = document.createElement('button');
            icon.className = 'redlib-settings-icon';
            icon.innerHTML = '⚙';
            icon.title = 'Redlib Enhancement Suite Settings';

            icon.addEventListener('click', () => {
                showSettingsOverlay();
            });

            return icon;
        }

        function createSettingsOverlay() {
            const overlay = document.createElement('div');
            overlay.className = 'redlib-settings-overlay';

            overlay.innerHTML = `
            <div class="redlib-settings-modal">
<div class="redlib-settings-header">
    <h2 class="redlib-settings-title">Enhancement Suite Settings</h2>
    <button class="redlib-settings-close">×</button>
</div>
                <div class="redlib-settings-content">
                    <div class="redlib-settings-section">
                        <h3 class="redlib-settings-section-title">General</h3>

                        <div class="redlib-settings-option">
                            <div class="redlib-settings-option-info">
                                <div class="redlib-settings-option-title">Subreddit Hover Info</div>
                                <div class="redlib-settings-option-description">Show subreddit info popup when hovering over subreddit links</div>
                            </div>
                            <label class="redlib-settings-toggle">
                                <input type="checkbox" data-module="subredditHover" data-setting="enabled">
                                <span class="redlib-settings-slider"></span>
                            </label>
                        </div>

                        <div class="redlib-settings-option">
                            <div class="redlib-settings-option-info">
                                <div class="redlib-settings-option-title">Username Hover Info</div>
                                <div class="redlib-settings-option-description">Show user info popup when hovering over usernames</div>
                            </div>
                            <label class="redlib-settings-toggle">
                                <input type="checkbox" data-module="usernameHover" data-setting="enabled">
                                <span class="redlib-settings-slider"></span>
                            </label>
                        </div>
                    </div>

<div class="redlib-settings-section">
    <h3 class="redlib-settings-section-title">Frontpage & Subreddit Pages</h3>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Subreddit Info Toggler</div>
            <div class="redlib-settings-option-description">Hide/show sidebar with floating button on subreddit pages</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="sidebarToggle" data-setting="enabled">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>

    <div class="redlib-settings-subsetting" data-parent="sidebarToggle.enabled">
        <div class="redlib-settings-option">
            <div class="redlib-settings-option-info">
                <div class="redlib-settings-option-title">Hide Sidebars by Default</div>
                <div class="redlib-settings-option-description">Start with sidebars hidden when visiting subreddit pages</div>
            </div>
            <label class="redlib-settings-toggle">
                <input type="checkbox" data-module="sidebarToggle" data-setting="hideByDefault">
                <span class="redlib-settings-slider"></span>
            </label>
        </div>
    </div>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Post Hider</div>
            <div class="redlib-settings-option-description">Hide/show posts and remember state across sessions</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="postCollapser" data-setting="enabled">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Post Expand Buttons</div>
            <div class="redlib-settings-option-description">Expand/minimize post text content</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="postCollapser" data-setting="expandButtons">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>

    <div class="redlib-settings-subsetting" data-parent="postCollapser.expandButtons">
        <div class="redlib-settings-option">
            <div class="redlib-settings-option-info">
                <div class="redlib-settings-option-title">Expand Posts by Default</div>
                <div class="redlib-settings-option-description">Start with post text fully expanded instead of preview mode</div>
            </div>
            <label class="redlib-settings-toggle">
                <input type="checkbox" data-module="postCollapser" data-setting="expandByDefault">
                <span class="redlib-settings-slider"></span>
            </label>
        </div>
    </div>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Hover Comment Previews</div>
            <div class="redlib-settings-option-description">Show comment previews when hovering over comment links on post listings</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="hoverComments" data-setting="enabled">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>
</div>

<div class="redlib-settings-section">
    <h3 class="redlib-settings-section-title">Comment Pages</h3>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Sticky Post Mode</div>
            <div class="redlib-settings-option-description">Post header sticks to top when scrolling on comment pages, expands preview on mouseover</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="postCollapser" data-setting="stickyMode">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Floating Video Player</div>
            <div class="redlib-settings-option-description">Videos float when scrolling down, with resize and drag support</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="postCollapser" data-setting="floatingVideo">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>

<div class="redlib-settings-option">
    <div class="redlib-settings-option-info">
        <div class="redlib-settings-option-title">AJAX Load More Comments</div>
        <div class="redlib-settings-option-description">Load more comment replies in-place instead of navigating to new page</div>
    </div>
    <label class="redlib-settings-toggle">
        <input type="checkbox" data-module="ajaxCommentLoading" data-setting="enabled">
        <span class="redlib-settings-slider"></span>
    </label>
</div>

<div class="redlib-settings-option">
    <div class="redlib-settings-option-info">
        <div class="redlib-settings-option-title">Child Comments Collapser</div>
        <div class="redlib-settings-option-description">Show top level comments, but collapse their children. Expand all children with one click</div>
    </div>
    <label class="redlib-settings-toggle">
        <input type="checkbox" data-module="commentCollapser" data-setting="enabled">
        <span class="redlib-settings-slider"></span>
    </label>
</div>

    <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">Comment Styling</div>
            <div class="redlib-settings-option-description">Compact layout, alternating background colors, and improved visual hierarchy</div>
        </div>
        <label class="redlib-settings-toggle">
            <input type="checkbox" data-module="commentStyling" data-setting="enabled">
            <span class="redlib-settings-slider"></span>
        </label>
    </div>
</div>
                </div>
<div class="redlib-settings-footer">
    <div class="redlib-settings-version">Redlib Enhancement Suite v${SCRIPT_VERSION}</div>
    <div class="redlib-settings-footer-actions">
        <button class="redlib-settings-reset">Reset to Defaults</button>
        <button class="redlib-settings-apply" disabled>Apply</button>
    </div>
</div>
            </div>
        `;

            // Auto-update version number from script metadata
            const versionSpan = overlay.querySelector('#redlib-version-number');
            if (versionSpan) {
                // Extract version from script metadata comment at top of file
                const scriptText = document.documentElement.outerHTML;
                const versionMatch = scriptText.match(/@version\s+([^\n\r]+)/);
                if (versionMatch) {
                    versionSpan.textContent = versionMatch[1].trim();
                }
            }

            // Add event listeners
            const closeBtn = overlay.querySelector('.redlib-settings-close');
            const applyBtn = overlay.querySelector('.redlib-settings-apply'); // This is now in footer
            const resetBtn = overlay.querySelector('.redlib-settings-reset');

            closeBtn.addEventListener('click', hideSettingsOverlay);
            applyBtn.addEventListener('click', handleApplySettings);
            resetBtn.addEventListener('click', resetSettings);

            // Close on overlay click
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    handleCloseWithPendingChanges();
                }
            });

            // Add toggle event listeners
            const toggles = overlay.querySelectorAll('.redlib-settings-toggle input:not([disabled])');
            toggles.forEach(toggle => {
                toggle.addEventListener('change', (e) => {
                    const module = e.target.dataset.module;
                    const setting = e.target.dataset.setting;
                    setPendingSetting(module, setting, e.target.checked);

                    // Update subsetting visibility
                    updateSubsettingVisibility();
                });
            });

            // Function to update subsetting visibility
            function updateSubsettingVisibility() {
                const subsettings = overlay.querySelectorAll('.redlib-settings-subsetting');
                subsettings.forEach(subsetting => {
                    const parentSetting = subsetting.dataset.parent; // e.g., "sidebarToggle.enabled"
                    const [parentModule, parentKey] = parentSetting.split('.');

                    const parentToggle = overlay.querySelector(`input[data-module="${parentModule}"][data-setting="${parentKey}"]`);

                    if (parentToggle && parentToggle.checked) {
                        subsetting.classList.remove('disabled');
                    } else {
                        subsetting.classList.add('disabled');
                    }
                });
            }

            document.body.appendChild(overlay);
            return overlay;
        }

        function handleApplySettings() {
            if (!hasPendingChanges()) return;

            const success = applyPendingSettings();
            if (success) {
                const requiresReload = true; // Most setting changes require reload

                if (requiresReload) {
                    if (confirm('Settings applied! The page needs to reload for changes to take effect. Reload now?')) {
                        window.location.reload();
                    } else {
                        updateApplyButtonState();
                    }
                } else {
                    updateApplyButtonState();
                }
            } else {
                alert('Failed to save settings. Please try again.');
            }
        }

        function handleCloseWithPendingChanges() {
            if (hasPendingChanges()) {
                if (confirm('You have unsaved changes. Close without saving?')) {
                    pendingSettings = null;
                    hideSettingsOverlay();
                }
            } else {
                hideSettingsOverlay();
            }
        }

        function showSettingsOverlay() {
            if (!settingsOverlay) {
                settingsOverlay = createSettingsOverlay();
            }

            // Reset pending changes when opening
            pendingSettings = null;
            updateSettingsUI();
            updateApplyButtonState();
            settingsOverlay.style.display = 'flex';

            // Add escape key listener
            document.addEventListener('keydown', handleEscapeKey);
        }

        function hideSettingsOverlay() {
            if (settingsOverlay) {
                settingsOverlay.style.display = 'none';
            }
            document.removeEventListener('keydown', handleEscapeKey);
        }

        function handleEscapeKey(e) {
            if (e.key === 'Escape') {
                handleCloseWithPendingChanges();
            }
        }

        function updateSettingsUI() {
            if (!settingsOverlay) return;

            const toggles = settingsOverlay.querySelectorAll('.redlib-settings-toggle input');
            toggles.forEach(toggle => {
                const module = toggle.dataset.module;
                const setting = toggle.dataset.setting;
                const currentValue = pendingSettings ?
                      (pendingSettings[module]?.[setting] ?? getSetting(module, setting)) :
                getSetting(module, setting);
                toggle.checked = currentValue;
            });

            // Update subsetting visibility
            const subsettings = settingsOverlay.querySelectorAll('.redlib-settings-subsetting');
            subsettings.forEach(subsetting => {
                const parentSetting = subsetting.dataset.parent; // e.g., "sidebarToggle.enabled"
                const [parentModule, parentKey] = parentSetting.split('.');

                const parentToggle = settingsOverlay.querySelector(`input[data-module="${parentModule}"][data-setting="${parentKey}"]`);

                if (parentToggle && parentToggle.checked) {
                    subsetting.classList.remove('disabled');
                } else {
                    subsetting.classList.add('disabled');
                }
            });
        }

        function resetSettings() {
            if (confirm('Reset all settings to defaults? This will reload the page.')) {
                try {
                    localStorage.removeItem(STORAGE_KEY);
                    window.location.reload();
                } catch (e) {
                    console.warn('[Redlib Enhancement Suite] Failed to reset settings');
                }
            }
        }

        function init() {
            loadSettings();

            // Add settings icon
            const settingsIcon = createSettingsIcon();
            document.body.appendChild(settingsIcon);

            console.log('[Redlib Enhancement Suite] Settings Manager initialized');
        }

        return {
            init: init,
            getSetting: getSetting,
            setSetting: setSetting,
            loadSettings: loadSettings
        };
    })();

    // ============================================================================
    // MAIN INITIALIZATION
    // ============================================================================
    function init() {
        console.log('[Redlib Enhancement Suite] Starting initialization...');

        // Initialize settings manager first
        SettingsManager.init();

        // Add combined styles (this now checks settings for conditional CSS)
        addCombinedStyles();

        const isCommentPage = window.location.pathname.includes('/comments/');

        // Initialize modules based on settings
        if (SettingsManager.getSetting('postCollapser', 'enabled')) {
            PostCollapser.init();
            // Make PostCollapser globally accessible for other modules
            window.PostCollapser = PostCollapser;
        }

        // Post expand buttons work independently of post collapser
        if (SettingsManager.getSetting('postCollapser', 'expandButtons')) {
            PostExpandButtons.init();
        }

        if (!isCommentPage && SettingsManager.getSetting('hoverComments', 'enabled')) {
            HoverComments.init();
        }

        if (isCommentPage && SettingsManager.getSetting('commentCollapser', 'enabled')) {
            CommentCollapser.init();
        }

        if (isCommentPage && SettingsManager.getSetting('ajaxCommentLoading', 'enabled')) {
            AjaxCommentLoader.init();
        }

        if (SettingsManager.getSetting('sidebarToggle', 'enabled')) {
            SidebarToggle.init();
        }

        if (SettingsManager.getSetting('subredditHover', 'enabled')) {
            SubredditHover.init();
        }

        if (SettingsManager.getSetting('usernameHover', 'enabled')) {
            UsernameHover.init();
        }

        console.log('[Redlib Enhancement Suite] Initialization complete for ' + (isCommentPage ? 'comment page' : 'post listing page'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
