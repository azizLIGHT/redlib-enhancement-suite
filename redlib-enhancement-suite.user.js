// ==UserScript==
// @name         Redlib Enhancement Suite
// @namespace    https://github.com/azizLIGHT/redlib-enhancement-suite
// @version      2.140-enable-commentspage-post-hidesave-07-fix-sticky-mode-15-debug
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
// @match        https://redlib.baczek.me/*
// @match        https://lr.ptr.moe/*
// @match        https://libreddit.diffraction.dev/*
// @match        https://redlib.jeikobu.net/*
// @match        https://pirate.vodka/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @homepageURL https://github.com/azizLIGHT/redlib-enhancement-suite
// @supportURL  https://github.com/azizLIGHT/redlib-enhancement-suite/issues
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    // Script version - update this when you change @version above
    const SCRIPT_VERSION = '2.140-enable-commentspage-post-hidesave-07-fix-sticky-mode-15-debug';

    // ============================================================================
    // PAGE VALIDATION - Must be first
    // ============================================================================
    function isValidRedlibPage() {
        // Check if we're on a Cloudflare bot check page
        if (document.title.includes('Just a moment') ||
            document.body.innerHTML.includes('cf-browser-verification') ||
            document.body.innerHTML.includes('DDoS protection by Cloudflare') ||
            document.querySelector('.cf-browser-verification') ||
            document.querySelector('#cf-wrapper')) {
            console.log('[Redlib Enhancement Suite] Detected Cloudflare bot check page, skipping initialization');
            return false;
        }

        // Check if we're on an Anubis bot check page
        if (document.title.includes('Anubis') ||
            document.body.innerHTML.includes('anubis') ||
            document.querySelector('[data-anubis]') ||
            document.body.innerHTML.includes('bot protection')) {
            console.log('[Redlib Enhancement Suite] Detected Anubis bot check page, skipping initialization');
            return false;
        }

        // Check if we're on a redlib error page
        if (document.querySelector('#error') ||
            document.querySelector('main #error') ||
            document.body.innerHTML.includes('Failed to parse page JSON data') ||
            document.title.includes('Error')) {
            console.log('[Redlib Enhancement Suite] Detected redlib error page, skipping initialization');
            return false;
        }

        // Check if this is actually a redlib instance
        const isRedlibPage = document.querySelector('nav') ||
              document.querySelector('#logo') ||
              document.querySelector('footer') ||
              document.body.innerHTML.includes('redlib') ||
              window.location.pathname.includes('/r/') ||
              window.location.pathname.includes('/settings') ||
              window.location.pathname.includes('/u/');

        if (!isRedlibPage) {
            console.log('[Redlib Enhancement Suite] Not a valid redlib page, skipping initialization');
            return false;
        }

        return true;
    }

    // Early exit if not a valid redlib page
    if (!isValidRedlibPage()) {
        return; // Stop script execution entirely
    }

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
                background: var(--background);
                border: 1px solid var(--highlighted);
                color: var(--text);
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
    background: var(--accent);
    color: var(--foreground);
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

/* Comment page posts should show collapsed state but less dramatically */
.redlib-collapsed.highlighted {
    opacity: 0.7 !important;
    filter: grayscale(0.2) blur(0.1px) !important;
    transform: scale(0.99) !important;
}

            .redlib-collapse-btn {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                background: var(--background) !important;
                border: 1px solid var(--highlighted) !important;
                color: var(--text) !important;
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
    background: var(--accent) !important;
    color: var(--foreground) !important;
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
                border: 2px solid var(--highlighted);
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
                background: var(--foreground) !important;
                border: 1px solid var(--highlighted) !important;
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
                background: var(--foreground);
                padding: 8px 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: grab;
                user-select: none;
                border-bottom: 1px solid var(--highlighted);
                flex-shrink: 0;
                height: 40px;
                box-sizing: border-box;
            }

            .redlib-floating-video-header:active {
                cursor: grabbing;
            }

            .redlib-floating-video-title {
                color: var(--text);
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
                background: var(--highlighted);
                border: 1px solid var(--accent);
                color: var(--text);
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
                background: var(--accent);
                color: var(--foreground);
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
                background: var(--post) !important;
                border-bottom: 1px solid var(--highlighted) !important;
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
                border-bottom: 2px solid var(--highlighted) !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
                background: var(--post) !important;
                cursor: pointer !important;
                z-index: 1000 !important;

                /* Ensure completely opaque background */
                background-color: var(--post) !important;
                opacity: 1 !important;
            }

            /* Compact header in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_header {
                margin: 2px 0 !important;
                line-height: 1.2 !important;
                font-size: 13px !important;
            }
/* Truncate post title to one line in sticky mode */
body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_title {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin: 2px 12px 2px 12px !important;
    font-size: 14px !important;
    line-height: 1.2 !important;
}

/* Expand title on hover */
body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode:hover .post_title {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: unset !important;
    max-height: none !important;
}

            /* Compact score in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_score {
                padding: 2px 8px !important;
                font-size: 12px !important;
                min-width: 30px !important;
            }

            /* Hover effect for sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
                border-bottom-color: var(--accent) !important;
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
                border: 1px solid var(--highlighted) !important;
                border-radius: 4px !important;
            }

            /* Style the scrollbar in sticky mode */
            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar {
                width: 6px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar-track {
                background: var(--background) !important;
                border-radius: 3px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar-thumb {
                background: var(--accent) !important;
                border-radius: 3px !important;
            }

            body:has(.post.highlighted) .post.highlighted.redlib-sticky-mode .post_body::-webkit-scrollbar-thumb:hover {
                background: var(--highlighted) !important;
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
    background: var(--background);
    border: 1px solid var(--highlighted);
    border-radius: 4px;
    padding: 0;
    z-index: 9999;
min-width: 320px;
max-width: none;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 12px;
    line-height: 1.3;
    display: none;
    color: var(--text);
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
    background-color: var(--post) !important;
}

/* Level 1 children - BLACK */
._redlib_popup .replies > .reply {
    background-color: var(--foreground) !important;
}

/* Level 2 children - GRAY */
._redlib_popup .replies .replies > .reply {
    background-color: var(--post) !important;
}

/* Level 3 children - BLACK */
._redlib_popup .replies .replies .replies > .reply {
    background-color: var(--foreground) !important;
}

/* Level 4 children - GRAY */
._redlib_popup .replies .replies .replies .replies > .reply {
    background-color: var(--post) !important;
}

/* Level 5 children - BLACK */
._redlib_popup .replies .replies .replies .replies .replies > .reply {
    background-color: var(--foreground) !important;
}

/* Level 6 children - GRAY */
._redlib_popup .replies .replies .replies .replies .replies .replies > .reply {
    background-color: var(--post) !important;
}

/* Level 7 children - BLACK */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: var(--foreground) !important;
}

/* Level 8 children - GRAY */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: var(--post) !important;
}

/* Level 9 children - BLACK */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: var(--foreground) !important;
}

/* Level 10 children - GRAY */
._redlib_popup .replies .replies .replies .replies .replies .replies .replies .replies .replies .replies > .reply {
    background-color: var(--post) !important;
}

._redlib_popup .comment_header {
    margin-bottom: 3px;
    font-size: 12px;
    color: var(--visited);
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 6px;
}

._redlib_popup .comment_author {
    color: var(--accent);
    font-weight: normal;
    text-decoration: none;
    white-space: nowrap;
}

._redlib_popup .comment_author:hover {
    text-decoration: underline;
}

._redlib_popup .comment_meta_separator {
    margin: 0 2px;
    color: var(--visited);
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
    color: var(--text);
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
    border-left: 2px solid var(--highlighted);
    color: var(--visited);
}

._redlib_popup .comment_body code {
    background: var(--highlighted);
    padding: 1px 3px;
    border-radius: 2px;
    font-size: 0.9em;
}

._redlib_popup .comment_body pre {
    background: var(--highlighted);
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
    color: var(--accent);
    cursor: pointer;
    font-size: 11px;
    margin-top: 4px;
    padding: 3px 5px;
    border-radius: 3px;
    background: var(--highlighted);
    display: inline-block;
    user-select: none;
    border: 1px solid transparent;
}

._redlib_popup .next_reply:hover {
    background: var(--foreground);
    border-color: var(--accent);
}

._redlib_popup .loading {
    text-align: center;
    padding: 8px 10px;
    color: var(--visited);
    font-size: 12px;
    line-height: 1.3;
    font-style: normal;
    background: var(--highlighted);
    border-radius: 4px;
    margin: 4px;
}

._redlib_popup .loading::before {
    content: "⏳ ";
    margin-right: 4px;
}

._redlib_popup .error {
    color: var(--accent);
    text-align: center;
    padding: 16px;
    font-size: 13px;
}

._redlib_popup .next_comment {
    text-align: center;
    padding: 5px;
    cursor: pointer;
    color: var(--accent);
    border-bottom: 1px solid var(--highlighted);
    margin: 0;
    user-select: none;
    position: sticky;
    top: 0;
    background: var(--background) !important;
    z-index: 1;
    font-size: 12px;
    opacity: 1 !important;
}

._redlib_popup .next_comment:hover {
    background: var(--foreground) !important;
    color: var(--accent);
}

._redlib_popup .next_comment.loaded {
    cursor: default !important;
    pointer-events: none;
    opacity: 1 !important;
    background: var(--background) !important;
    position: sticky;
    top: 0;
    z-index: 1;
    color: var(--visited) !important;
}

._redlib_popup .next_comment.loaded:hover {
    background: var(--background) !important;
    color: var(--visited) !important;
}

._redlib_popup .popup-close {
    position: fixed;
    top: 8px;
    right: 8px;
    background: var(--highlighted);
    color: var(--text);
    border: 1px solid var(--accent);
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
    background: var(--accent);
    color: var(--foreground);
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
    background: var(--accent);
    color: var(--foreground);
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
                background: var(--highlighted);
                color: var(--text);
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
                background: var(--background);
                color: var(--text);
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: normal;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border: 1px solid var(--highlighted);
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
                border-left-color: var(--highlighted);
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

/* ========== SETTINGS PAGE COLLAPSER STYLES ========== */
/* Settings page feed collapsers */
.settings-feeds-collapsible {
    margin: 16px 0;
    border: 1px solid var(--highlighted);
    border-radius: 6px;
    background: var(--post);
}

.settings-feeds-summary {
    padding: 12px 16px;
    font-weight: bold;
    font-size: 14px;
    color: var(--accent);
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid var(--highlighted);
    transition: background-color 0.2s ease;
}

.settings-feeds-summary:hover {
    background: var(--highlighted);
}

.settings-feeds-content {
    padding: 8px;
}

.settings-feeds-content div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 4px 0;
    background: var(--foreground);
    border-radius: 4px;
    border: 1px solid var(--highlighted);
}

.settings-feeds-content div:hover {
    background: var(--highlighted);
}

.settings-feeds-content a {
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
}

.settings-feeds-content a:hover {
    color: var(--accent);
    text-decoration: underline;
}

.settings-feeds-content form {
    margin: 0;
}

.settings-feeds-content button {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid var(--accent);
    background: var(--highlighted);
    color: var(--text);
    cursor: pointer;
    transition: all 0.2s ease;
}

.settings-feeds-content button:hover {
    background: var(--accent);
    color: var(--foreground);
}

/* Hide original legend styling when converted */
.prefs legend {
    display: none;
}

.prefs:has(.settings-feeds-collapsible) legend {
    display: none;
}
/* ========== END SETTINGS PAGE COLLAPSER STYLES ========== */


            /* ========== SETTINGS OVERLAY STYLES ========== */

            .redlib-settings-icon {
                position: fixed;
                top: 70px;
                right: 15px;
                background: var(--accent);
                color: var(--foreground);
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
                background: var(--highlighted);
                color: var(--text);
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
                background: var(--background);
                border: 2px solid var(--highlighted);
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
                background: var(--post);
                padding: 20px;
                border-bottom: 2px solid var(--highlighted);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
            }

            .redlib-settings-apply {
                background: var(--accent);
                color: var(--foreground);
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: all 0.2s ease;
            }

            .redlib-settings-apply:hover {
                background: var(--highlighted);
                color: var(--text);
            }

            .redlib-settings-apply:disabled {
                background: var(--highlighted);
                color: var(--text);
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
                color: var(--text);
                font-size: 20px;
                font-weight: bold;
                margin: 0;
            }

            .redlib-settings-close {
                background: var(--highlighted);
                color: var(--text);
                border: 1px solid var(--accent);
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
                background: var(--accent);
                color: var(--foreground);
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
                border-bottom: 1px solid var(--highlighted);
            }

            .redlib-settings-section:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }

            .redlib-settings-section-title {
                color: var(--accent);
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
                color: var(--text);
                font-weight: bold;
                margin: 0 0 4px 0;
                font-size: 14px;
            }

            .redlib-settings-option-description {
                color: var(--text);
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
                background-color: var(--highlighted);
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
                background-color: var(--foreground);
                transition: 0.3s;
                border-radius: 50%;
            }

            .redlib-settings-toggle input:checked + .redlib-settings-slider {
                background-color: var(--accent);
            }

            .redlib-settings-toggle input:checked + .redlib-settings-slider:before {
                transform: translateX(24px);
                background-color: var(--foreground);
            }

            .redlib-settings-footer {
                background: var(--post);
                padding: 16px 20px;
                border-top: 2px solid var(--highlighted);
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
                color: var(--text);
                opacity: 0.6;
                font-size: 12px;
            }

            .redlib-settings-reset {
                background: var(--highlighted);
                color: var(--text);
                border: 1px solid var(--accent);
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
            }

            .redlib-settings-reset:hover {
                background: var(--accent);
                color: var(--foreground);
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
                border-left: 2px solid var(--highlighted);
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

/* ========== HIDDEN POSTS STYLES ========== */

.redlib-hidden-posts-collapsible {
    border: 1px solid var(--highlighted);
    border-radius: 6px;
    overflow: hidden;
    margin: 12px 0;
}

.redlib-hidden-posts-summary {
    background: var(--post);
    color: var(--accent);
    padding: 12px 16px;
    cursor: pointer;
    font-weight: bold;
    user-select: none;
    border-bottom: 1px solid var(--highlighted);
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
}

.redlib-hidden-posts-summary:hover {
    background: var(--highlighted);
}

.redlib-hidden-posts-summary::before {
    content: "▶";
    font-size: 12px;
    transition: transform 0.2s ease;
}

.redlib-hidden-posts-collapsible[open] .redlib-hidden-posts-summary::before {
    transform: rotate(90deg);
}

.redlib-hidden-posts-content {
    padding: 16px;
    background: var(--highlighted);
}

.redlib-hidden-posts-table-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--background);
    border-radius: 4px;
    position: relative;
}

.redlib-hidden-posts-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--post);
    font-size: 11px;
    table-layout: fixed !important;
}

.redlib-hidden-posts-table th {
    background: var(--highlighted);
    color: var(--accent);
    padding: 4px 6px;
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid var(--background);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    line-height: 1.1;
    font-size: 10px;
    cursor: pointer;
    user-select: none;
}

.redlib-hidden-posts-table th:hover {
    background: var(--accent);
    color: var(--foreground);
}

.redlib-hidden-posts-table td {
    padding: 3px 6px;
    border-bottom: 1px solid var(--background);
    color: var(--text);
    vertical-align: middle;
    line-height: 1.2;
}

.redlib-hidden-posts-table th,
.redlib-hidden-posts-table td {
    box-sizing: border-box;
}

.redlib-hidden-posts-table tr:hover {
    background: var(--highlighted);
}

.redlib-hidden-posts-table .post-title-link {
    color: var(--text);
    text-decoration: none;
    font-weight: bold;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redlib-hidden-posts-table .post-title-link:hover {
    text-decoration: underline;
}

.redlib-hidden-posts-table .post-subreddit-link {
    color: var(--text);
    text-decoration: none;
    font-weight: bold;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redlib-hidden-posts-table .post-subreddit-link:hover {
    text-decoration: underline;
}

.redlib-hidden-posts-table .post-author-link {
    color: var(--text);
    text-decoration: none;
    opacity: 0.8;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redlib-hidden-posts-table .post-author-link:hover {
    text-decoration: underline;
    opacity: 1;
}

.redlib-hidden-posts-table .post-title span,
.redlib-hidden-posts-table .post-subreddit span,
.redlib-hidden-posts-table .post-author span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text);
    opacity: 0.6;
    font-style: italic;
}

.redlib-hidden-posts-unhide {
    background: var(--highlighted);
    color: var(--accent);
    border: 1px solid var(--accent);
    padding: 2px 6px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    min-width: 20px;
    text-align: center;
    line-height: 1;
}

.redlib-hidden-posts-unhide:hover {
    background: var(--accent);
    color: var(--foreground);
}

.redlib-hidden-posts-empty {
    text-align: center;
    color: var(--text);
    opacity: 0.6;
    font-style: italic;
    padding: 20px;
}

.redlib-hidden-posts-table .current-post-row {
    background: var(--accent) !important;
    color: var(--foreground) !important;
}

.redlib-hidden-posts-table .current-post-row td {
    background: var(--accent) !important;
    color: var(--foreground) !important;
}

.redlib-hidden-posts-table .current-post-row a {
    color: var(--foreground) !important;
    font-weight: bold !important;
}

.redlib-hidden-posts-table .current-post-row .redlib-hidden-posts-fix,
.redlib-hidden-posts-table .current-post-row .redlib-hidden-posts-unhide {
    background: var(--foreground) !important;
    color: var(--accent) !important;
    border-color: var(--foreground) !important;
}

.redlib-hidden-posts-table th.sortable::after {
    content: " ↕";
    opacity: 0.5;
    font-size: 8px;
}

.redlib-hidden-posts-table th.sorted-asc::after {
    content: " ↑";
    opacity: 1;
    color: var(--accent);
}

.redlib-hidden-posts-table th.sorted-desc::after {
    content: " ↓";
    opacity: 1;
    color: var(--accent);
}

/* ========== SAVED POSTS STYLES ========== */

.redlib-saved-posts-collapsible {
    border: 1px solid var(--highlighted);
    border-radius: 6px;
    overflow: hidden;
    margin: 12px 0;
}

.redlib-saved-posts-summary {
    background: var(--post);
    color: var(--accent);
    padding: 12px 16px;
    cursor: pointer;
    font-weight: bold;
    user-select: none;
    border-bottom: 1px solid var(--highlighted);
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
}

.redlib-saved-posts-summary:hover {
    background: var(--highlighted);
}

.redlib-saved-posts-summary::before {
    content: "▶";
    font-size: 12px;
    transition: transform 0.2s ease;
}

.redlib-saved-posts-collapsible[open] .redlib-saved-posts-summary::before {
    transform: rotate(90deg);
}

.redlib-saved-posts-content {
    padding: 16px;
    background: var(--highlighted);
}

.redlib-saved-posts-table-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--background);
    border-radius: 4px;
    position: relative;
}

.redlib-saved-posts-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--post);
    font-size: 11px;
    table-layout: fixed !important;
}



.redlib-saved-posts-table th {
    background: var(--highlighted);
    color: var(--accent);
    padding: 4px 6px;
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid var(--background);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    line-height: 1.1;
    font-size: 10px;
    cursor: pointer;
    user-select: none;
}

.redlib-saved-posts-table th:hover {
    background: var(--accent);
    color: var(--foreground);
}

.redlib-saved-posts-table th.sortable::after {
    content: " ↕";
    opacity: 0.5;
    font-size: 8px;
}

.redlib-saved-posts-table th.sorted-asc::after {
    content: " ↑";
    opacity: 1;
    color: var(--accent);
}

.redlib-saved-posts-table th.sorted-desc::after {
    content: " ↓";
    opacity: 1;
    color: var(--accent);
}

.redlib-saved-posts-table td {
    padding: 3px 6px;
    border-bottom: 1px solid var(--background);
    color: var(--text);
    vertical-align: middle;
    line-height: 1.2;
}

.redlib-saved-posts-table th,
.redlib-saved-posts-table td {
    box-sizing: border-box;
}

.redlib-saved-posts-table tr:hover {
    background: var(--highlighted);
}

.redlib-saved-posts-table .post-title-link {
    color: var(--text);
    text-decoration: none;
    font-weight: bold;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redlib-saved-posts-table .post-title-link:hover {
    text-decoration: underline;
}

.redlib-saved-posts-table .post-subreddit-link {
    color: var(--text);
    text-decoration: none;
    font-weight: bold;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redlib-saved-posts-table .post-subreddit-link:hover {
    text-decoration: underline;
}

.redlib-saved-posts-table .post-author-link {
    color: var(--text);
    text-decoration: none;
    opacity: 0.8;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redlib-saved-posts-table .post-author-link:hover {
    text-decoration: underline;
    opacity: 1;
}

.redlib-saved-posts-unsave {
    background: var(--accent);
    color: var(--foreground);
    border: 1px solid var(--accent);
    padding: 2px 6px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    min-width: 20px;
    text-align: center;
    line-height: 1;
}
.redlib-saved-posts-unsave:hover {
    background: var(--highlighted);
    color: var(--accent);
}

.redlib-saved-posts-empty {
    text-align: center;
    color: var(--text);
    opacity: 0.6;
    font-style: italic;
    padding: 20px;
}

.redlib-saved-posts-table .current-post-row {
    background: var(--accent) !important;
    color: var(--foreground) !important;
}

.redlib-saved-posts-table .current-post-row td {
    background: var(--accent) !important;
    color: var(--foreground) !important;
}

.redlib-saved-posts-table .current-post-row a {
    color: var(--foreground) !important;
    font-weight: bold !important;
}

.redlib-saved-posts-table .current-post-row .redlib-saved-posts-unsave {
    background: var(--foreground) !important;
    color: var(--accent) !important;
    border-color: var(--foreground) !important;
}

/* Saved post highlight */
.post.redlib-saved-post {
    border: 2px solid var(--accent) !important;
    box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.3) !important;
}
/* ========== END SAVED POSTS STYLES ========== */

/* Force table column widths */
/* ========== UNIFIED TABLE COLUMN WIDTHS ========== */
.redlib-saved-posts-table col:nth-child(1),
.redlib-hidden-posts-table col:nth-child(1) { width: 38% !important; }

.redlib-saved-posts-table col:nth-child(2),
.redlib-hidden-posts-table col:nth-child(2) { width: 17% !important; }

.redlib-saved-posts-table col:nth-child(3),
.redlib-hidden-posts-table col:nth-child(3) { width: 15% !important; }

.redlib-saved-posts-table col:nth-child(4),
.redlib-hidden-posts-table col:nth-child(4) { width: 10% !important; }

.redlib-saved-posts-table col:nth-child(5),
.redlib-hidden-posts-table col:nth-child(5) { width: 13% !important; }

.redlib-saved-posts-table col:nth-child(6),
.redlib-hidden-posts-table col:nth-child(6) { width: 7% !important; }

/* Center align score and date columns for both tables */
.redlib-saved-posts-table th:nth-child(4),
.redlib-saved-posts-table td:nth-child(4),
.redlib-hidden-posts-table th:nth-child(4),
.redlib-hidden-posts-table td:nth-child(4),
.redlib-saved-posts-table th:nth-child(5),
.redlib-saved-posts-table td:nth-child(5),
.redlib-hidden-posts-table th:nth-child(5),
.redlib-hidden-posts-table td:nth-child(5) {
    text-align: center !important;
}

/* Fix table container overflow */
.redlib-saved-posts-table-container,
.redlib-hidden-posts-table-container {
    overflow-x: hidden !important;
}


/* ========== SYNC STYLES ========== */

/* Sync table container */
.redlib-sync-table-container {
    margin-bottom: 20px;
}

/* Settings comparison table - full width 3 columns */
.redlib-settings-comparison {
    width: 100%;
    border-collapse: collapse;
    background: var(--highlighted);
    border-radius: 6px;
    overflow: hidden;
}

.redlib-settings-comparison th {
    background: var(--post);
    color: var(--accent);
    font-weight: bold;
    font-size: 11px;
    padding: 8px 12px;
    text-align: center;
    border-bottom: 1px solid var(--background);
}

.redlib-settings-comparison td {
    font-family: monospace;
    font-size: 10px;
    padding: 6px 12px;
    color: var(--text);
    border-bottom: 1px solid var(--background);
    text-align: center;
}

.redlib-settings-comparison tr:last-child td {
    border-bottom: none;
}

/* Setting name column styling */
.redlib-settings-comparison td:first-child {
    background: var(--post);
    font-weight: bold;
    color: var(--text);
    text-align: left;
}

/* Value cells - darker when same, lighter when different */
.redlib-settings-comparison td.value-same {
    background: var(--post);
    opacity: 0.7;
}

.redlib-settings-comparison td.value-different {
    background: var(--highlighted);
    opacity: 1;
}

/* Merge preview section */
.redlib-merge-preview {
    margin-top: 16px;
    padding: 12px;
    background: var(--highlighted);
    border-radius: 6px;
    font-size: 11px;
    line-height: 1.3;
    border: 1px solid var(--accent);
}

.redlib-sync-action-title {
    font-weight: bold;
    color: var(--accent);
    margin-bottom: 8px;
    text-align: center;
    font-size: 12px;
}

.redlib-sync-action-details {
    color: var(--text);
    opacity: 0.8;
    font-family: monospace;
    white-space: pre-line;
    text-align: left;
}

/* Sync buttons - reuse working button styles */
.redlib-settings-merge,
.redlib-settings-refresh-status {
    background: var(--highlighted);
    color: var(--text);
    border: 1px solid var(--accent);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
}

.redlib-settings-merge:hover,
.redlib-settings-refresh-status:hover {
    background: var(--accent);
    color: var(--foreground);
}

.redlib-settings-merge:disabled,
.redlib-settings-refresh-status:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* Sync status */
#redlib-sync-status {
    font-family: monospace;
    font-size: 11px;
    color: var(--text);
    opacity: 0.8;
    white-space: pre-line;
    max-height: 150px;
    overflow-y: auto;
    line-height: 1.3;
}

/* Mobile responsive */
@media screen and (max-width: 600px) {
    .redlib-settings-comparison th,
    .redlib-settings-comparison td {
        padding: 4px 8px;
        font-size: 9px;
    }
}

/* Merge preview table */
.redlib-sync-differences-container {
    margin: 16px 0 20px 0;
    padding: 12px;
    background: var(--highlighted);
    border-radius: 6px;
    border: 1px solid var(--accent);
}

.redlib-sync-differences-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.redlib-sync-differences-title {
    color: var(--accent);
    font-size: 14px;
    font-weight: bold;
    margin: 0;
}

.redlib-sync-differences-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--post);
    border-radius: 4px;
    overflow: hidden;
}

.redlib-sync-differences-table th {
    background: var(--highlighted);
    color: var(--accent);
    font-weight: bold;
    font-size: 11px;
    padding: 8px 12px;
    text-align: center;
    border-bottom: 1px solid var(--background);
}

.redlib-sync-differences-table td {
    font-family: monospace;
    font-size: 9px;
    padding: 6px 8px;
    color: var(--text);
    border-bottom: 1px solid var(--background);
    vertical-align: top;
    text-align: left;
    line-height: 1.2;
}

.redlib-sync-differences-table tr:last-child td {
    border-bottom: none;
}

.redlib-sync-differences-table td:first-child {
    background: var(--highlighted);
    font-weight: bold;
    color: var(--text);
    width: 25%;
}

/* Mobile responsive for merge preview */
@media screen and (max-width: 600px) {
    .redlib-sync-differences-header {
        flex-direction: column;
        gap: 8px;
        align-items: stretch;
    }

    .redlib-sync-differences-table td {
        font-size: 8px;
        padding: 4px 6px;
    }
}

/* Merge summary styling */
.redlib-merge-summary {
    border-left: 3px solid var(--accent);
}

.redlib-merge-summary div {
    border-bottom: 1px solid var(--highlighted);
    padding-bottom: 4px;
}

.redlib-merge-summary div:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

/* ========== END SYNC STYLES ========== */

/* Boost hover popup z-index to appear above settings overlay */
._redlib_subreddit_popup,
._redlib_username_popup,
._redlib_popup {
    z-index: 10002 !important;
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
            background-color: var(--post) !important;
        }

        /* Level 1: First children - BLACK */
        .thread > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 2: Grandchildren - GRAY */
        .thread > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 3: Great grandchildren - BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 4: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 5: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 6: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 7: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 8: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 9: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 10: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 11: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 12: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 13: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

        /* Level 14: GRAY */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--post) !important;
        }

        /* Level 15: BLACK */
        .thread > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment .replies > .comment {
            background-color: var(--foreground) !important;
        }

/* Custom expand/collapse button styling - unified with other buttons */
.expand-children {
    background: var(--background) !important;
    border: 1px solid var(--highlighted) !important;
    color: var(--text) !important;
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
    background: var(--accent) !important;
    color: var(--foreground) !important;
    text-decoration: none !important;
}

.expand-children:active {
    transform: scale(0.95) !important;
}
/* Action button hover styles */
.redlib-sync-action-btn:hover {
    background: var(--accent) !important;
    color: var(--foreground) !important;
}

.redlib-sync-action-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
    `;
        }
        document.head.appendChild(style);
    }

// ============================================================================
// EXTRACT POST METADATA HELPER FUNCTION - Must be defined before modules that use it
// ============================================================================
function extractPostMetadata(postElement) {
    // Extract title - specifically target the title link, not the flair
    let title = 'Unknown Title';

    // Check if we're on a comments page (different structure)
    const isCommentPage = window.location.pathname.includes('/comments/');

    if (isCommentPage) {
        // On comments page, title is in h1.post_title and might have flair
        const postTitleElement = postElement.querySelector('h1.post_title');
        if (postTitleElement) {
            // Clone the element to safely manipulate it
            const titleClone = postTitleElement.cloneNode(true);

            // Remove all flair links (entire <a class="post_flair"> elements)
            const flairLinks = titleClone.querySelectorAll('a.post_flair');
            flairLinks.forEach(flair => flair.remove());

            // Get the remaining text content (which is the title)
            title = titleClone.textContent.trim();
        }
    } else {
        // Original logic for post listing pages
        // First try to find the actual title link (not the flair link)
        const titleLink = postElement.querySelector('.post_title a[href*="/comments/"]');
        if (titleLink) {
            title = titleLink.textContent.trim();
        } else {
            // Fallback: try h2 a or other selectors but exclude flair
            const titleElement = postElement.querySelector('h2.post_title a:not(.post_flair)');
            if (titleElement) {
                title = titleElement.textContent.trim();
            } else {
                // Last fallback: try to get the title from comments link text
                const commentsLink = postElement.querySelector('a[href*="/comments/"]');
                if (commentsLink && commentsLink.textContent && !commentsLink.textContent.includes('comments')) {
                    title = commentsLink.textContent.trim();
                }
            }
        }
    }

    // Extract subreddit
    let subreddit = 'Unknown';
    const subredditLink = postElement.querySelector('a[href*="/r/"]:not(.post_flair)');
    if (subredditLink) {
        const match = subredditLink.href.match(/\/r\/([^\/\?]+)/);
        if (match) subreddit = match[1];
    }

    // Extract author
    let author = 'Unknown';
    const authorLink = postElement.querySelector('a[href*="/u/"], a[href*="/user/"]');
    if (authorLink) {
        const match = authorLink.href.match(/\/u(?:ser)?\/([^\/\?]+)/);
        if (match) author = match[1];
    }

    // Extract score
    let score = '0';
    const scoreElement = postElement.querySelector('.post_score, .comment_score');
    if (scoreElement) {
        score = scoreElement.textContent.trim();
    }

    // Extract comments URL
    let commentsUrl = '#';
    const commentsLink = postElement.querySelector('a[href*="/comments/"]');
    if (commentsLink) {
        commentsUrl = commentsLink.href;
    } else if (isCommentPage) {
        commentsUrl = window.location.href;
    }

    return {
        title: title,
        subreddit: subreddit,
        author: author,
        score: score,
        commentsUrl: commentsUrl
    };
}
function extractPostId(postElement) {
    // Try to get post ID from various possible sources

    // Method 1: From comments link
    const commentsLink = postElement.querySelector('a[href*="/comments/"]');
    if (commentsLink) {
        const match = commentsLink.href.match(/\/comments\/([^\/]+)/);
        if (match) return match[1];
    }

    // Method 2: From post element ID if it exists
    if (postElement.id) {
        return postElement.id.replace('post_', '');
    }

    // Method 3: From URL if we're on a comment page
    if (window.location.pathname.includes('/comments/')) {
        const match = window.location.pathname.match(/\/comments\/([^\/]+)/);
        if (match) return match[1];
    }

    // Method 4: Try to extract from any link in the post
    const allLinks = postElement.querySelectorAll('a');
    for (const link of allLinks) {
        const match = link.href.match(/\/comments\/([^\/]+)/);
        if (match) return match[1];
    }

    return null;
}
// Clean up any thumbnail-related artifacts that might persist from posts list pages
function cleanupThumbnailArtifacts(postElement) {
    // Remove any thumbnail links that shouldn't exist on comments pages
    const thumbnailLinks = postElement.querySelectorAll('.video-thumbnail-link, .image-thumbnail-link');
    thumbnailLinks.forEach(link => link.remove());

    // Clean up video thumbnail data attributes
    const videos = postElement.querySelectorAll('.post_media_video[data-original-poster]');
    videos.forEach(video => {
        video.removeAttribute('data-original-poster');
        video.removeAttribute('data-original-src');
        video.removeAttribute('data-original-controls');
    });

    // Clean up image thumbnail data attributes
    const images = postElement.querySelectorAll('.post_media_image[data-original-href]');
    images.forEach(image => {
        image.removeAttribute('data-original-href');
    });

    // Clean up hidden media containers
    const hiddenMedia = postElement.querySelectorAll('[data-hidden-for-thumbnail]');
    hiddenMedia.forEach(media => {
        media.style.display = '';
        media.removeAttribute('data-hidden-for-thumbnail');
    });
}
    // ============================================================================
    // POST COLLAPSER MODULE
    // ============================================================================
    const PostCollapser = (function() {
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
                const stored = GM_getValue('redlib_collapsed_posts', null);
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
                    GM_setValue('redlib_collapsed_posts', JSON.stringify(validPosts));
                }

                return validPosts;
            } catch (e) {
                console.error('[Redlib Enhancement Suite] Error reading GM storage:', e);
                return {};
            }
        }

        function saveCollapsedPosts(collapsedPosts) {
            try {
                GM_setValue('redlib_collapsed_posts', JSON.stringify(collapsedPosts));
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

// UNIFIED COLLAPSE FUNCTION - All collapse operations should use this
        function collapsePostUnified(postElement, postId, collapsedPosts, isCommentPage, options = {}) {
            const { skipAnimation = false, skipMetadata = false } = options;

            // Apply collapsed visual state
            postElement.classList.add('redlib-collapsed');

            // Extract metadata unless explicitly skipped
            let postData = {
                collapsed: true,
                timestamp: Date.now()
            };

            if (!skipMetadata) {
                const metadata = window.extractPostMetadata(postElement);

                postData = {
                    collapsed: true,
                    timestamp: Date.now(),
                    title: metadata.title,
                    subreddit: metadata.subreddit,
                    author: metadata.author,
                    commentsUrl: metadata.commentsUrl,
                    score: metadata.score
                };
            }

            // Save to storage
            collapsedPosts[postId] = postData;
            saveCollapsedPosts(collapsedPosts);

            // Apply visual changes
            if (!isCommentPage) {
                convertVideoToThumbnail(postElement);
                convertImageToThumbnail(postElement);
            }

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
                button.title = 'Unhide post';
            }
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
            collapsePostUnified(postElement, postId, collapsedPosts, isCommentPage);
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

            // Use unified collapse function for consistent metadata
            collapsePostUnified(postElement, postId, collapsedPosts, isCommentPage);

            // Debug metadata extraction
            console.log(`[POST COLLAPSE DEBUG] Post ID: ${postId}`);
            console.log(`[POST COLLAPSE DEBUG] Title: "${title}"`);
            console.log(`[POST COLLAPSE DEBUG] Subreddit: "${subreddit}"`);
            console.log(`[POST COLLAPSE DEBUG] Author: "${author}"`);
            console.log(`[POST COLLAPSE DEBUG] Score: "${score}"`);
            console.log(`[POST COLLAPSE DEBUG] Comments URL: "${commentsUrl}"`);
            console.log(`[POST COLLAPSE DEBUG] Post element:`, postElement);



            // Debug what was actually saved
            console.log(`[POST COLLAPSE DEBUG] Saved data:`, collapsedPosts[postId]);
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

            // Add collapse button on both post listing pages and comment pages for highlighted posts
            if ((!isCommentPage || postElement.classList.contains('highlighted')) && !postElement.querySelector('.redlib-collapse-btn')) {
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
            } else if (isCommentPage && !postElement.classList.contains('highlighted')) {
                // On comment pages, mark collapsible elements for non-highlighted posts but don't add manual controls
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
                    if (button) {
                        // Don't change the hide/unhide button state during visual toggle
                        // The button state should only be changed by permanent hide/unhide operations
                        // Keep the current button state unchanged
                    }
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
                    if (button) {
                        // Maintain hide/unhide button state based on permanent hidden status, not visual sticky state
                        const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
                        const hiddenPosts = JSON.parse(hiddenPostsData || '{}');
                        const postId = extractPostId(postElement);
                        const isActuallyHidden = hiddenPosts[postId] && (hiddenPosts[postId] === true || (hiddenPosts[postId].collapsed && hiddenPosts[postId].timestamp));

                        if (isActuallyHidden) {
                            button.innerHTML = '↶';
                            button.title = 'Unhide post';
                        } else {
                            button.innerHTML = '✕';
                            button.title = 'Hide post';
                        }
                    }
                }
                forceLayoutRecalculation();
            };

// Permanent hide/unhide functionality for sticky mode hide button
            const permanentTogglePost = (postElement, shouldHide) => {
                const postId = getPostId();
                if (!postId) return;

                const collapsedPosts = getCollapsedPosts();

                if (shouldHide) {
                    // Permanently hide the post
                    const metadata = extractPostMetadata(postElement);
                    collapsedPosts[postId] = {
                        collapsed: true,
                        timestamp: Date.now(),
                        title: metadata.title,
                        subreddit: metadata.subreddit,
                        author: metadata.author,
                        commentsUrl: metadata.commentsUrl,
                        score: metadata.score
                    };
                    saveCollapsedPosts(collapsedPosts);

                    // In sticky mode, DON'T call visualTogglePost - let hover behavior handle visual state
                    // Just update the CSS class to match permanent state
                    postElement.classList.add('redlib-collapsed');

                    // Update button to show unhide
                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) {
                        button.innerHTML = '↶';
                        button.title = 'Unhide post';
                    }
                } else {
                    // Permanently unhide the post
                    delete collapsedPosts[postId];
                    saveCollapsedPosts(collapsedPosts);

                    // In sticky mode, DON'T call visualTogglePost - let hover behavior handle visual state
                    // Just update the CSS class to match permanent state
                    postElement.classList.remove('redlib-collapsed');

                    // Update button to show hide
                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) {
                        button.innerHTML = '✕';
                        button.title = 'Hide post';
                    }
                }

                // Refresh the hidden posts table if settings overlay is open
                const settingsOverlay = document.querySelector('.redlib-settings-overlay');
                if (settingsOverlay && settingsOverlay.style.display === 'block') {
                    populateHiddenPosts();
                }
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

                // Only check permanent hidden state, ignore visual CSS class
                const postId = getPostId();
                if (postId) {
                    const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
                    const hiddenPosts = JSON.parse(hiddenPostsData || '{}');
                    const isPermanentlyHidden = hiddenPosts[postId] && (hiddenPosts[postId] === true || (hiddenPosts[postId].collapsed && hiddenPosts[postId].timestamp));

                    // If permanently hidden, expand visually on hover
                    if (isPermanentlyHidden) {
                        visualTogglePost(post, false);
                    }
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
                        // Only check permanent hidden state, ignore visual CSS class
                        const postId = getPostId();
                        if (postId) {
                            const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
                            const hiddenPosts = JSON.parse(hiddenPostsData || '{}');
                            const isPermanentlyHidden = hiddenPosts[postId] && (hiddenPosts[postId] === true || (hiddenPosts[postId].collapsed && hiddenPosts[postId].timestamp));

                            // If permanently hidden, collapse visually on mouse leave
                            if (isPermanentlyHidden) {
                                visualTogglePost(post, true);
                            }
                        }
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
            restoreImageFromThumbnail: restoreImageFromThumbnail,
            extractPostMetadata: extractPostMetadata  // Make it accessible
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
                'background: var(--background);' +
                'border: 1px solid var(--highlighted);' +
                'color: var(--text);' +
                'cursor: pointer;' +
                'font-size: 12px;' +
                'font-weight: bold;' +
                'margin-right: 8px;' +
                'padding: 2px 6px;' +
                'border-radius: 3px;' +
                'min-width: 24px;' +
                'line-height: 1;';

            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = 'var(--accent)';
                button.style.color = 'var(--foreground)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = 'var(--background)';
                button.style.color = 'var(--text)';
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

            // Add child count display
            const childCount = getChildCount(comment);
            if (childCount > 0) {
                const childCountDisplay = document.createElement('span');
                childCountDisplay.className = 'child-count-display';
                childCountDisplay.textContent = `(${childCount} replies)`;
                childCountDisplay.style.cssText = 'opacity: 0.5; float: right; font-size: 0.9em; margin-left: auto;';
                summary.appendChild(childCountDisplay);
            }
        }

function getChildCount(comment) {
            const directChildren = comment.querySelectorAll(':scope > .comment_right > .replies > .comment');
            return directChildren.length;
        }

        function handleCustomToggle(comment, button) {
            const isExpanded = button.getAttribute('data-expanded') === 'true';
            const commentDetails = comment.querySelector('.comment_right');

            if (isExpanded) {
                collapseDirectChildren(comment);
                button.textContent = '[+]';
                button.setAttribute('data-expanded', 'false');
                button.title = 'Expand direct replies';
            } else {
                // If this comment itself is collapsed by native redlib, expand it first
                if (commentDetails && !commentDetails.hasAttribute('open')) {
                    commentDetails.setAttribute('open', '');
                }
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

function removeDuplicateMoreRepliesLinks(parentContainer) {
            const seenHrefs = new Set();
            const allMoreRepliesLinks = parentContainer.querySelectorAll('a.deeper_replies');

            allMoreRepliesLinks.forEach(link => {
                const href = link.href;
                if (seenHrefs.has(href)) {
                    link.remove();
                } else {
                    seenHrefs.add(href);
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

                    // Check if existing siblings are expanded before processing new comments
                    const existingSiblings = parentBlockquote.querySelectorAll(':scope > div.comment');
                    let shouldExpandNewComments = false;

                    // Only check if there are existing siblings
                    if (existingSiblings.length > 0) {
                        let expandedCount = 0;

                        // Check each existing sibling's expand state
                        existingSiblings.forEach(sibling => {
                            const commentRight = sibling.querySelector('.comment_right');
                            const expandButton = sibling.querySelector('.expand-children');

                            // Check if expanded via native details (open attribute) OR custom button
                            const isNativeExpanded = commentRight && commentRight.hasAttribute('open');
                            const isCustomExpanded = expandButton && expandButton.getAttribute('data-expanded') === 'true';

                            if (isNativeExpanded || isCustomExpanded) {
                                expandedCount++;
                            }
                        });

                        // If ALL existing siblings are expanded, expand new ones too
                        shouldExpandNewComments = (expandedCount === existingSiblings.length);
                    }

                    newComments.forEach((comment) => {
                        const clonedComment = comment.cloneNode(true);

                        // Always initialize the comment first (this will collapse it)
                        initializeNewComment(clonedComment);

                        // If we should expand, do it after initialization
                        if (shouldExpandNewComments) {
                            const commentRight = clonedComment.querySelector('.comment_right');
                            if (commentRight) {
                                commentRight.setAttribute('open', '');
                            }
                        }

                        parentBlockquote.appendChild(clonedComment);
                    });

                    removeDuplicateComments(parentBlockquote);

                    // Remove duplicate "more replies" links from the entire parent container
                    removeDuplicateMoreRepliesLinks(parentBlockquote);

                    // Attach listeners to any new "more replies" links that were added with the new comments
                    const newlyAddedLinks = parentBlockquote.querySelectorAll('a.deeper_replies:not([data-listener-attached])');
                    newlyAddedLinks.forEach(link => {
                        attachMoreRepliesListener(link);
                        link.setAttribute('data-listener-attached', 'true');
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


        function getSidebarState() {
            try {
                const stored = GM_getValue('redlib_sidebar_hidden', null);
                return stored === null ? null : stored === 'true';
            } catch (e) {
                return null;
            }
        }

        function setSidebarState(hidden) {
            try {
                GM_setValue('redlib_sidebar_hidden', hidden.toString());
            } catch (e) {
                console.warn('Could not save sidebar state to GM storage');
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
        background: var(--background);
        border: 1px solid var(--highlighted);
        border-radius: 8px;
        padding: 0;
        z-index: 9999;
        max-width: 320px;
        min-width: 280px;
        width: 320px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        display: none;
        color: var(--text);
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
    background: var(--background);
    border: 1px solid var(--highlighted);
    border-radius: 8px;
    padding: 0;
    z-index: 999;
    max-width: 320px;
    min-width: 280px;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: none;
    color: var(--text);
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
}

            ._redlib_subreddit_popup .popup-header {
                background: var(--post);
                padding: 12px 16px;
                border-bottom: 1px solid var(--highlighted);
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
                color: var(--text);
            }

            ._redlib_subreddit_popup .popup-info .subreddit-name {
                margin: 0;
                font-size: 12px;
                color: var(--accent);
                font-weight: normal;
            }

            ._redlib_subreddit_popup .popup-body {
                padding: 12px 16px;
            }

            ._redlib_subreddit_popup .popup-description {
                margin: 0 0 12px 0;
                font-size: 13px;
                line-height: 1.4;
                color: var(--visited);
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
                color: var(--text);
                display: block;
            }

            ._redlib_subreddit_popup .popup-stat-label {
                color: var(--visited);
                font-size: 11px;
            }

            ._redlib_subreddit_popup .popup-actions {
                display: flex;
                gap: 8px;
            }

            ._redlib_subreddit_popup .popup-btn {
                flex: 1;
                padding: 6px 12px;
                border: 1px solid var(--highlighted);
                border-radius: 4px;
                background: var(--foreground);
                color: var(--text);
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
                font-family: inherit;
            }

            ._redlib_subreddit_popup .popup-btn:hover {
                background: var(--highlighted);
            }

            ._redlib_subreddit_popup .popup-btn.subscribe {
                background: var(--accent);
                border-color: var(--accent);
                color: var(--foreground);
            }

            ._redlib_subreddit_popup .popup-btn.subscribe:hover {
                background: #b73d4a;
            }

            ._redlib_subreddit_popup .popup-btn.unsubscribe {
                background: var(--highlighted);
                border-color: var(--accent);
                color: var(--accent);
            }

            ._redlib_subreddit_popup .popup-btn.filtered {
                background: var(--highlighted);
                border-color: var(--accent);
                color: var(--accent);
            }

            ._redlib_subreddit_popup .popup-loading {
                padding: 20px;
                text-align: center;
                color: var(--visited);
                font-size: 13px;
            }

            ._redlib_subreddit_popup .popup-error {
                padding: 20px;
                text-align: center;
                color: var(--accent);
                font-size: 13px;
            }

._redlib_subreddit_popup .popup-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--highlighted);
    color: var(--text);
    border: 1px solid var(--accent);
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
    background: var(--accent);
    color: var(--foreground);
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

                    // SYNC: Store the action in authoritative settings
                    const finalAction = action === 'subscribe' ? (data.isSubscribed ? 'subscribe' : 'unsubscribe') :
                    action === 'filter' ? (data.isFiltered ? 'filter' : 'unfilter') : action;
                    console.log('[SYNC] Popup action completed, storing in authority:', { subredditName: data.subreddit, finalAction });
                    window.RedlibSettingsSync.handleUserAction(data.subreddit, finalAction);

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
        background: var(--background);
        border: 1px solid var(--highlighted);
        border-radius: 8px;
        padding: 0;
        z-index: 9999;
        max-width: 320px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        display: none;
        color: var(--text);
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
    background: var(--background);
    border: 1px solid var(--highlighted);
    border-radius: 8px;
    padding: 0;
    z-index: 999;
    max-width: 320px;
    min-width: 280px;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: none;
    color: var(--text);
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
}

        ._redlib_username_popup .popup-header {
            background: var(--post);
            padding: 12px 16px;
            border-bottom: 1px solid var(--highlighted);
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
            color: var(--text);
        }

        ._redlib_username_popup .popup-info .username-name {
            margin: 0;
            font-size: 12px;
            color: var(--accent);
            font-weight: normal;
        }

._redlib_username_popup .popup-body {
    padding: 12px 16px;
}

._redlib_username_popup .popup-description {
    margin: 0 0 12px 0;
    font-size: 13px;
    line-height: 1.4;
    color: var(--visited);
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
            color: var(--text);
            display: block;
        }

        ._redlib_username_popup .popup-stat-label {
            color: var(--visited);
            font-size: 11px;
        }

        ._redlib_username_popup .popup-actions {
            display: flex;
            gap: 8px;
        }

        ._redlib_username_popup .popup-btn {
            flex: 1;
            padding: 6px 12px;
            border: 1px solid var(--highlighted);
            border-radius: 4px;
            background: var(--foreground);
            color: var(--text);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            font-family: inherit;
        }

        ._redlib_username_popup .popup-btn:hover {
            background: var(--highlighted);
        }

        ._redlib_username_popup .popup-btn.follow {
            background: var(--accent);
            border-color: var(--accent);
            color: var(--foreground);
        }

        ._redlib_username_popup .popup-btn.follow:hover {
            background: #b73d4a;
        }

        ._redlib_username_popup .popup-btn.unfollow {
            background: var(--highlighted);
            border-color: var(--accent);
            color: var(--accent);
        }

        ._redlib_username_popup .popup-btn.filtered {
            background: var(--highlighted);
            border-color: var(--accent);
            color: var(--accent);
        }

        ._redlib_username_popup .popup-loading {
            padding: 20px;
            text-align: center;
            color: var(--visited);
            font-size: 13px;
        }

        ._redlib_username_popup .popup-error {
            padding: 20px;
            text-align: center;
            color: var(--accent);
            font-size: 13px;
        }

._redlib_username_popup .popup-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--highlighted);
    color: var(--text);
    border: 1px solid var(--accent);
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
    background: var(--accent);
    color: var(--foreground);
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

                    // SYNC FIX: Store the action in authoritative settings
                    const finalAction = action === 'follow' ? (data.isFollowed ? 'follow' : 'unfollow') :
                    action === 'filter' ? (data.isFiltered ? 'filter_user' : 'unfilter_user') : action;
                    handleUserAction(data.username, finalAction);
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
    // PARENT COMMENT HOVER MODULE
    // ============================================================================
    const ParentCommentHover = (function() {
        let popup = null;
        let currentLink = null;
        let timeoutId = null;
        let hideTimeoutId = null;

function createPopup() {
    popup = document.createElement('div');
popup.className = '_redlib_popup';
popup.style.position = 'fixed';  // Override the absolute positioning from CSS
    document.body.appendChild(popup);

    // Add event listeners to popup
    popup.addEventListener('mouseenter', clearHideTimeout);
    popup.addEventListener('mouseleave', hidePopupDelayed);

    // Add click handler for "show next parent" header
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('next_comment')) {
            const parentId = event.target.getAttribute('data-parent-id');
            const parentComment = document.getElementById(parentId);
            if (parentComment) {
                // Get the grandparent's summary and body
                const grandParentSummary = parentComment.querySelector('summary.comment_data');
                const grandParentBody = parentComment.querySelector('.comment_body');

                if (grandParentSummary && grandParentBody) {
                    // Check if grandparent has its own parent
                    const greatGrandParent = findParentComment(parentComment);

                    // Clone the grandparent content to clean it
                    const grandSummaryClone = grandParentSummary.cloneNode(true);
                    const grandBodyClone = grandParentBody.cloneNode(true);

                    // Remove expand-children spans from grandparent summary
                    const grandSummaryExpandChildren = grandSummaryClone.querySelectorAll('.expand-children');
                    grandSummaryExpandChildren.forEach(span => span.remove());

                    // Remove parent-comment-link spans from grandparent summary
                    const grandSummaryParentLinks = grandSummaryClone.querySelectorAll('.parent-comment-link');
                    grandSummaryParentLinks.forEach(span => span.remove());

// Remove parent-comment-link spans from grandparent body
const grandBodyParentLinks = grandBodyClone.querySelectorAll('.parent-comment-link');
grandBodyParentLinks.forEach(span => span.remove());

                    // Build new content with grandparent stacked at the top
                    let newContent = '';

                    // Add next parent header for great-grandparent if it exists
                    if (greatGrandParent) {
                        newContent += '<div class="next_comment" data-parent-id="' + greatGrandParent.id + '">show next parent</div>';
                    }

// Add grandparent content at the top using formatted structure
newContent += formatCommentData(grandParentSummary, grandParentBody);

                    // Get existing content (remove the old header first)
                    const existingHeader = popup.querySelector('.next_comment');
                    if (existingHeader) {
                        existingHeader.remove();
                    }

                    // Add existing content below
                    newContent += popup.innerHTML;

                    popup.innerHTML = newContent;

                    // Re-apply positioning constraints after content change
                    positionPopup(currentLink);

// Re-attach close button functionality after content update
const closeBtn = popup.querySelector('.popup-close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        hidePopup();
    });
}
                }
            }
        }
    });

    // Add close button
    const closeBtn = document.createElement('div');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', hidePopup);
    document.body.appendChild(closeBtn);
}

// Helper function to format comment data consistently
function formatCommentData(commentSummary, commentBody) {
    // Parse the comment data to match HoverComments structure
    const authorLink = commentSummary.querySelector('a[href*="/user/"]');
    const author = authorLink ? authorLink.textContent.replace('u/', '') : 'Unknown';

    // Look for score in the parent comment element (not just in the summary)
const commentElement = commentSummary.closest('.comment');
const scoreElement = commentElement ? commentElement.querySelector('.comment_score') : null;
    const score = scoreElement ? scoreElement.textContent.trim() : '0';

    const timeElement = commentSummary.querySelector('.created, .live-timestamp');
    const timeAgo = timeElement ? timeElement.textContent.trim() : '';

    // Clean the body clone
    const bodyClone = commentBody.cloneNode(true);
    const bodyExpandChildren = bodyClone.querySelectorAll('.expand-children');
    bodyExpandChildren.forEach(span => span.remove());
    const bodyParentLinks = bodyClone.querySelectorAll('.parent-comment-link');
    bodyParentLinks.forEach(span => span.remove());

    // Build comment HTML with HoverComments structure
    let commentHTML = '<div class="comment">';
    commentHTML += '<div class="comment_header">';
    commentHTML += '<a href="/user/' + author + '" class="comment_author">u/' + author + '</a>';
    commentHTML += '<span class="comment_meta_separator">•</span>';
const scoreNumber = parseInt(score) || 0;
const scoreText = Math.abs(scoreNumber) === 1 ? 'point' : 'points';
commentHTML += '<span class="comment_points">' + score + ' ' + scoreText + '</span>';
    if (timeAgo) {
        commentHTML += '<span class="comment_meta_separator">•</span>';
        commentHTML += '<span class="comment_time">' + timeAgo + '</span>';
    }

    commentHTML += '</div>';
    commentHTML += '<div class="comment_body">' + bodyClone.innerHTML + '</div>';
    commentHTML += '</div>';

    return commentHTML;
}

function addStyles() {
    const style = document.createElement('style');
style.textContent = `
    /* Style parent comment links in comment body */
    .parent-comment-link {
        color: var(--accent) !important;
        text-decoration: underline;
        cursor: pointer;
        font-size: 11px !important;
        white-space: nowrap;
        display: inline-block !important;
        margin-top: 8px !important;
        float: right !important;
        clear: both !important;
        opacity: 0.7 !important;
    }

    .parent-comment-link:hover {
        opacity: 1 !important;
    }

    .parent-comment-link:before {
        content: "↗ " !important;
        font-size: 10px !important;
    }

    /* Popup styling with container width constraints */
    ._redlib_popup {
        box-sizing: border-box !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
    }
`;
    document.head.appendChild(style);
}

function addParentCommentLinks() {
    // Find all comments that are not top-level
    const childComments = document.querySelectorAll('.thread .comment .replies .comment');

    childComments.forEach((comment) => {
        // Skip if already has parent link
        if (comment.querySelector('.parent-comment-link')) {
            return;
        }

        // Find the parent comment
        const parentComment = findParentComment(comment);

        if (!parentComment) {
            return;
        }

        // Add parent link to the comment body instead of metadata
        const commentBody = comment.querySelector('.comment_body');

        if (commentBody) {
            const parentLink = document.createElement('div');
            parentLink.className = 'parent-comment-link';
            parentLink.textContent = 'parent';
            parentLink.setAttribute('data-parent-id', parentComment.id);

            // Append parent link to the end of the comment body
            commentBody.appendChild(parentLink);
        }
    });
}

        function findParentComment(comment) {
    // Navigate up the DOM to find the parent comment
    const parentReplies = comment.parentElement; // .replies

    if (!parentReplies || !parentReplies.classList.contains('replies')) {
        return null;
    }

    const parentComment = parentReplies.parentElement; // .comment_right

    if (!parentComment) {
        return null;
    }

    const actualParentComment = parentComment.parentElement; // .comment

    if (!actualParentComment || !actualParentComment.classList.contains('comment')) {
        return null;
    }

    return actualParentComment;
}

function showPopup(link, parentComment) {
    if (!popup || !parentComment) {
        return;
    }

    // Get the comment summary (where the author, score, time are)
    const parentSummary = parentComment.querySelector('summary.comment_data');
    if (!parentSummary) {
        return;
    }

    // Get the comment body
    const parentBody = parentComment.querySelector('.comment_body');
    if (!parentBody) {
        return;
    }

    // Check if this parent has its own parent for the "show next parent" header
    const grandParent = findParentComment(parentComment);

    // Clone the summary and body to clean them without affecting the original
    const summaryClone = parentSummary.cloneNode(true);
    const bodyClone = parentBody.cloneNode(true);

    // Remove expand-children spans from summary
    const summaryExpandChildren = summaryClone.querySelectorAll('.expand-children');
    summaryExpandChildren.forEach(span => span.remove());

    // Remove parent-comment-link spans from summary
    const summaryParentLinks = summaryClone.querySelectorAll('.parent-comment-link');
    summaryParentLinks.forEach(span => span.remove());

    // Remove expand-children spans from body
    const bodyExpandChildren = bodyClone.querySelectorAll('.expand-children');
    bodyExpandChildren.forEach(span => span.remove());

    // Remove parent-comment-link spans from body
    const bodyParentLinks = bodyClone.querySelectorAll('.parent-comment-link');
    bodyParentLinks.forEach(span => span.remove());

// Build popup content using exact HoverComments structure
let popupHTML = '';

// Add close button first (like HoverComments does)
popupHTML += '<button class="popup-close">×</button>';

// Add next parent header at the top if there is a grandparent
if (grandParent) {
    popupHTML += '<div class="next_comment" data-parent-id="' + grandParent.id + '">show next parent</div>';
}

// Add the comment with formatted structure
popupHTML += formatCommentData(parentSummary, parentBody);

popup.innerHTML = popupHTML;

// Position and show popup
positionPopup(link);
popup.style.display = 'block';
currentLink = link;

// Add close button functionality (like HoverComments does)
const closeBtn = popup.querySelector('.popup-close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        hidePopup();
    });

    // Position close button relative to popup
    const rect = popup.getBoundingClientRect();
    closeBtn.style.position = 'fixed';
    closeBtn.style.top = (rect.top + 8) + 'px';
    closeBtn.style.right = (window.innerWidth - rect.right + 8) + 'px';
    closeBtn.style.zIndex = '1003';
}
}

function positionPopup(link) {
    if (!popup || !link) return;

    const linkRect = link.getBoundingClientRect();

    // Find the top-level comment container to constrain popup width
    const topLevelComment = link.closest('.thread > .comment') ||
                           link.closest('.comment:not(.comment .comment)') ||
                           document.querySelector('.thread .comment');

    let containerRect;
    if (topLevelComment) {
        containerRect = topLevelComment.getBoundingClientRect();
    } else {
        // Fallback to a reasonable default width
        containerRect = {
            left: 20,
            right: window.innerWidth - 20,
            width: window.innerWidth - 40
        };
    }

    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    // Position directly below the link, but constrain to container width
    let left = Math.max(containerRect.left, linkRect.left);
    let top = linkRect.bottom + 5;

    // Get popup dimensions after content is set
    popup.style.display = 'block';
    popup.style.visibility = 'hidden';

    // Set max-width to container width before measuring
    popup.style.maxWidth = containerRect.width + 'px';

    const popupRect = popup.getBoundingClientRect();
    popup.style.visibility = 'visible';

    // Adjust horizontal position to stay within container bounds
    if (left + popupRect.width > containerRect.right) {
        left = containerRect.right - popupRect.width;
    }
    if (left < containerRect.left) {
        left = containerRect.left;
    }

    // Adjust vertical position if popup would go off screen
    if (top + popupRect.height > viewport.height - 10) {
        top = linkRect.top - popupRect.height - 5;
    }
    if (top < 10) {
        top = 10;
    }

    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
}

function hidePopup() {
    if (popup) {
        popup.style.display = 'none';
    }
    currentLink = null;
}

        function hidePopupDelayed() {
            clearTimeout(hideTimeoutId);
            hideTimeoutId = setTimeout(hidePopup, 150);
        }

        function clearHideTimeout() {
            clearTimeout(hideTimeoutId);
        }

        function handleMouseEnter(event) {
            const link = event.target;
            const parentId = link.getAttribute('data-parent-id');
            const parentComment = document.getElementById(parentId);

            clearTimeout(timeoutId);
            clearHideTimeout();

            // Show popup after short delay
            timeoutId = setTimeout(() => {
                showPopup(link, parentComment);
            }, 250);
        }

function handleMouseLeave(event) {
    clearTimeout(timeoutId);

    // Don't hide if moving to popup
    if (!popup || !event.relatedTarget || !popup.contains(event.relatedTarget)) {
        hidePopupDelayed();
    }
}

function bindEvents() {
    console.log('[Parent Comment Hover DEBUG] Binding events...');

    // Use event delegation for dynamically added links
    document.addEventListener('mouseover', (event) => {
        if (event.target && event.target.classList && event.target.classList.contains('parent-comment-link')) {
            console.log('[Parent Comment Hover DEBUG] Mouse over parent link detected!');
            handleMouseEnter(event);
        }
    });

    document.addEventListener('mouseout', (event) => {
        if (event.target && event.target.classList && event.target.classList.contains('parent-comment-link')) {
            console.log('[Parent Comment Hover DEBUG] Mouse out parent link detected!');
            handleMouseLeave(event);
        }
    });

    console.log('[Parent Comment Hover DEBUG] Events bound successfully');
}

function init() {
    console.log('[Parent Comment Hover DEBUG] Starting init...');
    console.log('[Parent Comment Hover DEBUG] Current pathname:', window.location.pathname);
    console.log('[Parent Comment Hover DEBUG] Includes /comments/:', window.location.pathname.includes('/comments/'));

    // Only initialize on comment pages
    if (!window.location.pathname.includes('/comments/')) {
        console.log('[Parent Comment Hover DEBUG] Not a comment page, returning');
        return;
    }

    console.log('[Parent Comment Hover DEBUG] Checking setting...');
    const settingEnabled = SettingsManager.getSetting('parentCommentHover', 'enabled');
    console.log('[Parent Comment Hover DEBUG] Setting enabled:', settingEnabled);

    // Check if setting is enabled
    if (!settingEnabled) {
        console.log('[Parent Comment Hover DEBUG] Setting disabled, returning');
        return;
    }

    console.log('[Parent Comment Hover DEBUG] Initializing components...');

    addStyles();  // ADD this back for parent link styling
    createPopup();
    bindEvents();

    // Add parent links to existing comments
    addParentCommentLinks();

    // Listen for new comments being added (e.g., via AJAX)
    const observer = new MutationObserver(() => {
        setTimeout(addParentCommentLinks, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('[Redlib Enhancement Suite] Parent Comment Hover initialized');
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
            commentNavigator: {
                enabled: true
            },
            parentCommentHover: {
                enabled: false
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
                const stored = GM_getValue('redlib_settings', null);
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
                GM_setValue('redlib_settings', JSON.stringify(settings));
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
          <div class="redlib-settings-option-description">
            Show subreddit info popup when hovering over subreddit links
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="subredditHover"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Username Hover Info</div>
          <div class="redlib-settings-option-description">
            Show user info popup when hovering over usernames
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="usernameHover"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>
    </div>

    <div class="redlib-settings-section">
      <h3 class="redlib-settings-section-title">Frontpage & Subreddit Pages</h3>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Subreddit Info Toggler</div>
          <div class="redlib-settings-option-description">
            Hide/show sidebar with floating button on subreddit pages
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="sidebarToggle"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div
        class="redlib-settings-subsetting"
        data-parent="sidebarToggle.enabled"
      >
        <div class="redlib-settings-option">
          <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">
              Hide Sidebars by Default
            </div>
            <div class="redlib-settings-option-description">
              Start with sidebars hidden when visiting subreddit pages
            </div>
          </div>
          <label class="redlib-settings-toggle">
            <input
              type="checkbox"
              data-module="sidebarToggle"
              data-setting="hideByDefault"
            />
            <span class="redlib-settings-slider"></span>
          </label>
        </div>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Post Hider</div>
          <div class="redlib-settings-option-description">
            Hide/show posts and remember state across sessions
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="postCollapser"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Post Expand Buttons</div>
          <div class="redlib-settings-option-description">
            Expand/minimize post text content
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="postCollapser"
            data-setting="expandButtons"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div
        class="redlib-settings-subsetting"
        data-parent="postCollapser.expandButtons"
      >
        <div class="redlib-settings-option">
          <div class="redlib-settings-option-info">
            <div class="redlib-settings-option-title">
              Expand Posts by Default
            </div>
            <div class="redlib-settings-option-description">
              Start with post text fully expanded instead of preview mode
            </div>
          </div>
          <label class="redlib-settings-toggle">
            <input
              type="checkbox"
              data-module="postCollapser"
              data-setting="expandByDefault"
            />
            <span class="redlib-settings-slider"></span>
          </label>
        </div>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Hover Comment Previews</div>
          <div class="redlib-settings-option-description">
            Show comment previews when hovering over comment links on post
            listings
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="hoverComments"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>
    </div>

    <div class="redlib-settings-section">
      <h3 class="redlib-settings-section-title">Comment Pages</h3>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Sticky Post Mode</div>
          <div class="redlib-settings-option-description">
            Post header sticks to top when scrolling on comment pages, expands
            preview on mouseover
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="postCollapser"
            data-setting="stickyMode"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Floating Video Player</div>
          <div class="redlib-settings-option-description">
            Videos float when scrolling down, with resize and drag support
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="postCollapser"
            data-setting="floatingVideo"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">
            AJAX Load More Comments
          </div>
          <div class="redlib-settings-option-description">
            Load more comment replies in-place instead of navigating to new page
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="ajaxCommentLoading"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">
            Child Comments Collapser
          </div>
          <div class="redlib-settings-option-description">
            Show top level comments, but collapse their children. Expand all
            children with one click
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="commentCollapser"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">
            Comment Navigator
          </div>
          <div class="redlib-settings-option-description">
            Show navigation buttons to jump between top-level comments on comment pages
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="commentNavigator"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">
            Parent Comment Hover
          </div>
          <div class="redlib-settings-option-description">
            Show parent comment preview when hovering over "parent" links in comment threads
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="parentCommentHover"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>

      <div class="redlib-settings-option">
        <div class="redlib-settings-option-info">
          <div class="redlib-settings-option-title">Comment Styling</div>
          <div class="redlib-settings-option-description">
            Compact layout, alternating background colors, and improved visual
            hierarchy
          </div>
        </div>
        <label class="redlib-settings-toggle">
          <input
            type="checkbox"
            data-module="commentStyling"
            data-setting="enabled"
          />
          <span class="redlib-settings-slider"></span>
        </label>
      </div>
    </div>

    <div class="redlib-settings-section">
    <h3 class="redlib-settings-section-title">Saved Posts</h3>

    <details class="redlib-saved-posts-collapsible" id="saved-posts-section">
        <summary class="redlib-saved-posts-summary">
            <span id="saved-posts-count">0</span> saved posts
        </summary>
        <div class="redlib-saved-posts-content">
            <div class="redlib-saved-posts-table-container">
<table class="redlib-saved-posts-table">
    <colgroup>
        <col style="width: 40%;">
        <col style="width: 12%;">
        <col style="width: 9%;">
        <col style="width: 13%;">
        <col style="width: 13%;">
        <col style="width: 13%;">
    </colgroup>
    <thead>
        <tr>
            <th class="sortable" data-sort="title">Title</th>
            <th class="sortable" data-sort="subreddit">Subreddit</th>
            <th class="sortable" data-sort="author">Author</th>
            <th class="sortable" data-sort="score">Pts</th>
            <th class="sortable" data-sort="date">Date</th>
            <th>×</th>
        </tr>
    </thead>
    <tbody id="saved-posts-table-body">
        <!-- Saved posts will be populated here -->
    </tbody>
</table>
            </div>
        </div>
    </details>
</div>

    <div class="redlib-settings-section">
        <h3 class="redlib-settings-section-title">Hidden Posts</h3>

        <details class="redlib-hidden-posts-collapsible" id="hidden-posts-section">
            <summary class="redlib-hidden-posts-summary">
                <span id="hidden-posts-count">0</span> hidden posts
            </summary>
            <div class="redlib-hidden-posts-content">
                <div class="redlib-hidden-posts-table-container">
<table class="redlib-hidden-posts-table">
    <colgroup>
        <col style="width: 40%;">
        <col style="width: 12%;">
        <col style="width: 9%;">
        <col style="width: 13%;">
        <col style="width: 13%;">
        <col style="width: 13%;">
    </colgroup>
    <thead>
        <tr>
            <th class="sortable" data-sort="title">Title</th>
            <th class="sortable" data-sort="subreddit">Subreddit</th>
            <th class="sortable" data-sort="author">Author</th>
            <th class="sortable" data-sort="score">Pts</th>
            <th class="sortable" data-sort="date">Date</th>
            <th>×</th>
        </tr>
    </thead>
    <tbody id="hidden-posts-table-body">
        <!-- Hidden posts will be populated here -->
    </tbody>
</table>
                </div>
            </div>
        </details>
    </div>

    <div class="redlib-settings-section">
        <h3 class="redlib-settings-section-title">Cross-Instance Sync</h3>

        <!-- Move Sync Status to the top -->
        <div class="redlib-settings-option">
            <div class="redlib-settings-option-info">
                <div class="redlib-settings-option-title">Sync Status</div>
                <div class="redlib-settings-option-description" id="redlib-sync-status">Loading sync status...</div>
            </div>
            <button class="redlib-settings-refresh-status" type="button" title="Refresh sync status information">Refresh</button>
        </div>

        <!-- Main comparison table -->
        <div class="redlib-sync-table-container">
            <div id="sync-comparison-table">
                Loading comparison...
            </div>
        </div>

        <!-- Merge Preview table with button -->
        <div class="redlib-sync-differences-container" id="sync-differences-container" style="display: none;">
            <div class="redlib-sync-differences-header">
                <h4 class="redlib-sync-differences-title">Merge Preview</h4>
                <button class="redlib-settings-merge" type="button" title="Merge? Inherit missing settings from this instance and update the instance with our own settings that the instance does not have?">Merge</button>
            </div>
            <div id="sync-differences-table">
                Loading merge preview...
            </div>
        </div>
    </div>

    <div class="redlib-settings-section">
        <h3 class="redlib-settings-section-title">Export/Import Settings</h3>

        <div class="redlib-settings-option">
            <div class="redlib-settings-option-info">
                <div class="redlib-settings-option-title">Export Settings</div>
                <div class="redlib-settings-option-description">Copy this encoded string to transfer your RES settings to another device</div>
            </div>
        </div>

        <div class="redlib-settings-option">
            <textarea id="res-export-string" readonly style="
                width: 100%;
                height: 80px;
                background: var(--post, #161616);
                color: var(--text, #d7dadc);
                border: 1px solid var(--highlighted, #333);
                border-radius: 4px;
                padding: 8px;
                font-family: monospace;
                font-size: 11px;
                resize: vertical;
                word-break: break-all;
            "></textarea>
            <button class="redlib-settings-copy-export" type="button" style="
                margin-top: 8px;
                background: var(--highlighted, #333);
                color: var(--text, #d7dadc);
                border: 1px solid var(--accent, #d54455);
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            ">Copy to Clipboard</button>
        </div>

        <div class="redlib-settings-option" style="margin-top: 20px;">
            <div class="redlib-settings-option-info">
                <div class="redlib-settings-option-title">Import Settings</div>
                <div class="redlib-settings-option-description">Paste an encoded settings string from another device</div>
            </div>
        </div>

        <div class="redlib-settings-option">
            <textarea id="res-import-string" placeholder="Paste your encoded RES settings here..." style="
                width: 100%;
                height: 80px;
                background: var(--post, #161616);
                color: var(--text, #d7dadc);
                border: 1px solid var(--highlighted, #333);
                border-radius: 4px;
                padding: 8px;
                font-family: monospace;
                font-size: 11px;
                resize: vertical;
                word-break: break-all;
            "></textarea>
            <button class="redlib-settings-import-apply" type="button" style="
                margin-top: 8px;
                background: var(--accent, #d54455);
                color: var(--foreground, #222);
                border: 1px solid var(--accent, #d54455);
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            ">Import Settings</button>
        </div>
    </div>

  </div>

  <div class="redlib-settings-footer">
      <div class="redlib-settings-version">Redlib Enhancement Suite v${SCRIPT_VERSION}</div>
<div class="redlib-settings-footer-actions">
    <button class="redlib-settings-reset" type="button">Reset to Defaults</button>
<button class="redlib-settings-apply" type="button" disabled>Apply Changes</button>
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

            // Only add listeners for buttons that exist (not the table header buttons)
            const refreshStatusBtn = overlay.querySelector('.redlib-settings-refresh-status');
            const mergeBtn = overlay.querySelector('.redlib-settings-merge');

            // Only add event listeners if the elements exist
            if (refreshStatusBtn) {
                refreshStatusBtn.addEventListener('click', async function() {
                    console.log('[SYNC] Refresh button clicked - performing comprehensive refresh');
                    if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.refreshSettingsOverlay) {
                        await RedlibSettingsSync.refreshSettingsOverlay();
                    }
                    // The export string will be updated by refreshSettingsOverlay
                });
            }

            if (mergeBtn) {
                mergeBtn.addEventListener('click', async function() {
                    // Get fresh analysis for merge preview
                    const syncResult = await RedlibSettingsSync.performSync();
                    const changeSummary = RedlibSettingsSync.generateChangeSummary(syncResult.differences || [], 'merge');

                    let confirmMessage = 'Perform selective merge?\n\n';

                    if (changeSummary.details.length === 0) {
                        confirmMessage += 'No changes needed - all settings already match.\n\nMerge anyway?';
                    } else {
                        confirmMessage += `This will merge:\n${changeSummary.details.join('\n')}\n\nProceed with merge?`;
                    }

                    if (confirm(confirmMessage)) {
                        try {
                            // Perform the merge
                            if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.mergeAndPushToInstance) {
                                await RedlibSettingsSync.mergeAndPushToInstance();
                            } else if (typeof mergeAndPushToInstance === 'function') {
                                await mergeAndPushToInstance();
                            }

                            // Refresh the entire overlay after merge
                            setTimeout(() => {
                                refreshSettingsOverlay();
                            }, 1500);

                        } catch (error) {
                            console.error('[SYNC] Error during merge:', error);
                        }
                    }
                });
            }
            // Add these after the existing button event listeners

            // Copy export string
            overlay.querySelector('.redlib-settings-copy-export')?.addEventListener('click', function() {
                const exportTextarea = document.getElementById('res-export-string');
                exportTextarea.select();
                exportTextarea.setSelectionRange(0, 99999);

                try {
                    document.execCommand('copy');
                    this.textContent = 'Copied!';
                    this.style.background = '#28a745';
                    setTimeout(() => {
                        this.textContent = 'Copy to Clipboard';
                        this.style.background = 'var(--highlighted, #333)';
                    }, 2000);
                } catch (err) {
                    console.error('[RES] Failed to copy:', err);
                    this.textContent = 'Copy failed';
                    setTimeout(() => {
                        this.textContent = 'Copy to Clipboard';
                    }, 2000);
                }
            });

            // Import settings
            overlay.querySelector('.redlib-settings-import-apply')?.addEventListener('click', async function() {
                const importTextarea = document.getElementById('res-import-string');
                const encodedString = importTextarea.value.trim();

                if (!encodedString) {
                    alert('Please paste an encoded settings string first');
                    return;
                }

                if (!confirm('Import these settings? This will overwrite your current RES configuration.')) {
                    return;
                }

                try {
                    const decodedSettings = RedlibSettingsSync.decodeRESSettings(encodedString);

                    if (!decodedSettings) {
                        throw new Error('Invalid settings format');
                    }

                    // Apply the imported settings
                    if (decodedSettings.settings) {
                        GM_setValue('redlib_settings', decodedSettings.settings);
                    }
                    if (decodedSettings.authoritative) {
                        GM_setValue('redlib_authoritative_settings', decodedSettings.authoritative);
                    }
                    if (decodedSettings.hiddenPosts) {
                        GM_setValue('redlib_collapsed_posts', decodedSettings.hiddenPosts);
                    }

                    this.textContent = 'Imported Successfully!';
                    this.style.background = '#28a745';

                    // Clear import field
                    importTextarea.value = '';

                    // Clear cache to ensure fresh data
                    if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.clearCache) {
                        RedlibSettingsSync.clearCache();
                    }

                    // Refresh the overlay to show new settings first
                    if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.refreshSettingsOverlay) {
                        await RedlibSettingsSync.refreshSettingsOverlay();
                    }

                    // Reset button appearance
                    this.textContent = 'Import Settings';
                    this.style.background = 'var(--accent, #d54455)';

                    // DIALOG 1: Show detailed import success summary with full changelog
                    if (decodedSettings.authoritative && Object.keys(decodedSettings.authoritative).length > 0) {
                        const emptySettings = { hiddenPostsCount: 0 };
                        const importedAuthWithHidden = {
                            ...JSON.parse(decodedSettings.authoritative),
                            hiddenPostsCount: decodedSettings.hiddenPosts ?
                                Object.keys(JSON.parse(decodedSettings.hiddenPosts)).length : 0
                        };

                        // Use inherit context like 1.139 to show what was imported into authority
                        const importSummary = RedlibSettingsSync.generateChangeSummary([], 'inherit', emptySettings, importedAuthWithHidden);

                        let importMessage = `Import Successful!`;
                        if (importSummary.details.length > 0) {
                            importMessage += `\n\nImported:\n${importSummary.details.join('\n')}`;
                        }
                        alert(importMessage);

                        // DIALOG 2: Ask about pushing to instance with detailed changelog
                        const syncResult = await RedlibSettingsSync.performSync();
                        const pushSummary = RedlibSettingsSync.generateChangeSummary(syncResult.differences || [], 'push-organized');

                        const pushMessage = `Apply imported settings to this instance?\n\n${pushSummary.details.join('\n')}\n\nApply these changes now?`;

                        if (confirm(pushMessage)) {
                            try {
                                if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.pushToInstance) {
                                    await RedlibSettingsSync.pushToInstance();
                                }
                            } catch (error) {
                                console.error('[RES] Error during push after import:', error);
                                alert('Import completed but push failed. You can manually push using the sync controls above.');
                            }
                        }
                    }

                } catch (error) {
                    console.error('[RES] Import failed:', error);
                    alert('Failed to import settings. Please check the encoded string format.');
                }
            });

            // Close on overlay click
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    handleCloseWithPendingChanges();
                }
            });

            // Handle hidden posts buttons
            overlay.addEventListener('click', (e) => {
                if (e.target.classList.contains('redlib-hidden-posts-unhide')) {
                    const postId = e.target.getAttribute('data-post-id');
                    unhidePost(postId);
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

            // Update the export string with current settings
            setTimeout(() => {
                const exportTextarea = overlay.querySelector('#res-export-string');
                if (exportTextarea) {
                    const encodedSettings = RedlibSettingsSync.encodeRESSettings ? RedlibSettingsSync.encodeRESSettings() : 'Export functions not available';
                    exportTextarea.value = encodedSettings;
                }
            }, 100);

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

            // Update sync status when opening settings (using cache)
            if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.updateSyncStatus) {
                RedlibSettingsSync.updateSyncStatus(false); // Use cache, don't fetch

                // Add table header button listeners after the table is updated
                setTimeout(() => {
                    addHeaderButtonListeners();
                }, 100);

// Update hidden posts table
setTimeout(() => {
    populateHiddenPosts();
    setupHiddenPostsTableSorting();
    populateSavedPosts();
    setupSavedPostsTableSorting();
}, 150);

            }

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
            if (confirm('Reset all settings to defaults? This will clear enhancement settings, authority settings, and hidden posts. This will reload the page.')) {
                try {
                    // Clear RES-specific storage keys
                    GM_deleteValue('redlib_settings');
                    GM_deleteValue('redlib_authoritative_settings');

                    // Clear hidden posts (collapsed posts)
                    GM_deleteValue('redlib_collapsed_posts');

                    // Clear other related storage keys
                    GM_deleteValue('redlib_sidebar_hidden');

                    // Clear any cached data in the sync module
                    if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.clearCache) {
                        RedlibSettingsSync.clearCache();
                    }

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

function addHeaderButtonListeners() {
    const adoptButton = document.getElementById('adopt-button');
    const overwriteButton = document.getElementById('overwrite-button');

    if (adoptButton) {
        adoptButton.onclick = async function() {
            // Get current settings to show what will be inherited
            const instance = await RedlibSettingsSync.extractInstanceSettings();
            const currentAuth = RedlibSettingsSync.getAuthoritativeSettings();

            // Generate preview of what will be inherited
            const changeSummary = RedlibSettingsSync.generateChangeSummary([], 'inherit', currentAuth, instance);

            const hasAuthoritySettings = Object.keys(currentAuth).length > 0;
            let confirmMessage = hasAuthoritySettings ?
                'Overwrite existing master settings?\n\n' :
                'Adopt this instance\'s settings as master?\n\n';

            if (changeSummary.details.length === 0) {
                confirmMessage += 'No meaningful changes detected.\n\nProceed anyway?';
            } else {
                confirmMessage += `This will adopt:\n${changeSummary.details.join('\n')}\n\nProceed with adopt?`;
            }

            if (confirm(confirmMessage)) {
                if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.inheritFromInstance) {
                    RedlibSettingsSync.inheritFromInstance();
                }
            }
        };
    }

    if (overwriteButton) {
        overwriteButton.onclick = async function() {
            // Force a fresh analysis to see what would change
            const syncResult = await RedlibSettingsSync.performSync();
            const changeSummary = RedlibSettingsSync.generateChangeSummary(syncResult.differences || [], 'push');

            let confirmMessage = 'Overwrite this instance with master settings?\n\n';

            if (changeSummary.details.length === 0) {
                confirmMessage += 'No changes needed - settings already match.\n\nOverwrite anyway?';
            } else {
                confirmMessage += `This will change:\n${changeSummary.details.join('\n')}\n\nProceed with overwrite?`;
            }

            if (confirm(confirmMessage)) {
                if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.pushToInstance) {
                    RedlibSettingsSync.pushToInstance();
                }
            }
        };
    }
}

function updateExportString() {
    const exportTextarea = document.getElementById('res-export-string');
    if (exportTextarea) {
        try {
            const encodedSettings = RedlibSettingsSync.encodeRESSettings ?
                RedlibSettingsSync.encodeRESSettings() : 'Export functions not available';
            exportTextarea.value = encodedSettings;
            console.log('[SYNC] Export string updated');
        } catch (error) {
            console.warn('[SYNC] Failed to update export string:', error);
            exportTextarea.value = 'Error generating export string';
        }
    }
}

function populateHiddenPosts() {
            const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
            const hiddenPosts = JSON.parse(hiddenPostsData || '{}');

            // Filter for only hidden posts
            const hiddenPostsList = Object.entries(hiddenPosts).filter(([postId, post]) => {
                return post && post.collapsed === true;
            });

            const countElement = document.getElementById('hidden-posts-count');
            const tableBody = document.getElementById('hidden-posts-table-body');

            if (countElement) {
                countElement.textContent = hiddenPostsList.length;
            }

            if (!tableBody) return;

            if (hiddenPostsList.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" class="redlib-hidden-posts-empty">No hidden posts</td></tr>';
                return;
            }

// Apply current sort or default to date
const sortSettings = window.hiddenPostsSort || { column: 'date', direction: 'desc' };
hiddenPostsList.sort((a, b) => {
    let valueA, valueB;

    switch(sortSettings.column) {
        case 'title':
            valueA = (a[1].title || '').toLowerCase();
            valueB = (b[1].title || '').toLowerCase();
            break;
        case 'subreddit':
            valueA = (a[1].subreddit || '').toLowerCase();
            valueB = (b[1].subreddit || '').toLowerCase();
            break;
        case 'author':
            valueA = (a[1].author || '').toLowerCase();
            valueB = (b[1].author || '').toLowerCase();
            break;
        case 'score':
            valueA = parseInt(a[1].score) || 0;
            valueB = parseInt(b[1].score) || 0;
            break;
        case 'date':
        default:
            valueA = a[1].timestamp || 0;
            valueB = b[1].timestamp || 0;
    }

    let result;
    if (typeof valueA === 'string') {
        result = valueA.localeCompare(valueB);
    } else {
        result = valueA - valueB;
    }

    return sortSettings.direction === 'desc' ? -result : result;
});

            tableBody.innerHTML = '';

hiddenPostsList.forEach(([postId, post]) => {
    const row = document.createElement('tr');

    // Check if this is the current post page
    const urlMatch = window.location.pathname.match(/\/comments\/([^\/]+)/);
    const currentPostId = urlMatch ? urlMatch[1] : null;

    if (currentPostId === postId) {
        row.classList.add('current-post-row');
    }

const title = post.title || 'Unknown Title';
const subreddit = post.subreddit || 'Unknown';
const author = post.author || 'Unknown';
const score = post.score || '0';
const commentsUrl = post.commentsUrl || '#';
const dateHidden = post.timestamp ?
    new Date(post.timestamp).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    }) : 'Unknown';

// Create full timestamp for tooltip
const fullTimestamp = post.timestamp ?
    new Date(post.timestamp).toISOString().replace('T', ' ').substring(0, 19) : 'Unknown';

// Clean the data - remove r/ and u/ prefixes if they exist
const cleanSubreddit = subreddit.startsWith('r/') ? subreddit.substring(2) : subreddit;
const cleanAuthor = author.startsWith('u/') ? author.substring(2) : author;

// Clean up score - remove "Upvotes" text and handle different formats
const cleanScore = score.replace(/\s*Upvotes?/i, '').trim();

// Get current instance URL for links
const currentHost = window.location.origin;

// Only create links if we have valid data (not "Unknown" or "#") - use cleaned values
const hasValidTitle = commentsUrl !== '#';
const hasValidSubreddit = cleanSubreddit !== 'Unknown';
const hasValidAuthor = cleanAuthor !== 'Unknown';

// Create title cell - link only if we have valid title and URL
let titleCell;
if (hasValidTitle) {
    titleCell = `<a href="${commentsUrl}" class="post-title-link" title="${title}" target="_blank">${title}</a>`;
} else {
    // For unknown titles, link to the post ID page so user can visit and extract metadata
    const postIdUrl = `${currentHost}/comments/${postId}`;
    titleCell = `<a href="${postIdUrl}" class="post-title-link" title="Visit post to extract metadata" target="_blank">${title}</a>`;
}

// Create subreddit cell - remove r/ prefix from link text
let subredditCell;
if (hasValidSubreddit) {
    subredditCell = `<a href="${currentHost}/r/${cleanSubreddit}" class="post-subreddit-link" target="_blank">${cleanSubreddit}</a>`;
} else {
    subredditCell = `<span>${cleanSubreddit}</span>`;
}

// Create author cell - remove u/ prefix from link text
let authorCell;
if (hasValidAuthor) {
    authorCell = `<a href="${currentHost}/u/${cleanAuthor}" class="post-author-link" target="_blank">${cleanAuthor}</a>`;
} else {
    authorCell = `<span>${cleanAuthor}</span>`;
}

    row.innerHTML = `
        <td class="post-title">${titleCell}</td>
        <td class="post-subreddit">${subredditCell}</td>
        <td class="post-author">${authorCell}</td>
        <td class="post-score">${cleanScore}</td>
        <td class="post-date" title="${fullTimestamp}">${dateHidden}</td>
        <td class="post-actions">
            <button class="redlib-hidden-posts-unhide" data-post-id="${postId}" title="Unhide post">×</button>
        </td>
    `;

    tableBody.appendChild(row);
});

            // Add click handlers for unhide buttons
            document.querySelectorAll('.redlib-hidden-posts-unhide').forEach(button => {
                button.addEventListener('click', function() {
                    const postId = this.getAttribute('data-post-id');
                    unhidePost(postId);
                });
            });
// Set initial sort indicator
const initialSortSettings = window.hiddenPostsSort || { column: 'date', direction: 'desc' };
const activeHeader = document.querySelector(`[data-sort="${initialSortSettings.column}"]`);
if (activeHeader) {
    // Clear all sort indicators first
    document.querySelectorAll('.redlib-hidden-posts-table th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    activeHeader.classList.add(initialSortSettings.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
}
        }

        function setupHiddenPostsTableSorting() {
    // Use event delegation to handle clicks on sortable headers
    const tableContainer = document.querySelector('.redlib-hidden-posts-table-container');
    if (!tableContainer) return;

    // Remove any existing event listeners by cloning the container
    const newContainer = tableContainer.cloneNode(true);
    tableContainer.parentNode.replaceChild(newContainer, tableContainer);

    // Add single delegated event listener
    newContainer.addEventListener('click', function(event) {
        const header = event.target.closest('th.sortable');
        if (!header) return;

        const sortColumn = header.getAttribute('data-sort');
        const activeSortSettings = window.hiddenPostsSort || { column: 'date', direction: 'desc' };

        // Toggle direction if same column, otherwise default to ascending
        let newDirection = 'asc';
        if (activeSortSettings.column === sortColumn && activeSortSettings.direction === 'asc') {
            newDirection = 'desc';
        }

        window.hiddenPostsSort = { column: sortColumn, direction: newDirection };

        // Update header styles
        newContainer.querySelectorAll('th').forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
        });
        header.classList.add(newDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');

        // Re-populate table with new sort
        populateHiddenPosts();

        // Re-apply sort indicator after repopulation
        setTimeout(() => {
            const updatedHeader = newContainer.querySelector(`[data-sort="${sortColumn}"]`);
            if (updatedHeader) {
                newContainer.querySelectorAll('th').forEach(th => {
                    th.classList.remove('sorted-asc', 'sorted-desc');
                });
                updatedHeader.classList.add(newDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            }
        }, 10);
    });
}

function unhidePost(postId) {
            const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
            const hiddenPosts = JSON.parse(hiddenPostsData || '{}');

            if (hiddenPosts[postId]) {
                // Save the title before deleting the post data
                const postTitle = hiddenPosts[postId].title || 'Unknown';

                // Remove from storage
                delete hiddenPosts[postId];
                GM_setValue('redlib_collapsed_posts', JSON.stringify(hiddenPosts));

                // Find and unhide the post on current page if it exists
                const postElement = document.getElementById(postId);
                if (postElement && postElement.classList.contains('redlib-collapsed')) {
                    // Use the same expand logic as the collapse button
                    postElement.classList.remove('redlib-collapsed');

                    // Restore thumbnails to full media if on post listing page
                    const isCommentPage = window.location.pathname.includes('/comments/');
                    if (!isCommentPage && window.PostCollapser) {
                        window.PostCollapser.restoreVideoFromThumbnail(postElement);
                        window.PostCollapser.restoreImageFromThumbnail(postElement);
                    }

                    // Show all collapsible elements
                    const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
                    collapsibleElements.forEach(el => {
                        el.style.display = '';
                        el.style.height = '';
                        el.style.overflow = '';
                    });

                    // Update button
                    const button = postElement.querySelector('.redlib-collapse-btn');
                    if (button) {
                        button.innerHTML = '✕';
                        button.title = 'Hide post';
                    }
                }

                // Refresh the hidden posts table
                populateHiddenPosts();

                // Show success message without refresh requirement
//                alert(`Post "${postTitle}" has been unhidden.`);
            }
        }

// ============================================================================
// SAVED POSTS FUNCTIONALITY
// ============================================================================
function savePost(postElement) {
    const postId = extractPostId(postElement);
    if (!postId) return;

    const savedPostsData = GM_getValue('redlib_saved_posts', '{}');
    const savedPosts = JSON.parse(savedPostsData || '{}');

    // Extract post metadata
    const metadata = extractPostMetadata(postElement);

    savedPosts[postId] = {
        saved: true,
        timestamp: Date.now(),
        title: metadata.title,
        subreddit: metadata.subreddit,
        author: metadata.author,
        score: metadata.score,
        commentsUrl: metadata.commentsUrl
    };

    GM_setValue('redlib_saved_posts', JSON.stringify(savedPosts));

    // Update UI
    updatePostSaveState(postElement, true);
    updateSaveButton(postElement, true);

    console.log(`[SAVED POSTS] Saved post: ${metadata.title}`);
}

function unsavePost(postId, fromTable = false) {
    const savedPostsData = GM_getValue('redlib_saved_posts', '{}');
    const savedPosts = JSON.parse(savedPostsData || '{}');

    const postTitle = savedPosts[postId]?.title || 'Unknown';

    if (savedPosts[postId]) {
        delete savedPosts[postId];
        GM_setValue('redlib_saved_posts', JSON.stringify(savedPosts));

        // Update UI for posts on current page
        const postElements = document.querySelectorAll('.post');
        postElements.forEach(postElement => {
            const elementPostId = extractPostId(postElement);
            if (elementPostId === postId) {
                updatePostSaveState(postElement, false);
                updateSaveButton(postElement, false);
            }
        });

        if (fromTable) {
            // Refresh the saved posts table
            populateSavedPosts();
        }

        console.log(`[SAVED POSTS] Unsaved post: ${postTitle}`);
    }
}

function updatePostSaveState(postElement, isSaved) {
    if (isSaved) {
        postElement.classList.add('redlib-saved-post');
    } else {
        postElement.classList.remove('redlib-saved-post');
    }
}

function updateSaveButton(postElement, isSaved) {
    const saveButton = postElement.querySelector('.redlib-save-btn');
    if (saveButton) {
        if (isSaved) {
            saveButton.classList.add('saved');
            saveButton.title = 'Unsave post';
            saveButton.style.background = 'var(--accent)';
            saveButton.style.color = 'var(--foreground)';
            saveButton.innerHTML = '★';
        } else {
            saveButton.classList.remove('saved');
            saveButton.title = 'Save post';
            saveButton.style.background = 'var(--highlighted)';
            saveButton.style.color = 'var(--accent)';
            saveButton.innerHTML = '☆';
        }
    }
}

function populateSavedPosts() {
    const savedPostsData = GM_getValue('redlib_saved_posts', '{}');
    const savedPosts = JSON.parse(savedPostsData || '{}');

    // Filter for only saved posts
    const savedPostsList = Object.entries(savedPosts).filter(([postId, post]) => {
        return post && post.saved === true;
    });

    const countElement = document.getElementById('saved-posts-count');
    const tableBody = document.getElementById('saved-posts-table-body');

    if (countElement) {
        countElement.textContent = savedPostsList.length;
    }

    if (!tableBody) return;

    if (savedPostsList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="redlib-saved-posts-empty">No saved posts</td></tr>';
        return;
    }

    // Apply current sort or default to date
    const sortSettings = window.savedPostsSort || { column: 'date', direction: 'desc' };
    savedPostsList.sort((a, b) => {
        let valueA, valueB;

        switch(sortSettings.column) {
            case 'title':
                valueA = (a[1].title || '').toLowerCase();
                valueB = (b[1].title || '').toLowerCase();
                break;
            case 'subreddit':
                valueA = (a[1].subreddit || '').toLowerCase();
                valueB = (b[1].subreddit || '').toLowerCase();
                break;
            case 'author':
                valueA = (a[1].author || '').toLowerCase();
                valueB = (b[1].author || '').toLowerCase();
                break;
            case 'score':
                valueA = parseInt(a[1].score) || 0;
                valueB = parseInt(b[1].score) || 0;
                break;
            case 'date':
            default:
                valueA = a[1].timestamp || 0;
                valueB = b[1].timestamp || 0;
        }

        let result;
        if (typeof valueA === 'string') {
            result = valueA.localeCompare(valueB);
        } else {
            result = valueA - valueB;
        }

        return sortSettings.direction === 'desc' ? -result : result;
    });

    tableBody.innerHTML = '';

savedPostsList.forEach(([postId, post]) => {
    const row = document.createElement('tr');

    // Check if this is the current post page
    const urlMatch = window.location.pathname.match(/\/comments\/([^\/]+)/);
    const currentPostId = urlMatch ? urlMatch[1] : null;

    if (currentPostId === postId) {
        row.classList.add('current-post-row');
    }

    const title = post.title || 'Unknown Title';
    const subreddit = post.subreddit || 'Unknown';
    const author = post.author || 'Unknown';
    const score = post.score || '0';
    const commentsUrl = post.commentsUrl || '#';
const dateSaved = post.timestamp ?
    new Date(post.timestamp).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    }) : 'Unknown';

    // Create full timestamp for tooltip
    const fullTimestamp = post.timestamp ?
        new Date(post.timestamp).toISOString().replace('T', ' ').substring(0, 19) : 'Unknown';

    // Clean up score - remove "Upvotes" text and handle different formats
    const cleanScore = score.replace(/\s*Upvotes?/i, '').trim();

    // Get current instance URL for links
    const currentHost = window.location.origin;

    // Only create links if we have valid data (not "Unknown" or "#")
    const hasValidTitle = commentsUrl !== '#';
    const hasValidSubreddit = subreddit !== 'Unknown';
    const hasValidAuthor = author !== 'Unknown';

    // Create title cell - link only if we have valid title and URL
    let titleCell;
    if (hasValidTitle) {
        titleCell = `<a href="${commentsUrl}" class="post-title-link" title="${title}" target="_blank">${title}</a>`;
    } else {
        // For unknown titles, link to the post ID page so user can visit and extract metadata
        const postIdUrl = `${currentHost}/comments/${postId}`;
        titleCell = `<a href="${postIdUrl}" class="post-title-link" title="Visit post to extract metadata" target="_blank">${title}</a>`;
    }

    // Create subreddit cell - remove r/ prefix from link text
    let subredditCell;
    if (hasValidSubreddit) {
        subredditCell = `<a href="${currentHost}/r/${subreddit}" class="post-subreddit-link" target="_blank">${subreddit}</a>`;
    } else {
        subredditCell = `<span>${subreddit}</span>`;
    }

    // Create author cell - remove u/ prefix from link text
    let authorCell;
    if (hasValidAuthor) {
        authorCell = `<a href="${currentHost}/u/${author}" class="post-author-link" target="_blank">${author}</a>`;
    } else {
        authorCell = `<span>${author}</span>`;
    }

    row.innerHTML = `
        <td class="post-title">${titleCell}</td>
        <td class="post-subreddit">${subredditCell}</td>
        <td class="post-author">${authorCell}</td>
        <td class="post-score">${cleanScore}</td>
        <td class="post-date" title="${fullTimestamp}">${dateSaved}</td>
        <td class="post-actions">
            <button class="redlib-saved-posts-unsave" data-post-id="${postId}" title="Unsave post">★</button>
        </td>
    `;

    tableBody.appendChild(row);
});

// Add click handlers for unsave buttons - MUST be after appendChild
setTimeout(() => {
    document.querySelectorAll('.redlib-saved-posts-unsave').forEach(button => {
        // Remove any existing listeners first
        button.replaceWith(button.cloneNode(true));
    });

    // Add fresh event listeners
    document.querySelectorAll('.redlib-saved-posts-unsave').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const postId = this.getAttribute('data-post-id');
            unsavePost(postId, true);
        });
    });
}, 10);

    // Set initial sort indicator
    const initialSortSettings = window.savedPostsSort || { column: 'date', direction: 'desc' };
    const activeHeader = document.querySelector('.redlib-saved-posts-table th[data-sort="' + initialSortSettings.column + '"]');
    if (activeHeader) {
        // Clear all sort indicators first
        document.querySelectorAll('.redlib-saved-posts-table th').forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
        });
        activeHeader.classList.add(initialSortSettings.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
}

function setupSavedPostsTableSorting() {
    // Use event delegation to handle clicks on sortable headers
    const tableContainer = document.querySelector('.redlib-saved-posts-table-container');
    if (!tableContainer) return;

    // Remove any existing event listeners by cloning the container
    const newContainer = tableContainer.cloneNode(true);
    tableContainer.parentNode.replaceChild(newContainer, tableContainer);

    // Add single delegated event listener
    newContainer.addEventListener('click', function(event) {
        const header = event.target.closest('th.sortable');
        if (!header) return;

        const sortColumn = header.getAttribute('data-sort');
        const activeSortSettings = window.savedPostsSort || { column: 'date', direction: 'desc' };

        // Toggle direction if same column, otherwise default to ascending
        let newDirection = 'asc';
        if (activeSortSettings.column === sortColumn && activeSortSettings.direction === 'asc') {
            newDirection = 'desc';
        }

        window.savedPostsSort = { column: sortColumn, direction: newDirection };

        // Update header styles
        newContainer.querySelectorAll('th').forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
        });
        header.classList.add(newDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');

        // Re-populate table with new sort
        populateSavedPosts();

        // Re-apply sort indicator after repopulation
        setTimeout(() => {
            const updatedHeader = newContainer.querySelector(`[data-sort="${sortColumn}"]`);
            if (updatedHeader) {
                newContainer.querySelectorAll('th').forEach(th => {
                    th.classList.remove('sorted-asc', 'sorted-desc');
                });
                updatedHeader.classList.add(newDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
            }
        }, 10);
    });
}

function addSaveButtonsToPosts() {
    // Only run on post listing pages
    if (window.location.pathname.includes('/comments/')) return;

    const posts = document.querySelectorAll('.post');
    const savedPostsData = GM_getValue('redlib_saved_posts', '{}');
    const savedPosts = JSON.parse(savedPostsData || '{}');

    posts.forEach(postElement => {
        // Skip if save button already exists
        if (postElement.querySelector('.redlib-save-btn')) return;

        const postId = extractPostId(postElement);
        if (!postId) return;

        // Use the same approach as PostCollapser and PostExpandButtons
        const postHeader = postElement.querySelector('.post_header');
        if (!postHeader) return;

        // Create save button with the same approach as other buttons
        const saveButton = document.createElement('button');
        saveButton.className = 'redlib-save-btn';
        saveButton.title = 'Save post';

        // Apply inline styles like the expand button does
        saveButton.style.cssText =
            'background: var(--highlighted);' +
            'color: var(--accent);' +
            'border: 1px solid var(--accent);' +
            'cursor: pointer;' +
            'font-size: 12px;' +
            'font-weight: bold;' +
            'margin-right: 4px;' +
            'padding: 2px 6px;' +
            'border-radius: 3px;' +
            'min-width: 20px;' +
            'line-height: 1;' +
            'text-align: center;';

        // Check if post is already saved
        const isSaved = savedPosts[postId]?.saved === true;
        if (isSaved) {
            saveButton.classList.add('saved');
            saveButton.title = 'Unsave post';
            saveButton.style.background = 'var(--accent)';
            saveButton.style.color = 'var(--foreground)';
            saveButton.innerHTML = '★';
            updatePostSaveState(postElement, true);
        } else {
            saveButton.innerHTML = '☆';
        }

        // Add hover effects like the expand button
        saveButton.addEventListener('mouseenter', () => {
            if (!saveButton.classList.contains('saved')) {
                saveButton.style.backgroundColor = 'var(--accent)';
                saveButton.style.color = 'var(--foreground)';
            }
        });

        saveButton.addEventListener('mouseleave', () => {
            if (!saveButton.classList.contains('saved')) {
                saveButton.style.backgroundColor = 'var(--highlighted)';
                saveButton.style.color = 'var(--accent)';
            }
        });

        // Add click handler
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const currentlySaved = this.classList.contains('saved');
            if (currentlySaved) {
                unsavePost(postId);
            } else {
                savePost(postElement);
            }
        });

        // Insert using the EXACT same method as the expand button
        postHeader.insertBefore(saveButton, postHeader.firstChild);
    });
}
function addSaveButtonToCommentsPage() {
    // Only run on comment pages
    if (!window.location.pathname.includes('/comments/')) return;

    const postElement = document.querySelector('.post.highlighted');
    if (!postElement) return;

    // Skip if save button already exists
    if (postElement.querySelector('.redlib-save-btn')) return;

    const postId = extractPostId(postElement);
    if (!postId) return;

    const postHeader = postElement.querySelector('.post_header');
    if (!postHeader) return;

    // Get saved posts data
    const savedPostsData = GM_getValue('redlib_saved_posts', '{}');
    const savedPosts = JSON.parse(savedPostsData || '{}');

    // Create save button with the same styling as post listing pages
    const saveButton = document.createElement('button');
    saveButton.className = 'redlib-save-btn';
    saveButton.title = 'Save post';

    saveButton.style.cssText =
        'background: var(--highlighted);' +
        'color: var(--accent);' +
        'border: 1px solid var(--accent);' +
        'cursor: pointer;' +
        'font-size: 12px;' +
        'font-weight: bold;' +
        'margin-right: 4px;' +
        'padding: 2px 6px;' +
        'border-radius: 3px;' +
        'min-width: 20px;' +
        'line-height: 1;' +
        'text-align: center;';

    // Check if post is already saved
    const isSaved = savedPosts[postId]?.saved === true;
    if (isSaved) {
        saveButton.classList.add('saved');
        saveButton.title = 'Unsave post';
        saveButton.style.background = 'var(--accent)';
        saveButton.style.color = 'var(--foreground)';
        saveButton.innerHTML = '★';
        updatePostSaveState(postElement, true);
    } else {
        saveButton.innerHTML = '☆';
    }

    // Add hover effects
    saveButton.addEventListener('mouseenter', () => {
        if (!saveButton.classList.contains('saved')) {
            saveButton.style.backgroundColor = 'var(--accent)';
            saveButton.style.color = 'var(--foreground)';
        }
    });

    saveButton.addEventListener('mouseleave', () => {
        if (!saveButton.classList.contains('saved')) {
            saveButton.style.backgroundColor = 'var(--highlighted)';
            saveButton.style.color = 'var(--accent)';
        }
    });

    // Add click handler
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const currentlySaved = this.classList.contains('saved');
        if (currentlySaved) {
            unsavePost(postId);
        } else {
            savePost(postElement);
        }
    });

    // Insert at beginning of post header like on listing pages
    postHeader.insertBefore(saveButton, postHeader.firstChild);
}
function addHideButtonToCommentsPage() {
    console.log('[DEBUG HIDE BUTTON] addHideButtonToCommentsPage called');

    // Only run on comment pages
    if (!window.location.pathname.includes('/comments/')) {
        console.log('[DEBUG HIDE BUTTON] Not a comments page, exiting');
        return;
    }
    console.log('[DEBUG HIDE BUTTON] On comments page');

    const postElement = document.querySelector('.post.highlighted');
    if (!postElement) {
        console.log('[DEBUG HIDE BUTTON] No highlighted post found');
        return;
    }
    console.log('[DEBUG HIDE BUTTON] Found highlighted post:', postElement);

    // Clean up any thumbnail artifacts from posts list pages
    cleanupThumbnailArtifacts(postElement);
    console.log('[DEBUG HIDE BUTTON] Cleaned up thumbnail artifacts');

    // Skip if hide button already exists
    if (postElement.querySelector('.redlib-collapse-btn')) {
        console.log('[DEBUG HIDE BUTTON] Hide button already exists');
        return;
    }
    // ... rest of the function
    console.log('[DEBUG HIDE BUTTON] No existing hide button found');

    const postId = extractPostId(postElement);
    if (!postId) {
        console.log('[DEBUG HIDE BUTTON] No post ID found');
        return;
    }
    console.log('[DEBUG HIDE BUTTON] Post ID:', postId);

    // Mark collapsible elements for the comments page
    const selectors = ['.post_body', '.post_media_content', '.post_thumbnail', '.gallery'];
    selectors.forEach(selector => {
        const elements = postElement.querySelectorAll(selector);
        console.log(`[DEBUG HIDE BUTTON] Found ${elements.length} elements for selector ${selector}`);
        elements.forEach(el => {
            el.classList.add('redlib-collapsible');
        });
    });

    console.log('[DEBUG HIDE BUTTON] Creating collapse button');
    const collapseButton = document.createElement('button');
    collapseButton.className = 'redlib-collapse-btn';
    collapseButton.innerHTML = '✕';
    collapseButton.title = 'Hide post';

    console.log('[DEBUG HIDE BUTTON] Adding click listener');
    collapseButton.addEventListener('click', (e) => {
        console.log('[DEBUG CLICK] Hide button clicked!');
        e.preventDefault();
        e.stopPropagation();

        // Check if we're in sticky mode and this is the highlighted post
        const isHighlightedPost = postElement.classList.contains('highlighted');
        const stickyModeEnabled = SettingsManager.getSetting('postCollapser', 'stickyMode');

        console.log('[DEBUG CLICK] isHighlightedPost:', isHighlightedPost);
        console.log('[DEBUG CLICK] stickyModeEnabled:', stickyModeEnabled);

if (isHighlightedPost && stickyModeEnabled) {
        // Use permanent toggle for sticky mode hide button
        // Check permanent hidden state, not visual state (which is controlled by hover)
        const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
        const hiddenPosts = JSON.parse(hiddenPostsData || '{}');
        const isCurrentlyHidden = hiddenPosts[postId] && (hiddenPosts[postId] === true || (hiddenPosts[postId].collapsed && hiddenPosts[postId].timestamp));

        permanentTogglePost(postElement, !isCurrentlyHidden);
    } else {
            console.log('[DEBUG CLICK] Using regular togglePost path');
            console.log('[DEBUG CLICK] Calling extractPostMetadata...');
            const metadata = extractPostMetadata(postElement);
            console.log('[DEBUG CLICK] Extracted metadata:', metadata);
        }
    });

    // Check if post is already hidden and update button accordingly
    const hiddenPostsData = GM_getValue('redlib_collapsed_posts', '{}');
    const hiddenPosts = JSON.parse(hiddenPostsData || '{}');
    const postData = hiddenPosts[postId];

    if (postData && (postData === true || (postData.collapsed && postData.timestamp))) {
        console.log('[DEBUG HIDE BUTTON] Post is already hidden, updating button');
        // Post is hidden - show unhide button
        collapseButton.innerHTML = '↶';
        collapseButton.title = 'Show post';
        postElement.classList.add('redlib-collapsed');

        // Hide collapsible elements
        const collapsibleElements = postElement.querySelectorAll('.redlib-collapsible');
        collapsibleElements.forEach(el => {
            el.style.display = 'none';
            el.style.height = '0';
            el.style.overflow = 'hidden';
        });
    }

    console.log('[DEBUG HIDE BUTTON] Appending button to post element');
    // Add button to post container
    postElement.appendChild(collapseButton);
    console.log('[DEBUG HIDE BUTTON] Button appended successfully');
}
        return {
            init: init,
            getSetting: getSetting,
            setSetting: setSetting,
            loadSettings: loadSettings,
            addHeaderButtonListeners: addHeaderButtonListeners,
            updateExportString: updateExportString,
            populateHiddenPosts: populateHiddenPosts,
            populateSavedPosts: populateSavedPosts,
            addSaveButtonsToPosts: addSaveButtonsToPosts,
            addSaveButtonToCommentsPage: addSaveButtonToCommentsPage,
            addHideButtonToCommentsPage: addHideButtonToCommentsPage
        };
    })();

    // ============================================================================
    // REDLIB NATIVE SETTINGS SYNC MODULE (Your Logic Implementation)
    // ============================================================================
    const RedlibSettingsSync = (function() {
        let isInitialized = false;
        // variables to cache the data
        let cachedAuthoritative = null;
        let cachedInstance = null;
        let cachedInstanceTimestamp = null;
        let cachedSettingsDifferences = []; // Add this line

// Helper function to create unified 3-column settings comparison with clickable headers
const createUnifiedSettingsTable = function(instanceSettings, authoritySettings) {
    // Get all unique setting keys from both sources, excluding global data
    const allSettings = new Set([
        ...Object.keys(instanceSettings).filter(key => !key.includes('timestamp') && key !== 'hiddenPostsCount'),
        ...Object.keys(authoritySettings).filter(key => !key.includes('timestamp') && key !== 'hiddenPostsCount')
    ]);

    if (allSettings.size === 0) {
        return `<div style="text-align: center; color: var(--text); opacity: 0.6;">No settings found</div>`;
    }

    let html = `<table class="redlib-settings-comparison">`;
    html += `<thead><tr>
        <th>Setting</th>
        <th title="Overwrite this instance with master settings">Script</th>
        <th title="Adopt this instance's settings as the master copy">Instance</th>
    </tr></thead><tbody>`;

    // Define the order we want to show settings
    const settingOrder = [
        'theme', 'front_page', 'layout', 'wide', 'remove_default_feeds',
        'show_nsfw', 'blur_nsfw', 'blur_spoiler', 'video_quality', 'post_sort', 'comment_sort',
        'autoplay_videos', 'fixed_navbar', 'hide_sidebar_and_summary', 'use_hls', 'hide_hls_notification',
        'disable_visit_reddit_confirmation', 'hide_awards', 'hide_score',
        'subscriptions', 'filters', 'followed_users', 'filtered_users'
    ];

    // Show settings in preferred order, then any remaining
    const orderedSettings = [
        ...settingOrder.filter(setting => allSettings.has(setting)),
        ...Array.from(allSettings).filter(setting => !settingOrder.includes(setting))
    ];

    orderedSettings.forEach(setting => {
        const instanceValue = instanceSettings[setting];
        const authorityValue = authoritySettings[setting];

        let inheritDisplay = '';
        let pushDisplay = '';
        let valuesAreSame = false;

        if (instanceValue !== undefined) {
            if (Array.isArray(instanceValue)) {
                // Special handling for arrays we want to show counts for
                if (setting === 'subscriptions') {
                    inheritDisplay = `${instanceValue.length} subscriptions`;
                } else if (setting === 'filters') {
                    inheritDisplay = `${instanceValue.length} filtered subreddits`;
                } else if (setting === 'followed_users') {
                    inheritDisplay = `${instanceValue.length} followed users`;
                } else if (setting === 'filtered_users') {
                    inheritDisplay = `${instanceValue.length} filtered users`;
                } else {
                    inheritDisplay = `${instanceValue.length} items`;
                }
            } else {
                inheritDisplay = String(instanceValue);
            }
        } else {
            inheritDisplay = '';
        }

        if (authorityValue !== undefined) {
            if (Array.isArray(authorityValue)) {
                // Special handling for arrays we want to show counts for
                if (setting === 'subscriptions') {
                    pushDisplay = `${authorityValue.length} subscriptions`;
                } else if (setting === 'filters') {
                    pushDisplay = `${authorityValue.length} filtered subreddits`;
                } else if (setting === 'followed_users') {
                    pushDisplay = `${authorityValue.length} followed users`;
                } else if (setting === 'filtered_users') {
                    pushDisplay = `${authorityValue.length} filtered users`;
                } else {
                    pushDisplay = `${authorityValue.length} items`;
                }
            } else {
                pushDisplay = String(authorityValue);
            }
        } else {
            pushDisplay = '';
        }

        // Helper function to check if a value represents "empty" state
        const isEmptyValue = function(value) {
            if (value === undefined || value === null) return true;
            if (Array.isArray(value) && value.length === 0) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            return false;
        };

        // Compare values considering empty states as equivalent
        if (isEmptyValue(instanceValue) && isEmptyValue(authorityValue)) {
            valuesAreSame = true;
        } else if (!isEmptyValue(instanceValue) && !isEmptyValue(authorityValue)) {
            if (Array.isArray(instanceValue) && Array.isArray(authorityValue)) {
                valuesAreSame = instanceValue.length === authorityValue.length &&
                    instanceValue.every(item => authorityValue.includes(item)) &&
                    authorityValue.every(item => instanceValue.includes(item));
            } else {
                valuesAreSame = String(instanceValue) === String(authorityValue);
            }
        } else {
            valuesAreSame = false;
        }

        const cellClass = valuesAreSame ? 'value-same' : 'value-different';
        html += `<tr><td>${setting}</td><td class="${cellClass}">${pushDisplay}</td><td class="${cellClass}">${inheritDisplay}</td></tr>`;
    });

    // Add button row directly in the same table
    html += `
        <tr style="background: transparent;">
            <td style="border: none; padding: 8px 0;"></td>
            <td style="border: none; padding: 8px 2px;">
                <button id="overwrite-button" class="redlib-sync-action-btn" style="
                    width: 100%;
                    background: var(--highlighted);
                    color: var(--text);
                    border: 1px solid var(--accent);
                    padding: 8px 4px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 11px;
                    font-weight: bold;
                    transition: all 0.2s ease;
                    text-align: center;
                " title="Overwrite this instance with master settings">
                    Overwrite Instance
                </button>
            </td>
            <td style="border: none; padding: 8px 2px;">
                <button id="adopt-button" class="redlib-sync-action-btn" style="
                    width: 100%;
                    background: var(--highlighted);
                    color: var(--text);
                    border: 1px solid var(--accent);
                    padding: 8px 4px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 11px;
                    font-weight: bold;
                    transition: all 0.2s ease;
                    text-align: center;
                " title="Adopt this instance's settings as the master copy">
                    Adopt Instance
                </button>
            </td>
        </tr>`;

    // Add Global Data row directly in the same table
    const globalHiddenCount = authoritySettings.hiddenPostsCount || 0;
    html += `
        <tr style="border-top: 2px solid var(--accent);">
            <td style="background: var(--post); font-weight: bold; color: var(--text); text-align: left;">Global Data</td>
            <td class="value-same">${globalHiddenCount} hidden posts</td>
            <td class="value-same">Shared across all instances</td>
        </tr>`;

    html += `</tbody></table>`;
    return html;
};

        // Timestamp formatting helpers
        function formatTimestamp(timestamp) {
            if (!timestamp) return 'undefined';
            const date = new Date(timestamp);
            return date.getFullYear() + '-' +
                String(date.getMonth() + 1).padStart(2, '0') + '-' +
                String(date.getDate()).padStart(2, '0') + ' ' +
                String(date.getHours()).padStart(2, '0') + ':' +
                String(date.getMinutes()).padStart(2, '0') + ':' +
                String(date.getSeconds()).padStart(2, '0');
        }

        function getTimestampDifference(timestamp1, timestamp2) {
            if (!timestamp1 || !timestamp2) return 'N/A';
            const diff = Math.abs(timestamp1 - timestamp2);
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) {
                return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
            } else if (minutes > 0) {
                return `${minutes}m ${seconds % 60}s`;
            } else {
                return `${seconds}s`;
            }
        }

        // Get authoritative (stored) settings
        function getAuthoritativeSettings() {
            const storedJson = GM_getValue('redlib_authoritative_settings', '{}');
            const settings = JSON.parse(storedJson);

            // Add hidden posts count - they're actually stored in redlib_collapsed_posts
            const collapsedPostsData = GM_getValue('redlib_collapsed_posts', '{}');
            const collapsedPosts = JSON.parse(collapsedPostsData || '{}');

            // Count posts that are collapsed (hidden)
            const hiddenCount = Object.keys(collapsedPosts).filter(postId => {
                const post = collapsedPosts[postId];
                return post && post.collapsed === true;
            }).length;

            settings.hiddenPostsCount = hiddenCount;

            console.log(`[HIDDEN POSTS DEBUG] Found ${hiddenCount} hidden posts in redlib_collapsed_posts`);

            return settings;
        }

        // Helper function to generate meaningful change summaries from cached differences
        const generateChangeSummary = function(settingsDifferences, contextType = 'general', beforeSettings = null, afterSettings = null) {
            // For inherit context, we need to compare empty authority vs instance manually
            if (contextType === 'inherit' && beforeSettings && afterSettings) {
                const details = [];
                let totalChanges = 0;

                // Define all possible native redlib settings
                const nativeSettings = [
                    'theme', 'front_page', 'layout', 'wide', 'remove_default_feeds',
                    'show_nsfw', 'blur_nsfw', 'blur_spoiler', 'video_quality', 'post_sort',
                    'comment_sort', 'autoplay_videos', 'fixed_navbar', 'hide_sidebar_and_summary',
                    'use_hls', 'hide_hls_notification', 'disable_visit_reddit_confirmation',
                    'hide_awards', 'hide_score'
                ];

                // Check for hidden posts changes (only show if there's a meaningful change)
                const beforeHiddenCount = beforeSettings.hiddenPostsCount || 0;
                const afterHiddenCount = afterSettings.hiddenPostsCount || 0;
                if (beforeHiddenCount !== afterHiddenCount) {
                    details.push(`• Hidden posts: ${beforeHiddenCount} → ${afterHiddenCount}`);
                    totalChanges += Math.abs(afterHiddenCount - beforeHiddenCount);
                }

                // Check each native setting for changes
                nativeSettings.forEach(setting => {
                    const beforeValue = beforeSettings[setting];
                    const afterValue = afterSettings[setting];

                    // Helper function to check if a value is effectively empty/not set
                    const isEmptyValue = (value) => {
                        return value === undefined || value === null || value === '' || value === 'not set';
                    };

                    // Only show if there's a meaningful change (not both empty, and after value is not empty)
                    const beforeIsEmpty = isEmptyValue(beforeValue);
                    const afterIsEmpty = isEmptyValue(afterValue);

                    // Skip if both are empty, or if after value is empty (going from something to nothing is usually not interesting for inherit)
                    if (beforeIsEmpty && afterIsEmpty) return; // Both empty - no change
                    if (!beforeIsEmpty && afterIsEmpty) return; // Going from value to empty - not shown in inherit
                    if (beforeIsEmpty && !afterIsEmpty) {
                        // Going from empty to value - this is a meaningful change for inherit
                        const settingName = setting === 'theme' ? 'Theme' :
                                        setting === 'layout' ? 'Layout' :
                                        setting === 'front_page' ? 'Front page' :
                                        setting === 'wide' ? 'Wide layout' :
                                        setting === 'remove_default_feeds' ? 'Remove default feeds' :
                                        setting === 'show_nsfw' ? 'Show NSFW' :
                                        setting === 'blur_nsfw' ? 'Blur NSFW' :
                                        setting === 'blur_spoiler' ? 'Blur spoiler' :
                                        setting === 'video_quality' ? 'Video quality' :
                                        setting === 'post_sort' ? 'Post sort' :
                                        setting === 'comment_sort' ? 'Comment sort' :
                                        setting === 'autoplay_videos' ? 'Autoplay videos' :
                                        setting === 'fixed_navbar' ? 'Fixed navbar' :
                                        setting === 'hide_sidebar_and_summary' ? 'Hide sidebar' :
                                        setting === 'use_hls' ? 'Use HLS' :
                                        setting === 'hide_hls_notification' ? 'Hide HLS notification' :
                                        setting === 'disable_visit_reddit_confirmation' ? 'No Reddit confirmation' :
                                        setting === 'hide_awards' ? 'Hide awards' :
                                        setting === 'hide_score' ? 'Hide score' :
                                        setting;

                        const beforeDisplay = 'not set';
                        const afterDisplay = afterValue;

                        details.push(`• ${settingName}: ${beforeDisplay} → ${afterDisplay}`);
                        totalChanges += 1;
                    } else if (!beforeIsEmpty && !afterIsEmpty && beforeValue !== afterValue) {
                        // Both have values but they're different - meaningful change
                        const settingName = setting === 'theme' ? 'Theme' :
                                        // ... same mapping as above
                                        setting;

                        const beforeDisplay = beforeValue;
                        const afterDisplay = afterValue;

                        details.push(`• ${settingName}: ${beforeDisplay} → ${afterDisplay}`);
                        totalChanges += 1;
                    }
                });

                // Add section headers for better organization
                if (details.length > 0) {
                    // Insert REDLIB SETTINGS header before existing settings
                    const settingsDetails = [...details];
                    details.length = 0; // Clear array

                    if (beforeHiddenCount !== afterHiddenCount) {
                        details.push('GLOBAL DATA:');
                        details.push(`• Hidden posts: ${beforeHiddenCount} → ${afterHiddenCount}`);
                        details.push('');
                    }

                    details.push('RES MODULES:');
                    details.push('• Enhancement modules imported and enabled');
                    details.push('');

                    if (settingsDetails.length > 0) {
                        details.push('REDLIB SETTINGS:');
                        details.push(...settingsDetails);
                        details.push('');
                    }
                }

                // LISTS section
                if (['subscriptions', 'filters', 'followed_users', 'filtered_users'].some(setting =>
                    (afterSettings[setting] || []).length > 0)) {
                    details.push('LISTS:');
                }

                ['subscriptions', 'filters', 'followed_users', 'filtered_users'].forEach(setting => {
                    const beforeArray = beforeSettings[setting] || [];
                    const afterArray = afterSettings[setting] || [];

                    if (afterArray.length > 0) {
                        const settingName = setting === 'subscriptions' ? 'subscriptions' :
                                        setting === 'filters' ? 'filtered subreddits' :
                                        setting === 'followed_users' ? 'followed users' :
                                        setting === 'filtered_users' ? 'filtered users' : setting;

                        details.push(`• ${beforeArray.length} → ${afterArray.length} ${settingName}`);
                        totalChanges += afterArray.length;
                    }
                });

                return {
                    summary: details.length > 0 ? `${details.length} types of changes (${totalChanges} total items)` : 'No meaningful changes detected',
                    details: details,
                    totalChanges: totalChanges
                };
            }

            // For push/general context, use the existing differences analysis
            if (!settingsDifferences || settingsDifferences.length === 0) {
                return { summary: 'No changes detected', details: [] };
            }

            const details = [];
            let totalChanges = 0;

            // For import success dialog - organized sections
            if (contextType === 'import-success' && beforeSettings && afterSettings) {
                const details = [];
                let totalChanges = 0;

                // GLOBAL DATA section
                const beforeHidden = beforeSettings.hiddenPostsCount || 0;
                const afterHidden = afterSettings.hiddenPostsCount || 0;
                if (beforeHidden !== afterHidden) {
                    details.push(`GLOBAL DATA:`);
                    details.push(`• Hidden posts: ${beforeHidden} → ${afterHidden}`);
                    details.push('');
                }

                // RES MODULES section
                details.push(`RES MODULES:`);
                details.push(`• Enhancement modules imported and enabled`);
                details.push('');

                // REDLIB SETTINGS section
                details.push(`REDLIB SETTINGS:`);
                const nativeSettings = [
                    'theme', 'front_page', 'layout', 'wide', 'remove_default_feeds',
                    'show_nsfw', 'blur_nsfw', 'blur_spoiler', 'video_quality', 'post_sort',
                    'comment_sort', 'autoplay_videos', 'fixed_navbar', 'hide_sidebar_and_summary',
                    'use_hls', 'hide_hls_notification', 'disable_visit_reddit_confirmation',
                    'hide_awards', 'hide_score'
                ];

                nativeSettings.forEach(setting => {
                    const beforeValue = beforeSettings[setting];
                    const afterValue = afterSettings[setting];

                    const isEmptyValue = (value) => value === undefined || value === null || value === '' || value === 'not set';
                    const beforeIsEmpty = isEmptyValue(beforeValue);
                    const afterIsEmpty = isEmptyValue(afterValue);

                    if (beforeIsEmpty && !afterIsEmpty) {
                        const settingName = setting === 'theme' ? 'Theme' :
                                        setting === 'front_page' ? 'Front page' :
                                        setting === 'layout' ? 'Layout' :
                                        setting === 'wide' ? 'Wide layout' :
                                        setting === 'remove_default_feeds' ? 'Remove default feeds' :
                                        setting === 'show_nsfw' ? 'Show NSFW' :
                                        setting === 'blur_nsfw' ? 'Blur NSFW' :
                                        setting === 'blur_spoiler' ? 'Blur spoiler' :
                                        setting === 'video_quality' ? 'Video quality' :
                                        setting === 'post_sort' ? 'Post sort' :
                                        setting === 'comment_sort' ? 'Comment sort' :
                                        setting === 'autoplay_videos' ? 'Autoplay videos' :
                                        setting === 'fixed_navbar' ? 'Fixed navbar' :
                                        setting === 'hide_sidebar_and_summary' ? 'Hide sidebar' :
                                        setting === 'use_hls' ? 'Use HLS' :
                                        setting === 'hide_hls_notification' ? 'Hide HLS notification' :
                                        setting === 'disable_visit_reddit_confirmation' ? 'No Reddit confirmation' :
                                        setting === 'hide_awards' ? 'Hide awards' :
                                        setting === 'hide_score' ? 'Hide score' : setting;

                        details.push(`• ${settingName}: → ${afterValue}`);
                    }
                });

                details.push('');

                // LISTS section
                details.push(`LISTS:`);
                ['subscriptions', 'filters', 'followed_users', 'filtered_users'].forEach(setting => {
                    const beforeArray = beforeSettings[setting] || [];
                    const afterArray = afterSettings[setting] || [];

                    if (afterArray.length > 0) {
                        const settingName = setting === 'subscriptions' ? 'subscriptions' :
                                        setting === 'filters' ? 'filtered subreddits' :
                                        setting === 'followed_users' ? 'followed users' :
                                        setting === 'filtered_users' ? 'filtered users' : setting;

                        details.push(`• Add ${afterArray.length} ${settingName}`);
                        totalChanges += afterArray.length;
                    }
                });

                return {
                    summary: details.length > 0 ? `Import completed with ${totalChanges} total items` : 'Import completed',
                    details: details,
                    totalChanges: totalChanges
                };
            }

            // For push confirmation after import - organized sections
            if (contextType === 'push-organized') {
                const details = [];

                if (!settingsDifferences || settingsDifferences.length === 0) {
                    return { summary: 'No changes needed', details: ['• All settings already match'] };
                }

                // Group by type for better organization
                const simpleValueChanges = [];
                const listChanges = [];

                settingsDifferences.forEach(diff => {
                    if (diff.type === 'array') {
                        const missing = diff.missingFromInstance?.length || 0;
                        if (missing > 0) {
                            const settingName = diff.setting === 'subscriptions' ? 'subscriptions' :
                                            diff.setting === 'filters' ? 'filtered subreddits' :
                                            diff.setting === 'followed_users' ? 'followed users' :
                                            diff.setting === 'filtered_users' ? 'filtered users' : diff.setting;
                            listChanges.push(`• Add ${missing} ${settingName}`);
                        }
                    } else if (diff.type === 'value') {
                        const settingName = diff.setting === 'theme' ? 'Theme' :
                                        diff.setting === 'layout' ? 'Layout' :
                                        diff.setting === 'front_page' ? 'Front page' :
                                        diff.setting === 'wide' ? 'Wide layout' :
                                        diff.setting === 'remove_default_feeds' ? 'Remove default feeds' :
                                        diff.setting === 'show_nsfw' ? 'Show NSFW' :
                                        diff.setting === 'blur_nsfw' ? 'Blur NSFW' :
                                        diff.setting === 'blur_spoiler' ? 'Blur spoiler' :
                                        diff.setting === 'video_quality' ? 'Video quality' :
                                        diff.setting === 'post_sort' ? 'Post sort' :
                                        diff.setting === 'comment_sort' ? 'Comment sort' :
                                        diff.setting === 'autoplay_videos' ? 'Autoplay videos' :
                                        diff.setting === 'fixed_navbar' ? 'Fixed navbar' :
                                        diff.setting === 'hide_sidebar_and_summary' ? 'Hide sidebar' :
                                        diff.setting === 'use_hls' ? 'Use HLS' :
                                        diff.setting === 'hide_hls_notification' ? 'Hide HLS notification' :
                                        diff.setting === 'disable_visit_reddit_confirmation' ? 'No Reddit confirmation' :
                                        diff.setting === 'hide_awards' ? 'Hide awards' :
                                        diff.setting === 'hide_score' ? 'Hide score' : diff.setting;

                        simpleValueChanges.push(`• ${settingName}: → ${diff.authValue}`);
                    }
                });

                // Add sections
                if (simpleValueChanges.length > 0) {
                    details.push('REDLIB SETTINGS:');
                    details.push(...simpleValueChanges);
                    details.push('');
                }

                if (listChanges.length > 0) {
                    details.push('LISTS:');
                    details.push(...listChanges);
                }

                return { summary: `${settingsDifferences.length} changes to apply`, details, totalChanges: settingsDifferences.length };
            }

            if (contextType === 'merge') {
                // For merge operations, only show what will be inherited from instance
                settingsDifferences.forEach(diff => {
                    if (diff.type === 'array' && diff.extraInInstance && diff.extraInInstance.length > 0) {
                        const settingName = diff.setting === 'subscriptions' ? 'subscriptions' :
                                        diff.setting === 'filters' ? 'filtered subreddits' :
                                        diff.setting === 'followed_users' ? 'followed users' :
                                        diff.setting === 'filtered_users' ? 'filtered users' : diff.setting;
                        details.push(`• Inherit ${diff.extraInInstance.length} ${settingName} from instance`);
                        totalChanges += diff.extraInInstance.length;
                    } else if (diff.type === 'value' && (diff.authValue === undefined || diff.authValue === null || diff.authValue === '')) {
                        const settingName = diff.setting === 'theme' ? 'Theme' :
                                        diff.setting === 'layout' ? 'Layout' :
                                        diff.setting === 'front_page' ? 'Front page' : diff.setting;
                        details.push(`• Inherit ${settingName}: ${diff.instanceValue} from instance`);
                        totalChanges += 1;
                    }
                });

                if (details.length === 0) {
                    details.push('• No settings to inherit - authority already has all instance settings');
                }
            } else {
                // For push/general context, process all differences
                settingsDifferences.forEach(diff => {
                    if (diff.type === 'array') {
                        const missing = diff.missingFromInstance?.length || 0;
                        const extra = diff.extraInInstance?.length || 0;

                        if (missing > 0 || extra > 0) {
                            const settingName = diff.setting === 'subscriptions' ? 'subscriptions' :
                                            diff.setting === 'filters' ? 'filtered subreddits' :
                                            diff.setting === 'followed_users' ? 'followed users' :
                                            diff.setting === 'filtered_users' ? 'filtered users' : diff.setting;

                            if (contextType === 'push') {
                                // For push: show what will change
                                if (missing > 0) {
                                    details.push(`• Add ${missing} ${settingName}`);
                                    totalChanges += missing;
                                }
                                if (extra > 0) {
                                    details.push(`• Remove ${extra} ${settingName}`);
                                    totalChanges += extra;
                                }
                            } else {
                                // General summary
                                if (diff.authValue > 0 || diff.instanceValue > 0) {
                                    details.push(`• ${settingName}: ${diff.authValue || 0} → ${diff.instanceValue || 0}`);
                                    totalChanges += missing + extra;
                                }
                            }
                        }
                    } else if (diff.type === 'value' && diff.authValue !== diff.instanceValue) {
                        // Simple value differences
                        const isEmptyValue = (value) => {
                            return value === undefined || value === null || value === '' || value === 'not set';
                        };

                        const authIsEmpty = isEmptyValue(diff.authValue);
                        const instIsEmpty = isEmptyValue(diff.instanceValue);

                        // Only show meaningful changes (skip if both empty)
                        if (!(authIsEmpty && instIsEmpty)) {
                            const settingName = diff.setting === 'theme' ? 'Theme' :
                                            diff.setting === 'layout' ? 'Layout' :
                                            diff.setting === 'front_page' ? 'Front page' :
                                            diff.setting === 'wide' ? 'Wide layout' :
                                            diff.setting === 'remove_default_feeds' ? 'Remove default feeds' :
                                            diff.setting === 'show_nsfw' ? 'Show NSFW' :
                                            diff.setting === 'blur_nsfw' ? 'Blur NSFW' :
                                            diff.setting === 'blur_spoiler' ? 'Blur spoiler' :
                                            diff.setting === 'video_quality' ? 'Video quality' :
                                            diff.setting === 'post_sort' ? 'Post sort' :
                                            diff.setting === 'comment_sort' ? 'Comment sort' :
                                            diff.setting === 'autoplay_videos' ? 'Autoplay videos' :
                                            diff.setting === 'fixed_navbar' ? 'Fixed navbar' :
                                            diff.setting === 'hide_sidebar_and_summary' ? 'Hide sidebar' :
                                            diff.setting === 'use_hls' ? 'Use HLS' :
                                            diff.setting === 'hide_hls_notification' ? 'Hide HLS notification' :
                                            diff.setting === 'disable_visit_reddit_confirmation' ? 'No Reddit confirmation' :
                                            diff.setting === 'hide_awards' ? 'Hide awards' :
                                            diff.setting === 'hide_score' ? 'Hide score' :
                                            diff.setting;

                            if (contextType === 'push') {
                                details.push(`• ${settingName}: → ${diff.authValue}`);
                                totalChanges += 1;
                            } else {
                                const beforeValue = authIsEmpty ? 'not set' : diff.authValue;
                                const afterValue = instIsEmpty ? 'not set' : diff.instanceValue;
                                details.push(`• ${settingName}: ${beforeValue} → ${afterValue}`);
                                totalChanges += 1;
                            }
                        }
                    }
                });
            }

            // Filter out meaningless entries
            const meaningfulDetails = details.filter(detail =>
                !detail.includes('0 ') &&
                !detail.includes('not set → not set') &&
                !detail.includes(': 0 → 0')
            );

            const summary = meaningfulDetails.length > 0 ?
                `${meaningfulDetails.length} types of changes (${totalChanges} total items)` :
                'No meaningful changes detected';

            return { summary, details: meaningfulDetails, totalChanges };
        };

        // Save authoritative settings
        function saveAuthoritativeSettings(settings) {
            GM_setValue('redlib_authoritative_settings', JSON.stringify(settings));
        }

        // Check if settings look like defaults/empty
        function isDefaultSettings(settings) {
            const filters = settings.filters || [];
            const subscriptions = settings.subscriptions || [];
            return filters.length === 0 && subscriptions.length === 0;
        }

        // Compare arrays for equality
        function arraysEqual(a, b) {
            if (!a && !b) return true;
            if (!a || !b) return false;
            if (a.length !== b.length) return false;
            return a.sort().join(',') === b.sort().join(',');
        }

        async function extractInstanceSettings() {
            try {
                //        console.log('[SYNC] Extracting current instance settings...');

                let doc;
                let settingsUrl;

                // Check if we're already on the settings page
                if (window.location.pathname === '/settings' || window.location.pathname.endsWith('/settings')) {
                    console.log('[SYNC] Already on settings page, using current document');
                    doc = document;
                    settingsUrl = window.location.href;
                } else {
                    //            console.log('[SYNC] Fetching settings page...');
                    settingsUrl = window.location.origin + '/settings';
                    const response = await fetch(settingsUrl);
                    const html = await response.text();
                    const parser = new DOMParser();
                    doc = parser.parseFromString(html, 'text/html');
                    //            console.log('[SYNC] Settings page fetched');
                }

                const restoreLink = doc.querySelector('a[href*="/settings/restore/"]');

                if (!restoreLink) {
                    console.warn('[SYNC] Could not find restore link');
                    return {};
                }

                //        console.log('[SYNC] Raw restore link found:', restoreLink.href);

                const restoreUrl = new URL(restoreLink.href, window.location.origin);
                const urlParams = new URLSearchParams(restoreUrl.search);

                const instanceSettings = {};

                // **EXTRACT ALL SETTINGS - COMPLETE VERSION**

                // Appearance
                if (urlParams.has('theme')) {
                    instanceSettings.theme = urlParams.get('theme');
                }

                // Interface
                if (urlParams.has('remove_default_feeds')) {
                    instanceSettings.remove_default_feeds = urlParams.get('remove_default_feeds');
                }
                if (urlParams.has('front_page')) {
                    instanceSettings.front_page = urlParams.get('front_page');
                }
                if (urlParams.has('layout')) {
                    instanceSettings.layout = urlParams.get('layout');
                }
                if (urlParams.has('wide')) {
                    instanceSettings.wide = urlParams.get('wide');
                }

                // Content
                if (urlParams.has('video_quality')) {
                    instanceSettings.video_quality = urlParams.get('video_quality');
                }
                if (urlParams.has('post_sort')) {
                    instanceSettings.post_sort = urlParams.get('post_sort');
                }
                if (urlParams.has('blur_spoiler')) {
                    instanceSettings.blur_spoiler = urlParams.get('blur_spoiler');
                }
                if (urlParams.has('show_nsfw')) {
                    instanceSettings.show_nsfw = urlParams.get('show_nsfw');
                }
                if (urlParams.has('blur_nsfw')) {
                    instanceSettings.blur_nsfw = urlParams.get('blur_nsfw');
                }
                if (urlParams.has('autoplay_videos')) {
                    instanceSettings.autoplay_videos = urlParams.get('autoplay_videos');
                }
                if (urlParams.has('fixed_navbar')) {
                    instanceSettings.fixed_navbar = urlParams.get('fixed_navbar');
                }
                if (urlParams.has('hide_sidebar_and_summary')) {
                    instanceSettings.hide_sidebar_and_summary = urlParams.get('hide_sidebar_and_summary');
                }
                if (urlParams.has('use_hls')) {
                    instanceSettings.use_hls = urlParams.get('use_hls');
                }
                if (urlParams.has('hide_hls_notification')) {
                    instanceSettings.hide_hls_notification = urlParams.get('hide_hls_notification');
                }
                if (urlParams.has('disable_visit_reddit_confirmation')) {
                    instanceSettings.disable_visit_reddit_confirmation = urlParams.get('disable_visit_reddit_confirmation');
                }
                if (urlParams.has('comment_sort')) {
                    instanceSettings.comment_sort = urlParams.get('comment_sort');
                }
                if (urlParams.has('hide_awards')) {
                    instanceSettings.hide_awards = urlParams.get('hide_awards');
                }
                if (urlParams.has('hide_score')) {
                    instanceSettings.hide_score = urlParams.get('hide_score');
                }

                // Lists (only extract if present and not empty)
                if (urlParams.has('subscriptions')) {
                    const subscriptionsParam = urlParams.get('subscriptions');
                    instanceSettings.subscriptions = (subscriptionsParam && subscriptionsParam.trim() !== '') ?
                        subscriptionsParam.split('+').map(s => s.trim()).filter(s => s.length > 0) : [];
                }

                if (urlParams.has('filters')) {
                    const filtersParam = urlParams.get('filters');
                    instanceSettings.filters = (filtersParam && filtersParam.trim() !== '') ?
                        filtersParam.split('+').map(s => s.trim()).filter(s => s.length > 0) : [];
                }

                if (urlParams.has('followed_users')) {
                    const followedUsersParam = urlParams.get('followed_users');
                    instanceSettings.followed_users = (followedUsersParam && followedUsersParam.trim() !== '') ?
                        followedUsersParam.split('+').map(s => s.trim()).filter(s => s.length > 0) : [];
                }

                if (urlParams.has('filtered_users')) {
                    const filteredUsersParam = urlParams.get('filtered_users');
                    instanceSettings.filtered_users = (filteredUsersParam && filteredUsersParam.trim() !== '') ?
                        filteredUsersParam.split('+').map(s => s.trim()).filter(s => s.length > 0) : [];
                }

                console.log('[SYNC] Instance settings extracted from instance\'s restore url:', {
                    settingsFound: Object.keys(instanceSettings),
                    subscriptionsCount: instanceSettings.subscriptions?.length || 0,
                    filtersCount: instanceSettings.filters?.length || 0,
                    followedUsersCount: instanceSettings.followed_users?.length || 0,
                    filteredUsersCount: instanceSettings.filtered_users?.length || 0,
                    allSettings: instanceSettings
                });

                return instanceSettings;

            } catch (e) {
                console.warn('[SYNC] Failed to extract instance settings:', e);
                return {};
            }
        }

        // Generate settings URL for applying to instance
        function generateSettingsUrl(authoritativeSettings) {
            const baseUrl = window.location.origin + '/settings/restore/';
            const params = new URLSearchParams();

            // **USE AUTHORITATIVE VALUES EXACTLY AS THEY ARE - NO HARDCODED FALLBACKS**

            // Appearance
            if (authoritativeSettings.theme !== undefined) {
                params.set('theme', authoritativeSettings.theme);
            }

            // Interface
            if (authoritativeSettings.remove_default_feeds !== undefined) {
                params.set('remove_default_feeds', authoritativeSettings.remove_default_feeds);
            }
            if (authoritativeSettings.front_page !== undefined) {
                params.set('front_page', authoritativeSettings.front_page);
            }
            if (authoritativeSettings.layout !== undefined) {
                params.set('layout', authoritativeSettings.layout);
            }
            if (authoritativeSettings.wide !== undefined) {
                params.set('wide', authoritativeSettings.wide);
            }

            // Content
            if (authoritativeSettings.video_quality !== undefined) {
                params.set('video_quality', authoritativeSettings.video_quality);
            }
            if (authoritativeSettings.post_sort !== undefined) {
                params.set('post_sort', authoritativeSettings.post_sort);
            }
            if (authoritativeSettings.blur_spoiler !== undefined) {
                params.set('blur_spoiler', authoritativeSettings.blur_spoiler);
            }
            if (authoritativeSettings.show_nsfw !== undefined) {
                params.set('show_nsfw', authoritativeSettings.show_nsfw);
            }
            if (authoritativeSettings.blur_nsfw !== undefined) {
                params.set('blur_nsfw', authoritativeSettings.blur_nsfw);
            }
            if (authoritativeSettings.autoplay_videos !== undefined) {
                params.set('autoplay_videos', authoritativeSettings.autoplay_videos);
            }
            if (authoritativeSettings.fixed_navbar !== undefined) {
                params.set('fixed_navbar', authoritativeSettings.fixed_navbar);
            }
            if (authoritativeSettings.hide_sidebar_and_summary !== undefined) {
                params.set('hide_sidebar_and_summary', authoritativeSettings.hide_sidebar_and_summary);
            }
            if (authoritativeSettings.use_hls !== undefined) {
                params.set('use_hls', authoritativeSettings.use_hls);
            }
            if (authoritativeSettings.hide_hls_notification !== undefined) {
                params.set('hide_hls_notification', authoritativeSettings.hide_hls_notification);
            }
            if (authoritativeSettings.disable_visit_reddit_confirmation !== undefined) {
                params.set('disable_visit_reddit_confirmation', authoritativeSettings.disable_visit_reddit_confirmation);
            }
            if (authoritativeSettings.comment_sort !== undefined) {
                params.set('comment_sort', authoritativeSettings.comment_sort);
            }
            if (authoritativeSettings.hide_awards !== undefined) {
                params.set('hide_awards', authoritativeSettings.hide_awards);
            }
            if (authoritativeSettings.hide_score !== undefined) {
                params.set('hide_score', authoritativeSettings.hide_score);
            }

            // Lists (only add if they exist and have content)
            if (authoritativeSettings.subscriptions && authoritativeSettings.subscriptions.length > 0) {
                params.set('subscriptions', authoritativeSettings.subscriptions.join('+'));
            }

            if (authoritativeSettings.filters && authoritativeSettings.filters.length > 0) {
                params.set('filters', authoritativeSettings.filters.join('+'));
            }

            if (authoritativeSettings.followed_users && authoritativeSettings.followed_users.length > 0) {
                params.set('followed_users', authoritativeSettings.followed_users.join('+'));
            }

            if (authoritativeSettings.filtered_users && authoritativeSettings.filtered_users.length > 0) {
                params.set('filtered_users', authoritativeSettings.filtered_users.join('+'));
            }

            return baseUrl + '?' + params.toString();
        }

        // Main sync logic - your system!
        async function performSync() {
            console.log('[SYNC] === SYNC CHECK START ===');

            // 1. Get authoritative (stored) settings
            cachedAuthoritative = getAuthoritativeSettings();
            console.log('[SYNC] 1. AUTHORITATIVE SETTINGS:', {
                settingsFound: Object.keys(cachedAuthoritative),
                subscriptionsCount: cachedAuthoritative.subscriptions?.length || 0,
                filtersCount: cachedAuthoritative.filters?.length || 0,
                followedUsersCount: cachedAuthoritative.followed_users?.length || 0,
                filteredUsersCount: cachedAuthoritative.filtered_users?.length || 0,
                allSettings: cachedAuthoritative
            });

            // 2. Get current instance settings
            cachedInstance = await extractInstanceSettings();
            cachedInstanceTimestamp = GM_getValue(`instance_timestamp_${window.location.hostname}`, 0);

            // 3. Decide what to do based on comprehensive comparison
            const now = Date.now();
            let action = 'NONE';
            let reason = '';
            let settingsDifferences = [];

            if (!cachedAuthoritative.overall_timestamp) {
                action = 'INHERIT_FROM_INSTANCE';
                reason = 'No authoritative settings exist - inheriting from instance';
            } else if (Object.keys(cachedInstance).length === 0) {
                action = 'PUSH_TO_INSTANCE';
                reason = 'Instance has no settings configured';
            } else {
                // Compare all settings individually
                // Compare all settings individually - check BOTH directions
                const authSettings = Object.keys(cachedAuthoritative).filter(key => !key.includes('timestamp'));
                const instanceSettings = Object.keys(cachedInstance).filter(key => !key.includes('timestamp'));
                const allSettings = [...new Set([...authSettings, ...instanceSettings])];

                allSettings.forEach(setting => {
                    // Skip global settings that shouldn't be part of sync comparison
                    if (setting === 'hiddenPostsCount') {
                        return;
                    }
                    if (Array.isArray(cachedAuthoritative[setting]) || Array.isArray(cachedInstance[setting])) {
                        const authArray = cachedAuthoritative[setting] || [];
                        const instanceArray = cachedInstance[setting] || [];

                        if (!arraysEqual(instanceArray, authArray)) {

                            // Find what's in auth but not in instance (missing from instance)
                            const missingFromInstance = authArray.filter(item => !instanceArray.includes(item));

                            // Find what's in instance but not in auth (extra in instance)
                            const extraInInstance = instanceArray.filter(item => !authArray.includes(item));

                            settingsDifferences.push({
                                setting,
                                type: 'array',
                                authValue: authArray.length,
                                instanceValue: instanceArray.length,
                                missingFromInstance: missingFromInstance,
                                extraInInstance: extraInInstance,
                                netDifference: authArray.length - instanceArray.length,
                                needsMerge: extraInInstance.length > 0 && missingFromInstance.length > 0
                            });
                            console.log(`[SYNC DEBUG] Added difference for ${setting}:`, {
                                setting: setting,
                                authArrayLength: authArray.length,
                                instanceArrayLength: instanceArray.length,
                                authArraySample: authArray.slice(0, 3),
                                instanceArraySample: instanceArray.slice(0, 3),
                                missingFromInstanceCount: missingFromInstance.length,
                                missingFromInstanceSample: missingFromInstance.slice(0, 3),
                                extraInInstanceCount: extraInInstance.length,
                                extraInInstanceSample: extraInInstance.slice(0, 3)
                            });
                        }
                    } else {
                        if (cachedInstance[setting] !== cachedAuthoritative[setting]) {
                            settingsDifferences.push({
                                setting,
                                type: 'value',
                                authValue: cachedAuthoritative[setting],
                                instanceValue: cachedInstance[setting]
                            });
                        }
                    }
                });

                if (settingsDifferences.length === 0) {
                    action = 'CONFIRM_SYNC';
                    reason = 'All settings match between authoritative and instance';
                } else {
                    // Check if any arrays need merging
                    const needsMerge = settingsDifferences.some(diff => diff.needsMerge);

                    if (needsMerge) {
                        // Calculate total changes needed
                        const totalChanges = settingsDifferences.reduce((total, diff) => {
                            if (diff.needsMerge) {
                                return total + diff.missingFromInstance.length + diff.extraInInstance.length;
                            }
                            return total + (diff.missingFromInstance?.length || 0);
                        }, 0);

                        if (totalChanges <= 5) { // Threshold for selective updates
                            action = 'SELECTIVE_PUSH';
                            reason = `Small changes (${totalChanges} items) - will push selectively to avoid cookie limits`;
                        } else {
                            action = 'MERGE_AND_PUSH';
                            reason = `Large changes (${totalChanges} items) - will merge and push complete settings`;
                        }
                    } else {
                        const totalChanges = settingsDifferences.reduce((total, diff) => {
                            return total + (diff.missingFromInstance?.length || 0);
                        }, 0);

                        if (totalChanges <= 5 && totalChanges > 0) {
                            action = 'SELECTIVE_PUSH';
                            reason = `Small changes (${totalChanges} items) - will push selectively`;
                        } else {
                            action = 'PUSH_TO_INSTANCE';
                            reason = `${settingsDifferences.length} settings differ: ${settingsDifferences.slice(0, 3).map(d => d.setting).join(', ')}`;
                        }
                    }
                }
            }

            console.log('[SYNC] 3. SYNC DECISION:', {
                action,
                reason,
                settingsDifferences,
                totalDifferences: settingsDifferences.length
            });

            // 4. Execute action (SIMULATION MODE)
            switch (action) {
                case 'INHERIT_FROM_INSTANCE':
                    console.log('[SYNC] 4. WOULD INHERIT FROM INSTANCE:', {
                        subscriptionsToInherit: cachedInstance.subscriptions.length,
                        filtersToInherit: cachedInstance.filters.length,
                        action: 'Would copy instance settings to become new authoritative truth'
                    });
                    break;

                case 'PUSH_TO_INSTANCE':
                    const settingsUrl = generateSettingsUrl(cachedAuthoritative);

                    console.log('[SYNC] 4. WOULD PUSH TO INSTANCE:', {
                        subscriptionsToPush: cachedAuthoritative.subscriptions?.length || 0,
                        filtersToPush: cachedAuthoritative.filters?.length || 0,
                        action: 'Would redirect to apply authoritative settings',
                        url: settingsUrl
                    });
                    break;

                case 'CONFIRM_SYNC':
                    console.log('[SYNC] 4. WOULD CONFIRM SYNC:', {
                        action: 'Would update instance timestamp to match authoritative',
                        currentInstanceTimestamp: formatTimestamp(cachedInstanceTimestamp),
                        authoritativeTimestamp: formatTimestamp(cachedAuthoritative.timestamp)
                    });
                    break;

                case 'MERGE_AND_PUSH':
                    console.log('[SYNC] 4. WOULD MERGE AND PUSH:', {
                        action: 'Would merge instance extras into authority, then push merged result to instance',
                        mergingDetails: settingsDifferences.filter(d => d.needsMerge).map(diff => ({
                            setting: diff.setting,
                            willInherit: diff.extraInInstance,
                            willPush: diff.missingFromInstance,
                            newTotal: diff.authValue + diff.extraInInstance.length
                        }))
                    });
                    break;

                case 'SELECTIVE_PUSH':
                    const selectiveChanges = settingsDifferences.filter(diff =>
                                                                        (diff.missingFromInstance?.length || 0) + (diff.extraInInstance?.length || 0) > 0
                                                                       );

                    console.log('[SYNC] 4. WOULD PUSH SELECTIVELY:', {
                        action: 'Would push individual items using hover popup actions to avoid cookie limits',
                        changes: selectiveChanges.map(diff => ({
                            setting: diff.setting,
                            toInherit: diff.extraInInstance || [],
                            toPush: diff.missingFromInstance || [],
                            method: 'Individual hover popup actions'
                        })),
                        totalOperations: selectiveChanges.reduce((total, diff) =>
                                                                 total + (diff.missingFromInstance?.length || 0) + (diff.extraInInstance?.length || 0), 0
                                                                )
                    });
                    break;

                case 'CONFLICT':
                    console.log('[SYNC] 4. CONFLICT DETECTED:', {
                        instanceSubscriptions: cachedInstance.subscriptions.length,
                        authoritativeSubscriptions: cachedAuthoritative.subscriptions?.length || 0,
                        instanceFilters: cachedInstance.filters.length,
                        authoritativeFilters: cachedAuthoritative.filters?.length || 0,
                        action: 'No automatic resolution - manual intervention needed'
                    });
                    break;
            }

            // At the end of performSync(), add:
            const statusElement = document.getElementById('redlib-sync-status');
            if (statusElement) {
                let status = '';
                if (!cachedAuthoritative.timestamp) {
                    status = 'No authoritative settings. Use "Inherit" to set this instance as master.';
                } else {
                    const inSync = arraysEqual(cachedInstance.subscriptions, cachedAuthoritative.subscriptions) &&
                          arraysEqual(cachedInstance.filters, cachedAuthoritative.filters);

                    if (inSync) {
                        status = `✅ In sync (${cachedAuthoritative.subscriptions?.length || 0} subs, ${cachedAuthoritative.filters?.length || 0} filters)`;
                    } else {
                        status = `❌ Out of sync. Auth: ${cachedAuthoritative.subscriptions?.length || 0}/${cachedAuthoritative.filters?.length || 0}, Instance: ${cachedInstance.subscriptions.length}/${cachedInstance.filters.length}`;
                    }

                    status += ` | Last update: ${formatTimestamp(cachedAuthoritative.timestamp)}`;
                }

                statusElement.textContent = status;
            }

            // 4. Update sync status using cached data
            updateSyncStatusFromCache();
            console.log('[SYNC DEBUG] Final settingsDifferences before caching:', settingsDifferences.map(diff => ({
                setting: diff.setting,
                type: diff.type,
                authValue: diff.authValue,
                instanceValue: diff.instanceValue,
                missingFromInstanceLength: diff.missingFromInstance?.length || 0,
                extraInInstanceLength: diff.extraInInstance?.length || 0,
                missingFromInstanceSample: diff.missingFromInstance?.slice(0, 2) || [],
                extraInInstanceSample: diff.extraInInstance?.slice(0, 2) || []
            })));
            cachedSettingsDifferences = settingsDifferences; // Store for later use

            console.log('[SYNC] === SYNC CHECK END ===');

            return {
                action,
                reason,
                differences: settingsDifferences,
                totalDifferences: settingsDifferences.length
            };
        }

        // Handle user actions (hover popup filter/subscribe)
        function handleUserAction(subredditName, action) {
            console.log('[SYNC] === USER ACTION START ===');
            console.log('[SYNC] User action:', { subredditName, action });

            try {
                const authoritative = getAuthoritativeSettings();
                const now = Date.now();

                console.log('[SYNC] BEFORE ACTION - Authority state:');
                console.log('[SYNC] - Subscriptions:', authoritative.subscriptions);
                console.log('[SYNC] - TikTokCringe in subscriptions?', authoritative.subscriptions?.includes(subredditName));
                console.log('[SYNC] - Filters:', authoritative.filters);
                console.log('[SYNC] - TikTokCringe in filters?', authoritative.filters?.includes(subredditName));

                // When user adds/removes, make sure we're working with individual subreddits
                if (!authoritative.subscriptions) authoritative.subscriptions = [];
                if (!authoritative.filters) authoritative.filters = [];

                // Ensure they're arrays of individual subreddits, not giant strings
                if (typeof authoritative.subscriptions[0] === 'string' && authoritative.subscriptions[0].includes('+')) {
                    authoritative.subscriptions = authoritative.subscriptions[0].split('+').filter(s => s.length > 0);
                }
                if (typeof authoritative.filters[0] === 'string' && authoritative.filters[0].includes('+')) {
                    authoritative.filters = authoritative.filters[0].split('+').filter(s => s.length > 0);
                }

                // Remove from both arrays first
                console.log('[SYNC] REMOVING from both arrays first...');
                const wasInSubscriptions = authoritative.subscriptions?.includes(subredditName);
                const wasInFilters = authoritative.filters?.includes(subredditName);
                console.log('[SYNC] - Was in subscriptions:', wasInSubscriptions);
                console.log('[SYNC] - Was in filters:', wasInFilters);

                authoritative.subscriptions = authoritative.subscriptions.filter(s => s !== subredditName);
                authoritative.filters = authoritative.filters.filter(s => s !== subredditName);

                console.log('[SYNC] AFTER REMOVAL:');
                console.log('[SYNC] - Subscriptions:', authoritative.subscriptions);
                console.log('[SYNC] - Filters:', authoritative.filters);

                // Add to appropriate array
                console.log('[SYNC] ADDING to appropriate array based on action:', action);
                if (action === 'subscribe') {
                    authoritative.subscriptions.push(subredditName);
                    console.log('[SYNC] - Added to subscriptions. New list:', authoritative.subscriptions);
                } else if (action === 'filter') {
                    authoritative.filters.push(subredditName);
                    console.log('[SYNC] - Added to filters. New list:', authoritative.filters);
                }

                console.log('[SYNC] FINAL RESULT:');
                console.log('[SYNC] - Final subscriptions:', authoritative.subscriptions);
                console.log('[SYNC] - Final filters:', authoritative.filters);
                console.log('[SYNC] === USER ACTION END ===');

                // Update timestamps - this creates new authoritative truth
                authoritative.timestamp = now;
                saveAuthoritativeSettings(authoritative);

                // Update current instance timestamp too (they're now in sync)
                GM_setValue(`instance_timestamp_${window.location.hostname}`, now);

                console.log('[SYNC] Authoritative settings updated:', {
                    action,
                    subreddit: subredditName,
                    newTimestamp: formatTimestamp(now),
                    totalSubscriptions: authoritative.subscriptions.length,
                    totalFilters: authoritative.filters.length
                });

                // Show notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                position: fixed;
top: 20px;
right: 20px;
background: var(--accent);
color: var(--foreground);
padding: 12px 20px;
border-radius: 6px;
z-index: 10000;
font-family: sans-serif;
font-size: 14px;
box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

                let actionText = '';
                if (action === 'subscribe') actionText = 'Subscribed to';
                else if (action === 'unsubscribe') actionText = 'Unsubscribed from';
                else if (action === 'filter') actionText = 'Filtered';
                else if (action === 'unfilter') actionText = 'Unfiltered';

                notification.textContent = `${actionText} r/${subredditName} (Authoritative)`;
                document.body.appendChild(notification);

                setTimeout(() => notification.remove(), 3000);

            } catch (e) {
                console.warn('[SYNC] Failed to handle user action:', e);
            }
        }

        function getCurrentSubredditName() {
            console.log('[SYNC] getCurrentSubredditName - pathname:', window.location.pathname);

            // Extract subreddit name from URL or page elements
            const pathMatch = window.location.pathname.match(/^\/r\/([^\/]+)/);
            if (pathMatch) {
                console.log('[SYNC] Found subreddit from URL:', pathMatch[1]);
                return pathMatch[1];
            }

            // Fallback: try to get from subreddit name element
            const nameElement = document.querySelector('#sub_name');
            if (nameElement) {
                const name = nameElement.textContent.replace(/^r\//, '');
                console.log('[SYNC] Found subreddit from element:', name);
                return name;
            }

            console.warn('[SYNC] Could not find subreddit name');
            return null;
        }

        // function updateNativeButtonState(button, action) {
        //     console.log('[SYNC] updateNativeButtonState called with:', { action, currentText: button.textContent, currentClass: button.className });
        //
        //     // Update button text and class based on action
        //     if (action === 'subscribe') {
        //         button.textContent = 'Unsubscribe';
        //         button.className = 'unsubscribe';
        //         // Update the form action if needed
        //         const form = button.closest('form');
        //         if (form) {
        //             const oldAction = form.action;
        //             form.action = form.action.replace('/subscribe', '/unsubscribe');
        //             console.log('[SYNC] Updated form action from', oldAction, 'to', form.action);
        //         }
        //     } else if (action === 'unsubscribe') {
        //         button.textContent = 'Subscribe';
        //         button.className = 'subscribe';
        //         const form = button.closest('form');
        //         if (form) {
        //             const oldAction = form.action;
        //             form.action = form.action.replace('/unsubscribe', '/subscribe');
        //             console.log('[SYNC] Updated form action from', oldAction, 'to', form.action);
        //         }
        //     } else if (action === 'filter') {
        //         button.textContent = 'Unfilter';
        //         button.className = 'unfilter';
        //         const form = button.closest('form');
        //         if (form) {
        //             const oldAction = form.action;
        //             form.action = form.action.replace('/filter', '/unfilter');
        //             console.log('[SYNC] Updated form action from', oldAction, 'to', form.action);
        //         }
        //     } else if (action === 'unfilter') {
        //         button.textContent = 'Filter';
        //         button.className = 'filter';
        //         const form = button.closest('form');
        //         if (form) {
        //             const oldAction = form.action;
        //             form.action = form.action.replace('/unfilter', '/filter');
        //             console.log('[SYNC] Updated form action from', oldAction, 'to', form.action);
        //         }
        //     }
        //
        //     console.log('[SYNC] Button updated - new text:', button.textContent, 'new class:', button.className);
        // }

        // Initialize the sync system
        async function init() {
            if (isInitialized) return;

            try {
                isInitialized = true;

                // Perform sync check
                await performSync();

                // Update sync status in settings if they're open
                setTimeout(() => {
                    if (typeof updateSyncStatus === 'function') {
                        updateSyncStatus();
                    }
                }, 100);

                // Listen for user actions including native redlib sidebar buttons
                document.addEventListener('click', function(e) {
                    console.log('[SYNC] Click detected on:', e.target, 'Classes:', e.target.className, 'ID:', e.target.id);

                    if (e.target.matches('.hover-follow-btn, .hover-unfollow-btn')) {
                        const subredditName = e.target.dataset.subreddit;
                        const action = e.target.classList.contains('hover-follow-btn') ? 'subscribe' : 'unsubscribe';
                        console.log('[SYNC] Hover button action:', { subredditName, action });
                        handleUserAction(subredditName, action);
                    } else if (e.target.matches('.hover-filter-btn, .hover-unfilter-btn')) {
                        const subredditName = e.target.dataset.subreddit;
                        const action = e.target.classList.contains('hover-filter-btn') ? 'filter' : 'unfilter';
                        console.log('[SYNC] Hover filter action:', { subredditName, action });
                        handleUserAction(subredditName, action);
                    } else if (e.target.matches('#sub_subscription button, #sub_filter button')) {
                        console.log('[SYNC] Native sidebar button clicked!', {
                            target: e.target,
                            parentId: e.target.parentElement?.id,
                            classes: e.target.className,
                            text: e.target.textContent
                        });

                        // DO NOT prevent default - let redlib handle the form submission and page refresh

                        const subredditName = getCurrentSubredditName();
                        console.log('[SYNC] Current subreddit name:', subredditName);

                        if (!subredditName) {
                            console.warn('[SYNC] Could not determine subreddit name');
                            return;
                        }

                        let action = '';
                        if (e.target.matches('#sub_subscription button')) {
                            action = e.target.classList.contains('unsubscribe') ? 'unsubscribe' : 'subscribe';
                        } else if (e.target.matches('#sub_filter button')) {
                            action = e.target.classList.contains('unfilter') ? 'unfilter' : 'filter';
                        }

                        console.log('[SYNC] Determined action:', action);

                        if (action) {
                            console.log('[SYNC] Calling handleUserAction with:', { subredditName, action });
                            handleUserAction(subredditName, action);
                            console.log('[SYNC] Decision saved to authority, allowing redlib to proceed with form submission');

                            // DO NOT update button state here - let redlib handle the refresh and show the new state
                        } else {
                            console.warn('[SYNC] Could not determine action from button');
                        }
                    }
                });

                console.log('[SYNC] Sync system initialized');
            } catch (e) {
                console.error('[SYNC] Failed to initialize sync system:', e);
                isInitialized = false; // Reset so it can be retried
            }
        }

        async function inheritFromInstance() {
            const instance = await extractInstanceSettings();
            const now = Date.now();

            const newAuthoritative = {
                ...instance, // Copy all instance settings
                overall_timestamp: now
            };

            saveAuthoritativeSettings(newAuthoritative);
            GM_setValue(`instance_timestamp_${window.location.hostname}`, now);

            // At the end of inheritFromInstance function
            console.log('[SYNC] Inherited from instance:', newAuthoritative);

            // Automatically refresh the settings overlay WITHOUT triggering another inherit
            setTimeout(() => {
                if (typeof refreshSettingsOverlay === 'function') {
                    refreshSettingsOverlay();
                }
            }, 100);

            // Get empty authoritative settings for comparison, but include current hidden posts count
            const emptyAuth = { hiddenPostsCount: 0 }; // Start with 0 hidden posts
            const instanceWithHidden = {
                ...instance,
                hiddenPostsCount: getAuthoritativeSettings().hiddenPostsCount || 0 // Keep current hidden posts
            };

            // Generate comprehensive summary comparing empty auth vs instance with hidden posts
            const changeSummary = generateChangeSummary([], 'inherit', emptyAuth, instanceWithHidden);

            if (changeSummary.details.length === 0) {
                alert('Inherited settings as authoritative, but no meaningful differences detected.');
            } else {
                const message = `Inherited as authoritative:\n${changeSummary.details.join('\n')}`;
                alert(message);
            }

            updateSyncStatus();

            // Update export string to reflect new authoritative settings
            if (typeof SettingsManager !== 'undefined' && SettingsManager.updateExportString) {
                SettingsManager.updateExportString();
            }
        }

        async function pushToInstance() {
            const authoritative = getAuthoritativeSettings();

            // Fix: Check for overall_timestamp, not just timestamp
            if (!authoritative.overall_timestamp && Object.keys(authoritative).length === 0) {
                alert('No authoritative settings found. Inherit from an instance first.');
                return;
            }

            console.log('[SYNC] Pushing authoritative to instance:', {
                settingsCount: Object.keys(authoritative).filter(key => !key.includes('timestamp')).length,
                authoritative: authoritative
            });

            const settingsUrl = generateSettingsUrl(authoritative);
            console.log('[SYNC] Generated push URL:', settingsUrl);

            // Show what's being pushed
            const notification = document.createElement('div');
            notification.style.cssText = `
        position: fixed;
top: 20px;
right: 20px;
background: var(--accent);
color: var(--foreground);
padding: 12px 20px;
border-radius: 6px;
z-index: 90000;
font-family: sans-serif;
font-size: 14px;
box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

            const settingsCount = Object.keys(authoritative).filter(key => !key.includes('timestamp')).length;
            notification.textContent = `Pushing ${settingsCount} authoritative settings to instance...`;
            document.body.appendChild(notification);

            console.log('[SYNC] Authority restore URL that will be submitted:', settingsUrl);

            try {
                // Submit the restore URL in the background
                const response = await fetch(settingsUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    }
                });

                console.log('[SYNC] Push submit response:', {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                    ok: response.ok
                });

                if (response.ok) {
                    notification.textContent = `Push completed successfully!`;
                    notification.style.background = '#28a745';

                    // Update instance timestamp to reflect the sync
                    const now = Date.now();
                    GM_setValue(`instance_timestamp_${window.location.hostname}`, now);

                    // Show success message, then reload to refresh cookie state
                    setTimeout(() => {
                        notification.textContent = `Reloading page to refresh settings...`;

                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }, 2000); // Show success for 2 seconds first

                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('[SYNC] Bulk push failed, falling back to one-by-one method:', error);

                // Update notification to show fallback
                notification.textContent = `Bulk push failed, trying one-by-one method...`;
                notification.style.background = '#ffc107';

                try {
                    // Fallback to one-by-one method
                    await fallbackToOneByOne(authoritative, notification);
                } catch (fallbackError) {
                    console.error('[SYNC] One-by-one fallback also failed:', fallbackError);
                    notification.textContent = `Both bulk and one-by-one push failed: ${fallbackError.message}`;
                    notification.style.background = '#dc3545';
                    setTimeout(() => notification.remove(), 5000);
                }
            }
        }

        // Update the old updateSyncStatus to use cache or refresh if needed
        async function updateSyncStatus(forceRefresh = false) {
            if (forceRefresh) {
                // Only fetch if explicitly requested (refresh button)
                console.log('[SYNC] Force refreshing sync status...');
                await performSync();
            } else {
                // Use cached data
                updateSyncStatusFromCache();
            }
            updateActionPreviews();
        }

        function updateSyncStatusFromCache() {
            const statusElement = document.getElementById('redlib-sync-status');
            const differencesContainer = document.getElementById('sync-differences-container');

            if (!statusElement || !cachedAuthoritative || !cachedInstance) {
                if (statusElement) statusElement.textContent = 'Sync data not available';
                if (differencesContainer) differencesContainer.style.display = 'none';
                return;
            }

            let status = '';
            let showDetailedDifferences = false;

            if (!cachedAuthoritative.overall_timestamp) {
                status = 'No authoritative settings. Use "Inherit" to set this instance as master.';
                if (differencesContainer) differencesContainer.style.display = 'none';
            } else {
                // Use the cached differences from performSync
                if (cachedSettingsDifferences && cachedSettingsDifferences.length > 0) {
                    const totalChanges = cachedSettingsDifferences.reduce((total, diff) => {
                        if (diff.type === 'array') {
                            return total + (diff.missingFromInstance?.length || 0) + (diff.extraInInstance?.length || 0);
                        }
                        return total + 1;
                    }, 0);

                    status = `❌ Out of sync in ${cachedSettingsDifferences.length} settings:\n`;
                    status += `Total changes needed: ${totalChanges}\n`;
                    status += `Last update: ${formatTimestamp(cachedAuthoritative.overall_timestamp)}`;

                    // Show detailed differences for subscriptions/filters
                    showDetailedDifferences = cachedSettingsDifferences.some(diff =>
                                                                             ['subscriptions', 'filters', 'followed_users', 'filtered_users'].includes(diff.setting)
                                                                            );

                    if (showDetailedDifferences && differencesContainer) {
                        createDetailedDifferencesTable();
                        differencesContainer.style.display = 'block';
                    } else if (differencesContainer) {
                        differencesContainer.style.display = 'none';
                    }
                } else {
                    status = `✅ In sync | Last update: ${formatTimestamp(cachedAuthoritative.overall_timestamp)}`;
                    if (differencesContainer) differencesContainer.style.display = 'none';
                }
            }

            statusElement.textContent = status;
        }

        function createDetailedDifferencesTable() {
            const tableContainer = document.getElementById('sync-differences-table');
            if (!tableContainer || !cachedSettingsDifferences) {
                console.log('[SYNC DEBUG] createDetailedDifferencesTable - missing container or data:', {
                    hasContainer: !!tableContainer,
                    hasCachedDiffs: !!cachedSettingsDifferences,
                    cachedDiffsLength: cachedSettingsDifferences ? cachedSettingsDifferences.length : 0
                });
                return;
            }

            // Filter for only array-type differences (subscriptions, filters, etc.)
            const arrayDifferences = cachedSettingsDifferences.filter(diff =>
                                                                      diff.type === 'array' && ['subscriptions', 'filters', 'followed_users', 'filtered_users'].includes(diff.setting)
                                                                     );

            if (arrayDifferences.length === 0) {
                tableContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text); opacity: 0.6;">No subscription/filter differences</div>';
                return;
            }

            // Create summary table with fixed column widths - matching the original structure
            let summaryHtml = '<div class="redlib-merge-summary" style="margin-bottom: 0;">';
            summaryHtml += '<table style="width: 100%; border-collapse: collapse; background: var(--post); border-radius: 4px 4px 0 0; overflow: hidden; font-family: monospace; font-size: 10px;">';
            summaryHtml += '<thead><tr>';
            summaryHtml += '<th style="background: var(--highlighted); color: var(--accent); padding: 8px; text-align: left; font-weight: bold; width: 33.33%;">Setting</th>';
            summaryHtml += '<th style="background: var(--highlighted); color: var(--accent); padding: 8px; text-align: center; font-weight: bold; width: 33.33%;">Merge into Script</th>';
            summaryHtml += '<th style="background: var(--highlighted); color: var(--accent); padding: 8px; text-align: center; font-weight: bold; width: 33.33%;">Push to Instance</th>';
            summaryHtml += '</tr></thead><tbody>';

            arrayDifferences.forEach(diff => {
                const authCount = (cachedAuthoritative[diff.setting] || []).length;
                const instCount = (cachedInstance[diff.setting] || []).length;
                const missingCount = diff.missingFromInstance?.length || 0;
                const extraCount = diff.extraInInstance?.length || 0;
                const settingName = diff.setting.replace('_', ' ');

                let inheritCell = '';
                let pushCell = '';

                if (extraCount > 0) {
                    inheritCell = `<div style="color: #4ecdc4; font-weight: bold;">${extraCount} items</div>`;
                    if (extraCount <= 3) {
                        inheritCell += `<div style="color: var(--text); opacity: 0.8; margin-top: 2px;">${diff.extraInInstance.join(', ')}</div>`;
                    } else {
                        const examples = diff.extraInInstance.slice(0, 2).join(', ');
                        inheritCell += `<div style="color: var(--text); opacity: 0.8; margin-top: 2px;">${examples}... (+${extraCount - 2} more)</div>`;
                    }
                }

                if (missingCount > 0) {
                    pushCell = `<div style="color: #ff6b6b; font-weight: bold;">${missingCount} items</div>`;
                    if (missingCount <= 3) {
                        pushCell += `<div style="color: var(--text); opacity: 0.8; margin-top: 2px;">${diff.missingFromInstance.join(', ')}</div>`;
                    } else {
                        const examples = diff.missingFromInstance.slice(0, 2).join(', ');
                        pushCell += `<div style="color: var(--text); opacity: 0.8; margin-top: 2px;">${examples}... (+${missingCount - 2} more)</div>`;
                    }
                }

                summaryHtml += `<tr>`;
                summaryHtml += `<td style="padding: 8px; background: var(--highlighted); color: var(--text); font-weight: bold; border-bottom: 1px solid var(--background); width: 33.33%;">`;
                // Calculate unique counts for better display
const totalUniqueItems = extraCount + missingCount;
const instanceUniqueItems = extraCount; // Items only in instance
const authorityUniqueItems = missingCount; // Items only in authority

// Create improved summary text
const uniqueCountText = totalUniqueItems > 0 ?
    `${totalUniqueItems} = ${instanceUniqueItems} + ${authorityUniqueItems} unique items` :
    `${instCount} vs ${authCount} items (all shared)`;

summaryHtml += `${settingName}<br><span style="font-size: 9px; opacity: 0.7;">${uniqueCountText}</span></td>`;                summaryHtml += `<td style="padding: 8px; text-align: center; vertical-align: top; border-bottom: 1px solid var(--background); width: 33.33%;">${inheritCell}</td>`;
                summaryHtml += `<td style="padding: 8px; text-align: center; vertical-align: top; border-bottom: 1px solid var(--background); width: 33.33%;">${pushCell}</td>`;
                summaryHtml += `</tr>`;
            });

            summaryHtml += '</tbody></table></div>';

            // Create detailed table with clickable subreddit links that work with existing hover popup
            // Create detailed table with clickable subreddit links that work with existing hover popup
let tableHtml = `<table class="redlib-sync-differences-table" style="margin-top: 0; border-top: none; border-radius: 0 0 4px 4px;"><thead><tr><th style="width: 33.33%;">Setting</th><th style="width: 66.66%;">Side-by-Side Comparison</th></tr></thead><tbody>`;
            arrayDifferences.forEach(diff => {
                const settingName = diff.setting.replace('_', ' ');
                const isSubscriptionsOrFilters = diff.setting === 'subscriptions' || diff.setting === 'filters';

const instanceArray = (cachedInstance[diff.setting] || []).slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
const authArray = (cachedAuthoritative[diff.setting] || []).slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

                let contentHtml = '';

                if (instanceArray.length > 0 || authArray.length > 0) {
                    // Get all unique items from both sides, sorted
                    const allItems = [...new Set([...instanceArray, ...authArray])].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
                    // Build rows for each item with proper hover-enabled links and filter classes
                    const itemRows = allItems.map(item => {
                        const inInstance = instanceArray.includes(item);
                        const inAuth = authArray.includes(item);

                        let instanceCell = '';
                        let authCell = '';
                        let rowClass = '';

                        // Determine row type for filtering
                        if (inInstance && inAuth) {
                            rowClass = 'filter-shared';
                        } else if (inInstance && !inAuth) {
                            rowClass = 'filter-instance-only';
                        } else if (!inInstance && inAuth) {
                            rowClass = 'filter-authority-only';
                        }

                        // Create the subreddit link with proper classes for existing hover system
                        const linkPath = diff.setting === 'subscriptions' ? `/r/${item}` :
                        diff.setting === 'filters' ? `/r/${item}` :
                        diff.setting === 'followed_users' ? `/u/${item}` :
                        diff.setting === 'filtered_users' ? `/u/${item}` : `/r/${item}`;

                        // Check if item is shared (in both columns)
                        const isShared = inInstance && inAuth;
                        const sharedColor = isShared ? 'var(--text); opacity: 0.7' : '';

                        if (inInstance) {
                            if (isShared) {
                                instanceCell = `<a href="${linkPath}" class="redlib-subreddit-link" style="color: ${sharedColor}; text-decoration: none;">${item}</a>`;
                            } else {
                                instanceCell = `<a href="${linkPath}" class="redlib-subreddit-link" style="color: #4ecdc4; text-decoration: none;">${item}</a>`;
                            }
                        } else {
                            instanceCell = `<span style="color: var(--text); opacity: 0.3;">-</span>`;
                        }

                        if (inAuth) {
                            if (isShared) {
                                authCell = `<a href="${linkPath}" class="redlib-subreddit-link" style="color: ${sharedColor}; text-decoration: none;">${item}</a>`;
                            } else {
                                authCell = `<a href="${linkPath}" class="redlib-subreddit-link" style="color: #ff6b6b; text-decoration: none;">${item}</a>`;
                            }
                        } else {
                            authCell = `<span style="color: var(--text); opacity: 0.3;">-</span>`;
                        }

                        return `<tr class="item-row ${rowClass}" data-setting="${diff.setting}"><td style="padding: 2px 8px; text-align: center; background: var(--post); width: 50%; font-weight: normal !important;">${authCell}</td><td style="padding: 2px 8px; text-align: center; background: var(--post); width: 50%; font-weight: normal !important;">${instanceCell}</td></tr>`;
                    }).join('');

                    // Calculate summary stats
                    const instanceUnique = instanceArray.filter(item => !authArray.includes(item)).length;
                    const authUnique = authArray.filter(item => !instanceArray.includes(item)).length;
                    const shared = instanceArray.filter(item => authArray.includes(item)).length;

                    // Build the summary and detailed table with clickable filter
                    const filterId = `filter-${diff.setting}`;
                    const summaryRow = `
                                    <tr style="background: var(--highlighted); font-weight: bold;">
                                        <td colspan="2" style="padding: 8px; text-align: center;">
                                            <span class="summary-filter-toggle" data-setting="${diff.setting}" data-filter="all" style="cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background-color 0.2s;" title="Click to cycle through filters">
                                                <span style="color: #ff6b6b;">${authUnique} script-only</span> •
                                                <span style="color: var(--text); opacity: 0.7;">${shared} shared</span> •
                                                <span style="color: #4ecdc4;">${instanceUnique} instance-only</span>
                                            </span>
                                            <br><small style="opacity: 0.7;">Total: ${authArray.length} script, ${instanceArray.length} instance</small>
                                        </td>
                                    </tr>
                                `;

                    const collapsibleId = `collapse-${diff.setting}`;
                    const itemTableId = `item-table-${diff.setting}`;

                    contentHtml = `
                            <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
                                <thead>
                                    <tr style="background: var(--post);">
                                        <th style="padding: 4px 8px; text-align: center; font-size: 10px; color: #ff6b6b; background: var(--post); width: 50%;">Script</th>
                                        <th style="padding: 4px 8px; text-align: center; font-size: 10px; color: #4ecdc4; background: var(--post); width: 50%;">Instance</th>
                                    </tr>
                                </thead>
                                <tbody id="${itemTableId}">
                                    ${summaryRow}
                                    ${itemRows}
                                </tbody>
                            </table>
                        `;
                }

                // Add clickable header with expand/collapse for subscriptions and filters
                let settingHeader = settingName;
                if (isSubscriptionsOrFilters) {
                    const collapsibleId = `collapse-${diff.setting}`;
settingHeader = `<span class="setting-collapse-toggle" data-target="${collapsibleId}" style="cursor: pointer; user-select: none;">
    <span class="collapse-icon" style="display: inline-block; width: 12px;">▶</span> ${settingName}
</span>`;
                }

                // Start with collapsed state - show placeholder text
const placeholderText = `<div style="text-align: center; padding: 20px; color: var(--text); opacity: 0.6; font-style: italic;">Click "${settingName}" on the left to expand the side-by-side comparison</div>`;
tableHtml += `<tr><td style="vertical-align: top; padding: 8px; font-weight: bold; width: 33.33%;">${settingHeader}</td><td style="padding: 4px; width: 66.66%;" id="collapse-${diff.setting}" data-collapsed="true" data-content="${encodeURIComponent(contentHtml)}">${placeholderText}</td></tr>`;            });

            tableHtml += `</tbody></table>`;

            // Combine summary and detailed table
            tableContainer.innerHTML = summaryHtml + tableHtml;

            // Add expand/collapse functionality
            addExpandCollapseListeners();

            // Add live update functionality and fix z-index issues
            addLiveDiffTableListeners();
            fixHoverPopupZIndex();
        }

// Add expand/collapse functionality and filter cycling for settings table
function addExpandCollapseListeners() {
    // Handle expand/collapse toggles
    const toggles = document.querySelectorAll('.setting-collapse-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);
            const icon = this.querySelector('.collapse-icon');

            if (!targetElement || !icon) return;

            const isCollapsed = targetElement.dataset.collapsed === 'true';

            if (isCollapsed) {
                // EXPAND: Show the actual content
                const contentHtml = decodeURIComponent(targetElement.dataset.content || '');
                targetElement.innerHTML = contentHtml;
                targetElement.dataset.collapsed = 'false';
                icon.textContent = '▼';

                // Re-add filter cycling listeners for this expanded section
                addFilterCyclingForSection(targetId);
            } else {
// COLLAPSE: Show placeholder text
const settingName = this.textContent.replace(/^[▼▶]\s*/, '').trim();
const placeholderText = `<div style="text-align: center; padding: 20px; color: var(--text); opacity: 0.6; font-style: italic;">Click "${settingName}" on the left to expand the side-by-side comparison</div>`;
                targetElement.innerHTML = placeholderText;
                targetElement.dataset.collapsed = 'true';
                icon.textContent = '▶';
            }
        });
    });
}
// Helper function to add filter cycling to a specific expanded section
function addFilterCyclingForSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Add filter cycling functionality for summary filter toggles in this section
    const filterToggles = section.querySelectorAll('.summary-filter-toggle');
    filterToggles.forEach(filterToggle => {
        filterToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const setting = this.dataset.setting;
            const currentFilter = this.dataset.filter;

            // Cycle through filters: all -> script-only -> shared -> instance-only -> all
            const nextFilter = {
                'all': 'script-only',
                'script-only': 'shared',
                'shared': 'instance-only',
                'instance-only': 'all'
            }[currentFilter];

            this.dataset.filter = nextFilter;

            // Apply the filter to the table rows
            const tableId = `item-table-${setting}`;
            const table = document.getElementById(tableId);
            if (table) {
                const rows = table.querySelectorAll('tr');

                rows.forEach(row => {
                    if (row.classList.contains('filter-shared') ||
                        row.classList.contains('filter-instance-only') ||
                        row.classList.contains('filter-authority-only')) {

                        switch(nextFilter) {
                            case 'all':
                                row.style.display = '';
                                break;
                            case 'script-only':
                                row.style.display = row.classList.contains('filter-authority-only') ? '' : 'none';
                                break;
                            case 'shared':
                                row.style.display = row.classList.contains('filter-shared') ? '' : 'none';
                                break;
                            case 'instance-only':
                                row.style.display = row.classList.contains('filter-instance-only') ? '' : 'none';
                                break;
                        }
                    }
                });
            }

// Update visual indication - highlight only the active filter type
const allSpans = this.querySelectorAll('span');
let scriptSpan = null;
let sharedSpan = null;
let instanceSpan = null;

// Find spans by their text content instead of style attributes
allSpans.forEach(span => {
    const text = span.textContent.trim();
    if (text.includes('script-only')) {
        scriptSpan = span;
    } else if (text.includes('shared')) {
        sharedSpan = span;
    } else if (text.includes('instance-only')) {
        instanceSpan = span;
    }
});

// Reset ALL span backgrounds
allSpans.forEach(span => {
    span.style.backgroundColor = 'transparent';
});
this.style.backgroundColor = 'transparent';
this.style.color = 'var(--text)';

// Highlight only the active filter
switch(nextFilter) {
    case 'script-only':
        if (scriptSpan) scriptSpan.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
        break;
    case 'shared':
        if (sharedSpan) sharedSpan.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        break;
    case 'instance-only':
        if (instanceSpan) instanceSpan.style.backgroundColor = 'rgba(78, 205, 196, 0.3)';
        break;
    case 'all':
        // No highlighting for "all" - already reset above
        break;
}
        });
    });
}
        // Apply row filtering based on selected filter type
        function applyRowFilter(setting, filterType) {
            const rows = document.querySelectorAll(`.item-row[data-setting="${setting}"]`);

            rows.forEach(row => {
                let shouldShow = true;

                switch (filterType) {
                    case 'instance-only':
                        shouldShow = row.classList.contains('filter-instance-only');
                        break;
                    case 'shared':
                        shouldShow = row.classList.contains('filter-shared');
                        break;
                    case 'authority-only':
                        shouldShow = row.classList.contains('filter-authority-only');
                        break;
                    case 'all':
                        shouldShow = true;
                        break;
                }

                row.style.display = shouldShow ? '' : 'none';
            });
        }

        // Update the visual style of the filter toggle
        function updateFilterToggleStyle(toggle, filterType) {
            const spans = toggle.querySelectorAll('span');

            // Reset all spans to normal style
            spans.forEach(span => {
                span.style.fontWeight = 'normal';
                span.style.backgroundColor = 'transparent';
                span.style.padding = '0';
                span.style.borderRadius = '0';
            });

            // Apply highlighting based on active filter
            switch (filterType) {
                case 'instance-only':
                    // Highlight the instance-only span (now the third span)
                    const instanceSpan = spans[2];
                    if (instanceSpan) {
                        instanceSpan.style.fontWeight = 'bold';
                        instanceSpan.style.backgroundColor = 'rgba(78, 205, 196, 0.2)';
                        instanceSpan.style.padding = '2px 4px';
                        instanceSpan.style.borderRadius = '3px';
                    }
                    break;
                case 'shared':
                    // Highlight the shared span (still middle span)
                    const sharedSpan = spans[1];
                    if (sharedSpan) {
                        sharedSpan.style.fontWeight = 'bold';
                        sharedSpan.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        sharedSpan.style.padding = '2px 4px';
                        sharedSpan.style.borderRadius = '3px';
                    }
                    break;
                case 'authority-only':
                    // Highlight the authority-only span (now the first span)
                    const authSpan = spans[0];
                    if (authSpan) {
                        authSpan.style.fontWeight = 'bold';
                        authSpan.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
                        authSpan.style.padding = '2px 4px';
                        authSpan.style.borderRadius = '3px';
                    }
                    break;
                case 'all':
                    // Highlight the entire toggle to show all items are visible
                    toggle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    setTimeout(() => {
                        toggle.style.backgroundColor = 'transparent';
                    }, 200);
                    break;
            }
        }

        // Fix z-index issues for hover popup in settings overlay
        function fixHoverPopupZIndex() {
            // Find the settings overlay and adjust z-index hierarchy
            const settingsOverlay = document.querySelector('.redlib-settings-overlay');
            if (settingsOverlay) {
                // Ensure settings overlay has a lower z-index than hover popup
                settingsOverlay.style.zIndex = '9998';
            }

            // Ensure any existing hover popups have higher z-index
            const existingPopups = document.querySelectorAll('.popup, .redlib-popup, [class*="popup"]');
            existingPopups.forEach(popup => {
                popup.style.zIndex = '10000';
            });

            // Set up mutation observer to catch new hover popups and fix their z-index
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            // Check if it's a popup or contains one
                            if (node.classList?.contains('popup') || node.querySelector?.('.popup')) {
                                const popup = node.classList?.contains('popup') ? node : node.querySelector('.popup');
                                if (popup) {
                                    popup.style.zIndex = '10000';
                                }
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }

        // Add event listeners for live diff table updates
        function addLiveDiffTableListeners() {
            // Listen for popup button clicks specifically
            document.addEventListener('click', function(e) {
                // Check if it's a popup button click within our diff table area
                if (e.target.matches('.popup-btn') && e.target.dataset.subreddit) {
                    const subreddit = e.target.dataset.subreddit;
                    const action = e.target.dataset.action;

                    console.log('[DIFF TABLE] Popup button clicked:', { subreddit, action });

                    // Set up a listener for when the action completes
                    setTimeout(() => {
                        checkForSubredditChange(subreddit, action);
                    }, 1000); // Give time for the server request to complete
                }
            });

            // Also listen for the specific sync system events
            document.addEventListener('click', function(e) {
                if (e.target.matches('.hover-follow-btn, .hover-unfollow-btn, .hover-filter-btn, .hover-unfilter-btn')) {
                    const subreddit = e.target.dataset.subreddit;
                    let action = '';

                    if (e.target.classList.contains('hover-follow-btn')) action = 'subscribe';
                    else if (e.target.classList.contains('hover-unfollow-btn')) action = 'unsubscribe';
                    else if (e.target.classList.contains('hover-filter-btn')) action = 'filter';
                    else if (e.target.classList.contains('hover-unfilter-btn')) action = 'unfilter';

                    console.log('[DIFF TABLE] Hover button clicked:', { subreddit, action });

                    setTimeout(() => {
                        checkForSubredditChange(subreddit, action);
                    }, 1000);
                }
            });
        }

        // Check if a subreddit's subscription/filter status changed and update the diff table
        async function checkForSubredditChange(subreddit, action) {
            console.log('[DIFF TABLE] Checking for changes to:', subreddit, action);

            try {
                // Make a request to the subreddit page to check current status
                const response = await fetch(`/r/${subreddit}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html'
                    }
                });

                if (!response.ok) {
                    console.log('[DIFF TABLE] Failed to fetch subreddit page for status check');
                    return;
                }

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Check subscription status from the sidebar
                const subscribeBtn = doc.querySelector('#sub_subscription button');
                const filterBtn = doc.querySelector('#sub_filter button');

                let isSubscribed = false;
                let isFiltered = false;

                if (subscribeBtn) {
                    isSubscribed = subscribeBtn.classList.contains('unsubscribe');
                }

                if (filterBtn) {
                    isFiltered = filterBtn.classList.contains('unfilter');
                }

                console.log('[DIFF TABLE] Current status:', { subreddit, isSubscribed, isFiltered });

                // Update our cached data based on the current status
                if (action === 'subscribe' || action === 'unsubscribe') {
                    updateCachedSubscriptions(subreddit, isSubscribed);
                } else if (action === 'filter' || action === 'unfilter') {
                    updateCachedFilters(subreddit, isFiltered);
                }

                // Update all overlay components
                updateDiffTableSummary(); // This now updates everything

            } catch (error) {
                console.error('[DIFF TABLE] Error checking subreddit status:', error);
            }
        }

        // Update cached instance data when subscriptions change
        function updateCachedSubscriptions(subreddit, isSubscribed) {
            if (!cachedInstance) return;

            if (!cachedInstance.subscriptions) cachedInstance.subscriptions = [];

            const index = cachedInstance.subscriptions.indexOf(subreddit);

            if (isSubscribed && index === -1) {
                // Add subscription
                cachedInstance.subscriptions.push(subreddit);
                cachedInstance.subscriptions.sort();
                console.log('[DIFF TABLE] Added subscription:', subreddit);
            } else if (!isSubscribed && index !== -1) {
                // Remove subscription
                cachedInstance.subscriptions.splice(index, 1);
                console.log('[DIFF TABLE] Removed subscription:', subreddit);
            }
        }

        // Update cached instance data when filters change
        function updateCachedFilters(subreddit, isFiltered) {
            if (!cachedInstance) return;

            if (!cachedInstance.filters) cachedInstance.filters = [];

            const index = cachedInstance.filters.indexOf(subreddit);

            if (isFiltered && index === -1) {
                // Add filter
                cachedInstance.filters.push(subreddit);
                cachedInstance.filters.sort();
                console.log('[DIFF TABLE] Added filter:', subreddit);
            } else if (!isFiltered && index !== -1) {
                // Remove filter
                cachedInstance.filters.splice(index, 1);
                console.log('[DIFF TABLE] Removed filter:', subreddit);
            }
        }

        // Update a specific row in the diff table
        function updateDiffTableRow(subreddit, setting) {
            const tableRow = document.querySelector(`tr[data-setting="${setting}"][data-item="${subreddit}"]`);
            if (!tableRow) {
                console.log('[DIFF TABLE] Row not found for:', subreddit, setting);
                return;
            }

            const instanceArray = cachedInstance[setting] || [];
            const authArray = cachedAuthoritative[setting] || [];

            const inInstance = instanceArray.includes(subreddit);
            const inAuth = authArray.includes(subreddit);

            console.log('[DIFF TABLE] Updating row:', { subreddit, setting, inInstance, inAuth });

            // Determine the new status
            let newStatus = '';
            if (inInstance && inAuth) {
                newStatus = 'shared';
            } else if (inInstance && !inAuth) {
                newStatus = 'instance-only';
            } else if (!inInstance && inAuth) {
                newStatus = 'authority-only';
            } else {
                // Not in either - remove the row
                console.log('[DIFF TABLE] Removing row for:', subreddit);
                tableRow.remove();
                return;
            }

            // Update the row styling and links
            const instanceCell = tableRow.cells[0];
            const authCell = tableRow.cells[1];

            const linkPath = setting === 'subscriptions' ? `/r/${subreddit}` :
            setting === 'filters' ? `/r/${subreddit}` :
            setting === 'followed_users' ? `/u/${subreddit}` :
            setting === 'filtered_users' ? `/u/${subreddit}` : `/r/${subreddit}`;

            if (newStatus === 'shared') {
                instanceCell.innerHTML = `<a href="${linkPath}" style="color: var(--text); opacity: 0.7; text-decoration: none;" class="redlib-diff-link" data-setting="${setting}" data-item="${subreddit}" data-status="shared">${subreddit}</a>`;
                authCell.innerHTML = `<a href="${linkPath}" style="color: var(--text); opacity: 0.7; text-decoration: none;" class="redlib-diff-link" data-setting="${setting}" data-item="${subreddit}" data-status="shared">${subreddit}</a>`;
            } else if (newStatus === 'instance-only') {
                instanceCell.innerHTML = `<a href="${linkPath}" style="color: #4ecdc4; font-weight: bold; text-decoration: none;" class="redlib-diff-link" data-setting="${setting}" data-item="${subreddit}" data-status="instance-only">${subreddit}</a>`;
                authCell.innerHTML = `<span style="opacity: 0.3;">—</span>`;
            } else if (newStatus === 'authority-only') {
                instanceCell.innerHTML = `<span style="opacity: 0.3;">—</span>`;
                authCell.innerHTML = `<a href="${linkPath}" style="color: #ff6b6b; font-weight: bold; text-decoration: none;" class="redlib-diff-link" data-setting="${setting}" data-item="${subreddit}" data-status="authority-only">${subreddit}</a>`;
            }

            console.log('[DIFF TABLE] Updated row to status:', newStatus);
        }

        // Update the summary counts in the diff table
        function updateDiffTableSummary() {
            // Recalculate differences and update the summary table
            if (cachedInstance && cachedAuthoritative) {
                console.log('[DIFF TABLE] Refreshing summary counts and all overlay components');

                // Update sync status
                if (typeof updateSyncStatus === 'function') {
                    updateSyncStatus();
                }

                // Update the inherit/push comparison table
                if (typeof updateActionPreviews === 'function') {
                    updateActionPreviews();
                }

                // Trigger a refresh of the detailed diff table to update counts
                setTimeout(() => {
                    createDetailedDifferencesTable();
                }, 100);
            }
        }

        // Comprehensive function to refresh all parts of the settings overlay
        async function refreshSettingsOverlay() {
            console.log('[SYNC] Refreshing entire settings overlay...');

            try {
                // Re-fetch current instance and authoritative settings
                if (typeof extractInstanceSettings === 'function') {
                    cachedInstance = await extractInstanceSettings();
                }

                if (typeof getAuthoritativeSettings === 'function') {
                    cachedAuthoritative = getAuthoritativeSettings();
                }

                // Force a complete sync to recalculate differences
                await performSync();

                // Update sync status using the fresh data
                updateSyncStatusFromCache();

                // Update the inherit/push comparison table
                if (typeof updateActionPreviews === 'function') {
                    updateActionPreviews();
                }

                // Update the export string with current settings
                if (typeof SettingsManager !== 'undefined' && SettingsManager.updateExportString) {
                    SettingsManager.updateExportString();
                }

                console.log('[SYNC] Settings overlay refresh completed');
            } catch (error) {
                console.error('[SYNC] Error refreshing settings overlay:', error);
            }
        }

        // Convert string to Unicode representation using Base64 + Unicode mapping
        function stringToUnicode(str) {
            try {
                // First convert to base64 to handle all characters safely
                const base64 = btoa(unescape(encodeURIComponent(str)));

                // Then map each base64 character to a safe Unicode range
                let result = '';
                for (let i = 0; i < base64.length; i++) {
                    const char = base64.charCodeAt(i);
                    // Map to Cyrillic range which is copy/paste safe
                    result += String.fromCharCode(0x0400 + (char - 32));
                }
                return result;
            } catch (error) {
                console.error('[RES] String to Unicode conversion failed:', error);
                return '';
            }
        }

        function unicodeToString(unicode) {
            try {
                // First convert back from Unicode mapping to base64
                let base64 = '';
                for (let i = 0; i < unicode.length; i++) {
                    const unicodeChar = unicode.charCodeAt(i);
                    const originalChar = (unicodeChar - 0x0400) + 32;
                    base64 += String.fromCharCode(originalChar);
                }

                // Then decode from base64 to original string
                return decodeURIComponent(escape(atob(base64)));
            } catch (error) {
                console.error('[RES] Unicode to string conversion failed:', error);
                return '';
            }
        }

        // Simplified encode function
        function encodeRESSettings() {
            try {
                const settings = {
                    version: SCRIPT_VERSION,
                    timestamp: Date.now(),
                    settings: GM_getValue('redlib_settings', '{}'),
                    authoritative: GM_getValue('redlib_authoritative_settings', '{}'),
                    hiddenPosts: GM_getValue('redlib_collapsed_posts', '{}')
                };

                const jsonString = JSON.stringify(settings);
                return stringToUnicode(jsonString);
            } catch (error) {
                console.error('[RES] Failed to encode settings:', error);
                return 'Encoding failed - check console for details';
            }
        }

        // Simplified decode function with better error handling
        function decodeRESSettings(encodedString) {
            try {
                if (!encodedString || encodedString.trim() === '' || encodedString.includes('Encoding failed')) {
                    throw new Error('Invalid or empty encoded string');
                }

                const jsonString = unicodeToString(encodedString);

                if (!jsonString || jsonString.length < 10) {
                    throw new Error('Decoded string is too short or empty');
                }

                const parsed = JSON.parse(jsonString);

                // Validate the structure
                if (typeof parsed !== 'object' || !parsed.version) {
                    throw new Error('Invalid settings format - missing version');
                }

                return parsed;
            } catch (error) {
                console.error('[RES] Failed to decode settings:', error);
                console.error('[RES] Encoded string length:', encodedString ? encodedString.length : 'null');
                console.error('[RES] First 50 chars:', encodedString ? encodedString.substring(0, 50) : 'null');
                return null;
            }
        }

        function updateActionPreviews() {
            if (!cachedAuthoritative || !cachedInstance) return;

            // Update the unified comparison table
            const tableContainer = document.getElementById('sync-comparison-table');
            if (tableContainer) {
                const comparisonTable = createUnifiedSettingsTable(cachedInstance, cachedAuthoritative);
                tableContainer.innerHTML = comparisonTable;

                // Add header button listeners immediately after creating the table
                setTimeout(() => {
                    if (typeof SettingsManager !== 'undefined' && SettingsManager.addHeaderButtonListeners) {
                        SettingsManager.addHeaderButtonListeners();
                    } else {
                        console.warn('[SYNC] SettingsManager.addHeaderButtonListeners function not found');
                    }
                }, 50);
            }

            // ALWAYS update the detailed merge preview table
            const differencesContainer = document.getElementById('sync-differences-container');
            if (differencesContainer) {
                if (cachedSettingsDifferences && cachedSettingsDifferences.length > 0) {
                    const hasArrayDifferences = cachedSettingsDifferences.some(diff =>
                        diff.type === 'array' && ['subscriptions', 'filters', 'followed_users', 'filtered_users'].includes(diff.setting)
                    );

                    if (hasArrayDifferences) {
                        createDetailedDifferencesTable();
                        differencesContainer.style.display = 'block';
                    } else {
                        differencesContainer.style.display = 'none';
                    }
                } else {
                    differencesContainer.style.display = 'none';
                }
            }
        }

        // Update the detailed merge preview table
        const differencesContainer = document.getElementById('sync-differences-container');
        if (differencesContainer && cachedSettingsDifferences) {
            const hasArrayDifferences = cachedSettingsDifferences.some(diff =>
                                                                        diff.type === 'array' && ['subscriptions', 'filters', 'followed_users', 'filtered_users'].includes(diff.setting)
                                                                        );

            if (hasArrayDifferences) {
                createDetailedDifferencesTable();
                differencesContainer.style.display = 'block';
            } else {
                differencesContainer.style.display = 'none';
            }
        }

        async function mergeAndPushToInstance() {
            const authoritative = getAuthoritativeSettings();
            const instance = await extractInstanceSettings();
            const now = Date.now();

            console.log('[SYNC] Starting merge and push operation...');
            console.log('[SYNC] Current authoritative:', authoritative);
            console.log('[SYNC] Current instance:', instance);

            // Create merged authoritative settings
            const mergedAuthoritative = { ...authoritative };
            let changesMade = false;

            // Find settings that need merging
            Object.keys(instance).forEach(setting => {
                const authValue = authoritative[setting];
                const instanceValue = instance[setting];

                if (Array.isArray(instanceValue) && Array.isArray(authValue)) {
                    // Handle arrays (existing logic)
                    const authArray = authValue || [];
                    const extraInInstance = instanceValue.filter(item => !authArray.includes(item));

                    if (extraInInstance.length > 0) {
                        // Merge: add instance extras to authoritative
                        mergedAuthoritative[setting] = [...authArray, ...extraInInstance];
                        changesMade = true;
                    }
                } else if (authValue === undefined || authValue === null || authValue === '') {
                    // Handle simple values: only inherit if authority doesn't have the setting
                    if (instanceValue !== undefined && instanceValue !== null && instanceValue !== '') {
                        mergedAuthoritative[setting] = instanceValue;
                        changesMade = true;
                    }
                }
            });

            if (changesMade) {
                // Update authoritative with merged data
                mergedAuthoritative.overall_timestamp = now;
                saveAuthoritativeSettings(mergedAuthoritative);

                console.log('[SYNC] Updated authoritative with merged data');
            }

            // Now push the merged result to instance
            const settingsUrl = generateSettingsUrl(mergedAuthoritative);

            console.log('[SYNC] Merge queued - Authority restore URL that will be submitted:', settingsUrl);

            // Show notification about what's happening
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent);
                color: var(--foreground);
                padding: 12px 20px;
                border-radius: 6px;
                z-index: 90000;
                font-family: sans-serif;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            notification.textContent = `Submitting merge in background...`;
            document.body.appendChild(notification);

            try {
                // BACKUP current instance state before attempting bulk operation
                console.log('[SYNC] Backing up current instance state before bulk attempt...');
                const backupInstance = await extractInstanceSettings();
                const backupUrl = generateSettingsUrl(backupInstance);
                console.log('[SYNC] Instance backup created:', {
                    subscriptions: backupInstance.subscriptions?.length || 0,
                    filters: backupInstance.filters?.length || 0,
                    backupUrlLength: backupUrl.length
                });

                // Submit the restore URL in the background
                const response = await fetch(settingsUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    }
                });

                console.log('[SYNC] Merge submit response:', {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url,
                    ok: response.ok
                });

                if (response.ok) {
                    notification.textContent = `Merge completed successfully!`;
                    notification.style.background = '#28a745';

                    // Update instance timestamp to reflect the sync
                    GM_setValue(`instance_timestamp_${window.location.hostname}`, now);

                    // Show success message, then reload to refresh cookie state
                    setTimeout(() => {
                        notification.textContent = `Reloading page to refresh settings...`;

                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }, 2000); // Show success for 2 seconds first

                } else {
                    // RESTORE instance state since bulk failed
                    console.log('[SYNC] Bulk operation failed, restoring instance backup...');
                    notification.textContent = `Bulk failed, restoring original state...`;
                    notification.style.background = '#ffc107';

                    try {
                        const restoreResponse = await fetch(backupUrl, {
                            method: 'GET',
                            headers: {
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                            }
                        });

                        if (restoreResponse.ok) {
                            console.log('[SYNC] Instance backup restored successfully');
                            notification.textContent = `Original state restored, trying alternative method...`;
                        } else {
                            console.error('[SYNC] Failed to restore backup:', restoreResponse.status);
                            notification.textContent = `Backup restore failed, proceeding with caution...`;
                        }

                        // Small delay to let the restore settle
                        await new Promise(resolve => setTimeout(resolve, 1000));

                    } catch (restoreError) {
                        console.error('[SYNC] Error during backup restore:', restoreError);
                        notification.textContent = `Backup restore error, proceeding with fallback...`;
                    }

                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('[SYNC] Bulk merge failed, falling back to one-by-one method:', error);

                // Update notification to show fallback
                notification.textContent = `Bulk merge failed, trying one-by-one method...`;
                notification.style.background = '#ffc107';

                try {
                    // Fallback to one-by-one method using merged settings
                    await fallbackToOneByOne(mergedAuthoritative, notification);
                } catch (fallbackError) {
                    console.error('[SYNC] One-by-one fallback also failed:', fallbackError);
                    notification.textContent = `Both bulk and one-by-one merge failed: ${fallbackError.message}`;
                    notification.style.background = '#dc3545';
                    setTimeout(() => notification.remove(), 5000);
                }
            }
        }

        // Enhanced progressive fallback method with multiple tiers
        async function fallbackToOneByOne(targetSettings, notification) {
            console.log('[SYNC] Starting progressive fallback method');

    // BACKUP original instance before ANY tier attempts
    console.log('[SYNC] Creating master backup before all tier attempts...');
    const masterBackup = await extractInstanceSettings();
    const masterBackupUrl = generateSettingsUrl(masterBackup);
    console.log('[SYNC] Master backup created:', {
        subscriptions: masterBackup.subscriptions?.length || 0,
        filters: masterBackup.filters?.length || 0
    });

            // Tier 2: Try without subscriptions (settings + filters only)
            try {
                notification.textContent = `Tier 2: Trying settings + filters only...`;
                notification.style.background = '#ffc107';

                const settingsOnlyUrl = generateSettingsUrl({
                    ...targetSettings,
                    subscriptions: [] // Remove subscriptions
                });

                const response = await fetch(settingsOnlyUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    }
                });

                if (response.ok) {
                    console.log('[SYNC] Tier 2 successful - settings + filters worked');

// Now handle subscriptions progressively if needed
if (targetSettings.subscriptions && targetSettings.subscriptions.length > 0) {
    await handleSubscriptionsProgressive(targetSettings.subscriptions, notification);
} else {
                        notification.textContent = `Tier 2 completed successfully!`;
                        notification.style.background = '#28a745';
                        GM_setValue(`instance_timestamp_${window.location.hostname}`, Date.now());
                        setTimeout(() => {
                            notification.textContent = `Reloading page to refresh settings...`;
                            setTimeout(() => window.location.reload(), 1000);
                        }, 2000);
                    }
                    return;
} else {
    // RESTORE master backup since Tier 2 failed
    console.log('[SYNC] Tier 2 failed, restoring master backup...');
    await fetch(masterBackupUrl, { method: 'GET' });
    await new Promise(resolve => setTimeout(resolve, 1000));
}
            } catch (error) {
                console.log('[SYNC] Tier 2 failed:', error);
            }

            // Tier 3-4: Progressive filter reduction
            await progressiveFilterReduction(targetSettings, notification, masterBackupUrl);
        }

        // Handle progressive filter reduction (Tiers 3-4)
        async function progressiveFilterReduction(targetSettings, notification, masterBackupUrl) {
            console.log('[SYNC] Starting progressive filter reduction');

            if (!targetSettings.filters || targetSettings.filters.length === 0) {
                // No filters to reduce, go straight to one-by-one
                await finalOneByOneMethod(targetSettings, notification);
                return;
            }

            let remainingFilters = [...targetSettings.filters];
            let removedFilters = [];
            let tierNumber = 3;

            while (remainingFilters.length > 0) {
                notification.textContent = `Tier ${tierNumber}: Trying with ${remainingFilters.length} filters...`;

                // Randomly remove 30-50% of remaining filters
                const removeCount = Math.max(1, Math.floor(remainingFilters.length * (0.3 + Math.random() * 0.2)));
                const toRemove = [];

                for (let i = 0; i < removeCount && remainingFilters.length > 0; i++) {
                    const randomIndex = Math.floor(Math.random() * remainingFilters.length);
                    toRemove.push(remainingFilters.splice(randomIndex, 1)[0]);
                }

                removedFilters.push(...toRemove);
                console.log(`[SYNC] Tier ${tierNumber}: Removed ${toRemove.length} filters, ${remainingFilters.length} remaining`);

                try {
                    const reducedSettingsUrl = generateSettingsUrl({
                        ...targetSettings,
                        filters: remainingFilters,
                        subscriptions: [] // Keep subscriptions empty for these tiers
                    });

                    const response = await fetch(reducedSettingsUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                        }
                    });

                    if (response.ok) {
                        console.log(`[SYNC] Tier ${tierNumber} successful with ${remainingFilters.length} filters`);

                        // Now handle the removed filters and subscriptions one-by-one
                        await handleRemainingItemsOneByOne(removedFilters, targetSettings.subscriptions || [], notification);
                        return;
} else {
    // RESTORE master backup since this tier failed
    console.log(`[SYNC] Tier ${tierNumber} failed, restoring master backup...`);
    await fetch(masterBackupUrl, { method: 'GET' });
    await new Promise(resolve => setTimeout(resolve, 500));
}
                } catch (error) {
                    console.log(`[SYNC] Tier ${tierNumber} failed:`, error);
                }

                tierNumber++;

                // Safety break - if we've tried too many tiers, go to one-by-one
                if (tierNumber > 10) {
                    console.log('[SYNC] Too many tier attempts, going to final one-by-one method');
                    break;
                }
            }

            // All tiers failed, go to final one-by-one method
            await finalOneByOneMethod(targetSettings, notification);
        }

        // Handle remaining filters and subscriptions one-by-one (Tier 5)
        async function handleRemainingItemsOneByOne(remainingFilters, targetSubscriptions, notification) {
            console.log('[SYNC] Tier 5: Processing remaining items one-by-one');

            // Get current instance to calculate subscription differences
            const instance = await extractInstanceSettings();
            const instanceSubs = instance.subscriptions || [];

            // Only process subscriptions that are missing from instance
            const missingSubs = targetSubscriptions.filter(sub => !instanceSubs.includes(sub));

            console.log(`[SYNC] Tier 5 differences: ${remainingFilters.length} filters, ${targetSubscriptions.length} total subs (${missingSubs.length} missing)`);

            const allItems = [
                ...remainingFilters.map(filter => ({ type: 'filter', action: 'filter', subreddit: filter, priority: 1 })),
                ...missingSubs.map(sub => ({ type: 'subscription', action: 'subscribe', subreddit: sub, priority: 2 }))
            ];

            if (allItems.length === 0) {
                notification.textContent = `Progressive fallback completed - all items already match!`;
                notification.style.background = '#28a745';
                GM_setValue(`instance_timestamp_${window.location.hostname}`, Date.now());
                setTimeout(() => {
                    notification.textContent = `Reloading page to refresh settings...`;
                    setTimeout(() => window.location.reload(), 1000);
                }, 2000);
                return;
            }

            await processItemsOneByOne(allItems, notification, 'Progressive fallback');
        }

        // Handle subscriptions only one-by-one
        async function handleSubscriptionsOneByOne(targetSubscriptions, notification) {
            console.log('[SYNC] Processing subscriptions one-by-one after successful settings+filters');

            // Get current instance to calculate differences
            const instance = await extractInstanceSettings();
            const instanceSubs = instance.subscriptions || [];

            // Only process subscriptions that are missing from instance
            const missingSubs = targetSubscriptions.filter(sub => !instanceSubs.includes(sub));

            console.log(`[SYNC] Subscription difference: ${targetSubscriptions.length} total, ${instanceSubs.length} in instance, ${missingSubs.length} missing`);

            if (missingSubs.length === 0) {
                notification.textContent = `All subscriptions already match - no changes needed`;
                notification.style.background = '#28a745';
                GM_setValue(`instance_timestamp_${window.location.hostname}`, Date.now());
                setTimeout(() => {
                    notification.textContent = `Reloading page to refresh settings...`;
                    setTimeout(() => window.location.reload(), 1000);
                }, 2000);
                return;
            }

            const subItems = missingSubs.map(sub => ({
                type: 'subscription',
                action: 'subscribe',
                subreddit: sub,
                priority: 1
            }));

            await processItemsOneByOne(subItems, notification, 'Subscription processing');
        }

// Progressive subscription processing with multireddit support
async function handleSubscriptionsProgressive(targetSubscriptions, notification) {
    console.log('[SYNC] Starting progressive subscription processing');

    const instance = await extractInstanceSettings();
    const instanceSubs = instance.subscriptions || [];
    const missingSubs = targetSubscriptions.filter(sub => !instanceSubs.includes(sub));

    console.log(`[SYNC] Progressive subscriptions: ${missingSubs.length} missing subscriptions to process`);

    if (missingSubs.length === 0) {
        notification.textContent = `All subscriptions already match`;
        notification.style.background = '#28a745';
        return;
    }

    let remainingSubs = [...missingSubs];

    // Step 1: Try bulk subscription fallback (progressive size reduction)
    let tierNumber = 1;
    while (remainingSubs.length > 50) { // Only try bulk if substantial number
        notification.textContent = `Subscription Tier ${tierNumber}: Trying ${remainingSubs.length} subscriptions...`;

        try {
            const subscriptionOnlyUrl = generateSettingsUrl({
                ...await extractInstanceSettings(), // Keep current settings
                subscriptions: remainingSubs.slice(0, Math.floor(remainingSubs.length * 0.7)) // Try 70% of remaining
            });

            const response = await fetch(subscriptionOnlyUrl, {
                method: 'GET',
                headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' }
            });

            if (response.ok) {
                const processed = Math.floor(remainingSubs.length * 0.7);
                remainingSubs = remainingSubs.slice(processed);
                console.log(`[SYNC] Subscription Tier ${tierNumber} successful, ${remainingSubs.length} remaining`);
                break;
            }
        } catch (error) {
            console.log(`[SYNC] Subscription Tier ${tierNumber} failed:`, error);
        }

        // Reduce size for next tier
        remainingSubs = remainingSubs.slice(0, Math.floor(remainingSubs.length * 0.8));
        tierNumber++;

        if (tierNumber > 5) break; // Safety limit
    }

    // Step 2: Multireddit batch processing
    if (remainingSubs.length > 5) {
        notification.textContent = `Processing ${remainingSubs.length} subscriptions via multireddit batches...`;

        const multiredditResult = await executeMultiredditAction(remainingSubs, 'subscribe', 15);
        remainingSubs = multiredditResult.failed;

        console.log(`[SYNC] Multireddit subscriptions: ${multiredditResult.successful.length} successful, ${remainingSubs.length} remaining`);
    }

    // Step 3: Parallelized one-by-one for remaining
    if (remainingSubs.length > 0) {
        const subItems = remainingSubs.map(sub => ({
            type: 'subscription',
            action: 'subscribe',
            subreddit: sub,
            priority: 1
        }));

        await processItemsOneByOne(subItems, notification, 'Final subscription processing', 3);
    }
}

        // Final fallback method when all tiers fail (Tier 6)
        async function finalOneByOneMethod(targetSettings, notification) {
            console.log('[SYNC] Tier 6: Final one-by-one method - all bulk attempts failed');

            const instance = await extractInstanceSettings();
            const operations = [];

            console.log('[SYNC] Calculating differences:', {
                targetSubs: targetSettings.subscriptions?.length || 0,
                instanceSubs: instance.subscriptions?.length || 0,
                targetFilters: targetSettings.filters?.length || 0,
                instanceFilters: instance.filters?.length || 0
            });

            // Priority 1: Filters (as requested)
            if (targetSettings.filters && instance.filters) {
                const targetFilters = targetSettings.filters || [];
                const instanceFilters = instance.filters || [];

                // Filters to add
                targetFilters.forEach(filter => {
                    if (!instanceFilters.includes(filter)) {
                        operations.push({
                            type: 'filter',
                            action: 'filter',
                            subreddit: filter,
                            priority: 1
                        });
                    }
                });

                // Filters to remove (lower priority)
                instanceFilters.forEach(filter => {
                    if (!targetFilters.includes(filter)) {
                        operations.push({
                            type: 'filter',
                            action: 'unfilter',
                            subreddit: filter,
                            priority: 3
                        });
                    }
                });
            }

            // Priority 2: Subscriptions
            if (targetSettings.subscriptions && instance.subscriptions) {
                const targetSubs = targetSettings.subscriptions || [];
                const instanceSubs = instance.subscriptions || [];

                // Subscriptions to add
                targetSubs.forEach(sub => {
                    if (!instanceSubs.includes(sub)) {
                        operations.push({
                            type: 'subscription',
                            action: 'subscribe',
                            subreddit: sub,
                            priority: 2
                        });
                    }
                });

                // Subscriptions to remove (lower priority)
                instanceSubs.forEach(sub => {
                    if (!targetSubs.includes(sub)) {
                        operations.push({
                            type: 'subscription',
                            action: 'unsubscribe',
                            subreddit: sub,
                            priority: 4
                        });
                    }
                });
            }

            // Sort by priority (filters first, then subscriptions)
            operations.sort((a, b) => a.priority - b.priority);

            await processItemsOneByOne(operations, notification, 'Final one-by-one');
        }

// Core one-by-one processing with enhanced error detection
async function processItemsOneByOne(operations, notification, context) {
    console.log(`[SYNC] ${context}: Processing ${operations.length} operations`);

    if (operations.length === 0) {
        notification.textContent = `${context} completed - no operations needed`;
        notification.style.background = '#28a745';
        GM_setValue(`instance_timestamp_${window.location.hostname}`, Date.now());
        setTimeout(() => {
            notification.textContent = `Reloading page to refresh settings...`;
            setTimeout(() => window.location.reload(), 1000);
        }, 2000);
        return;
    }

    let completed = 0;
    let failed = 0;
    let bannedSubreddits = [];
    let privateSubreddits = [];
    let notFoundSubreddits = [];
    let otherErrors = [];

    for (const operation of operations) {
        try {
            notification.textContent = `${context}: ${operation.subreddit} (${completed + 1}/${operations.length})`;

            await executeSubredditActionWithErrorDetection(operation.subreddit, operation.action);
            completed++;
            console.log(`[SYNC] Success: ${operation.action} ${operation.subreddit}`);

            // Small delay to prevent overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error) {
            failed++;
            console.error(`[SYNC] Failed: ${operation.action} ${operation.subreddit}:`, error);

            // Categorize errors for better reporting
            const errorMessage = error.message.toLowerCase();
            if (errorMessage.includes('banned') || errorMessage.includes('ban')) {
                bannedSubreddits.push(operation.subreddit);
            } else if (errorMessage.includes('private')) {
                privateSubreddits.push(operation.subreddit);
            } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
                notFoundSubreddits.push(operation.subreddit);
            } else {
                otherErrors.push({ subreddit: operation.subreddit, error: error.message });
            }
        }
    }

    // Final status report
    const successRate = operations.length > 0 ? Math.round((completed / operations.length) * 100) : 100;

    if (failed === 0) {
        notification.textContent = `${context} completed: ${completed}/${operations.length} successful (${successRate}%)`;
        notification.style.background = '#28a745';
    } else {
        const errorSummary = [];
        if (bannedSubreddits.length > 0) errorSummary.push(`${bannedSubreddits.length} banned`);
        if (privateSubreddits.length > 0) errorSummary.push(`${privateSubreddits.length} private`);
        if (notFoundSubreddits.length > 0) errorSummary.push(`${notFoundSubreddits.length} not found`);
        if (otherErrors.length > 0) errorSummary.push(`${otherErrors.length} other errors`);

        notification.textContent = `${context} partial: ${completed}/${operations.length} (${successRate}%) - ${errorSummary.join(', ')}`;
        notification.style.background = completed > failed ? '#ffc107' : '#dc3545';
    }

    // Update timestamp if we made any progress
    if (completed > 0) {
        GM_setValue(`instance_timestamp_${window.location.hostname}`, Date.now());

        setTimeout(() => {
            notification.textContent = `Reloading page to refresh settings...`;
            setTimeout(() => window.location.reload(), 1000);
        }, completed === operations.length ? 2000 : 3000);
    } else {
        setTimeout(() => notification.remove(), 5000);
    }
}

// Helper function to categorize errors
function categorizeError(error, subreddit, results) {
    const errorMsg = error.message.toLowerCase();
    if (errorMsg.includes('banned from reddit')) {
        results.bannedSubreddits.push(subreddit);
        console.log(`[SYNC] BANNED: r/${subreddit} has been banned from Reddit`);
    } else if (errorMsg.includes('private community')) {
        results.privateSubreddits.push(subreddit);
        console.log(`[SYNC] PRIVATE: r/${subreddit} is a private community`);
    } else if (error.message.includes('HTTP 404')) {
        results.notFoundSubreddits.push(subreddit);
        console.log(`[SYNC] NOT FOUND: r/${subreddit} does not exist (404)`);
    } else {
        results.otherErrors.push({ subreddit, error: error.message });
        console.error(`[SYNC] ERROR: ${subreddit}:`, error);
    }
}

        // Enhanced executeSubredditAction with better error detection
        async function executeSubredditActionWithErrorDetection(subredditName, action) {
            const actionEndpoints = {
                'subscribe': `/r/${subredditName}/subscribe`,
                'unsubscribe': `/r/${subredditName}/unsubscribe`,
                'filter': `/r/${subredditName}/filter`,
                'unfilter': `/r/${subredditName}/unfilter`
            };

            const endpoint = actionEndpoints[action];
            if (!endpoint) {
                throw new Error(`Unknown action: ${action}`);
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            if (!response.ok) {
                // Try to get more specific error information
                let errorMessage = `HTTP ${response.status}`;

                try {
                    const responseText = await response.text();

                    // Check for specific error patterns in the response
                    if (responseText.includes('banned from Reddit')) {
                        errorMessage = `r/${subredditName} has been banned from Reddit`;
                    } else if (responseText.includes('private community')) {
                        errorMessage = `r/${subredditName} is a private community`;
                    } else if (response.status === 404) {
                        errorMessage = `HTTP 404 - r/${subredditName} not found`;
                    } else {
                        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                    }
                } catch (parseError) {
                    // If we can't parse the response, use the status code
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }

                throw new Error(errorMessage);
            }
        }

// Enhanced multireddit batch processing
async function executeMultiredditAction(subredditList, action, maxBatchSize = 20) {
    if (subredditList.length === 0) return { successful: [], failed: [] };

    const successful = [];
    const failed = [];

    // Process in batches to avoid URL length limits
    for (let i = 0; i < subredditList.length; i += maxBatchSize) {
        const batch = subredditList.slice(i, i + maxBatchSize);
        const multiredditName = batch.join('+');

        const actionEndpoints = {
            'subscribe': `/r/${multiredditName}/subscribe`,
            'unsubscribe': `/r/${multiredditName}/unsubscribe`,
            'filter': `/r/${multiredditName}/filter`,
            'unfilter': `/r/${multiredditName}/unfilter`
        };

        const endpoint = actionEndpoints[action];
        if (!endpoint) {
            failed.push(...batch);
            continue;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            if (response.ok) {
                successful.push(...batch);
                console.log(`[SYNC] Multireddit ${action} successful for ${batch.length} subreddits:`, batch.slice(0, 3).join(', '));
            } else {
                failed.push(...batch);
                console.log(`[SYNC] Multireddit ${action} failed for batch:`, batch.slice(0, 3).join(', '));
            }
        } catch (error) {
            failed.push(...batch);
            console.error(`[SYNC] Multireddit ${action} error:`, error);
        }

        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { successful, failed };
}

        async function selectivePushToInstance() {
            const authoritative = getAuthoritativeSettings();
            const instance = await extractInstanceSettings();
            const now = Date.now();

            console.log('[SYNC] Starting selective push operation...');

            const operations = [];

            // Find what needs to be pushed
            ['subscriptions', 'filters', 'followed_users', 'filtered_users'].forEach(setting => {
                if (Array.isArray(authoritative[setting]) && Array.isArray(instance[setting])) {
                    const authArray = authoritative[setting] || [];
                    const instanceArray = instance[setting] || [];

                    // Items to inherit from instance (not in authority)
                    const extraInInstance = instanceArray.filter(item => !authArray.includes(item));
                    extraInInstance.forEach(item => {
                        operations.push({
                            type: 'inherit',
                            setting: setting,
                            item: item,
                            action: getActionForSetting(setting, 'add')
                        });
                    });

                    // Items to push to instance (not in instance)
                    const missingFromInstance = authArray.filter(item => !instanceArray.includes(item));
                    missingFromInstance.forEach(item => {
                        operations.push({
                            type: 'push',
                            setting: setting,
                            item: item,
                            action: getActionForSetting(setting, 'add')
                        });
                    });
                }
            });

            if (operations.length === 0) {
                alert('No selective changes needed.');
                return;
            }

            console.log('[SYNC] Selective operations planned:', operations);

            // Show confirmation with details
            const inheritCount = operations.filter(op => op.type === 'inherit').length;
            const pushCount = operations.filter(op => op.type === 'push').length;

            const message = `Selective sync will:\n` +
                `• Inherit ${inheritCount} items from this instance\n` +
                `• Push ${pushCount} items to this instance\n` +
                `This avoids cookie limits. Continue?`;

            if (!confirm(message)) return;

            // Execute operations sequentially
            await executeSelectiveOperations(operations);
        }

        function getActionForSetting(setting, operation) {
            const actionMap = {
                'subscriptions': operation === 'add' ? 'subscribe' : 'unsubscribe',
                'filters': operation === 'add' ? 'filter' : 'unfilter',
                'followed_users': operation === 'add' ? 'follow_user' : 'unfollow_user',
                'filtered_users': operation === 'add' ? 'filter_user' : 'unfilter_user'
            };
            return actionMap[setting] || 'unknown';
        }

        async function executeSelectiveOperations(operations) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--accent);
                    color: var(--foreground);
                    padding: 12px 20px;
                    border-radius: 6px;
                    z-index: 10000;
                    font-family: sans-serif;
                    font-size: 14px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    min-width: 300px;
                `;
            document.body.appendChild(notification);

            let completed = 0;
            const total = operations.length;

            for (const operation of operations) {
                notification.textContent = `Selective sync: ${completed + 1}/${total} - ${operation.action} ${operation.item}`;

                try {
                    if (['subscribe', 'unsubscribe', 'filter', 'unfilter'].includes(operation.action)) {
                        // Use existing subreddit action logic
                        await executeSubredditAction(operation.item, operation.action);
                    } else {
                        // For user actions, we'd need to implement similar logic
                        console.log(`[SYNC] User action not implemented yet: ${operation.action} ${operation.item}`);
                    }

                    // Update authoritative if this was an inherit operation
                    if (operation.type === 'inherit') {
                        const authoritative = getAuthoritativeSettings();
                        if (!authoritative[operation.setting]) {
                            authoritative[operation.setting] = [];
                        }
                        if (!authoritative[operation.setting].includes(operation.item)) {
                            authoritative[operation.setting].push(operation.item);
                            authoritative.overall_timestamp = Date.now();
                            saveAuthoritativeSettings(authoritative);
                            console.log(`[SYNC] Inherited ${operation.item} into authoritative ${operation.setting}`);
                        }
                    }

                    completed++;

                    // Small delay between operations to avoid overwhelming the server
                    await new Promise(resolve => setTimeout(resolve, 200));

                } catch (error) {
                    console.error(`[SYNC] Failed to execute ${operation.action} on ${operation.item}:`, error);
                    notification.textContent = `Error on ${operation.item} - continuing...`;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            notification.textContent = `Selective sync complete: ${completed}/${total} operations`;
            setTimeout(() => notification.remove(), 3000);

            // Refresh the page to see changes
            setTimeout(() => window.location.reload(), 3000);
        }

        async function executeSubredditAction(subredditName, action) {
            const actionEndpoints = {
                'subscribe': `/r/${subredditName}/subscribe`,
                'unsubscribe': `/r/${subredditName}/unsubscribe`,
                'filter': `/r/${subredditName}/filter`,
                'unfilter': `/r/${subredditName}/unfilter`
                };

            const endpoint = actionEndpoints[action];
            if (!endpoint) {
                throw new Error(`Unknown action: ${action}`);
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            console.log(`[SYNC] Successfully executed ${action} on ${subredditName}`);
        }

        return {
            init: init,
            handleUserAction: handleUserAction,
            performSync: performSync,
            inheritFromInstance: inheritFromInstance,
            pushToInstance: pushToInstance,
            mergeAndPushToInstance: mergeAndPushToInstance,
            updateSyncStatus: updateSyncStatus,
            encodeRESSettings: encodeRESSettings,
            decodeRESSettings: decodeRESSettings,
            refreshSettingsOverlay: refreshSettingsOverlay,
            getAuthoritativeSettings: getAuthoritativeSettings,
            generateChangeSummary: generateChangeSummary,
            extractInstanceSettings: extractInstanceSettings, // ADD THIS LINE
            getCachedDifferences: function() {
                return cachedSettingsDifferences || [];
            },
            clearCache: function() {
                cachedAuthoritative = null;
                cachedInstance = null;
                cachedInstanceTimestamp = null;
                cachedSettingsDifferences = [];
                console.log('[SYNC] Cache cleared');
            }
        };
    })();

// Make sync functionality globally accessible
window.RedlibSettingsSync = RedlibSettingsSync;

// ============================================================================
// SETTINGS PAGE FEED COLLAPSERS
// ============================================================================
const SettingsFeedCollapsers = (function() {
    function init() {
        // Only run on settings page
        if (!window.location.pathname.includes('/settings')) {
            return;
        }

        console.log('[Redlib Enhancement Suite] Initializing settings feed collapsers...');

        // Convert subscribed feeds section to collapsible
        const subsSection = document.getElementById('settings_subs');
        if (subsSection) {
            convertToCollapsible(subsSection, 'Subscribed Feeds');
        }

        // Convert filtered feeds section to collapsible
        const filtersSection = document.getElementById('settings_filters');
        if (filtersSection) {
            convertToCollapsible(filtersSection, 'Filtered Feeds');
        }
    }

    function convertToCollapsible(section, title) {
        // Get the legend element
        const legend = section.querySelector('legend');
        if (!legend) return;

        // Count items in this section
        const items = section.querySelectorAll('div > a[href*="/r/"], div > a[href*="/u/"]');
        const itemCount = items.length;

        // Create details wrapper
        const details = document.createElement('details');
        details.className = 'settings-feeds-collapsible';
        details.open = true; // Start expanded by default

        // Create summary with count
        const summary = document.createElement('summary');
        summary.className = 'settings-feeds-summary';
        summary.textContent = `${title} (${itemCount})`;

        // Create content wrapper
        const content = document.createElement('div');
        content.className = 'settings-feeds-content';

        // Move all div elements (except legend) into content wrapper
        const feedDivs = Array.from(section.querySelectorAll('div'));
        feedDivs.forEach(div => {
            content.appendChild(div);
        });

        // Assemble the structure
        details.appendChild(summary);
        details.appendChild(content);

        // Replace legend with details
        legend.parentNode.replaceChild(details, legend);

        // Store collapsed state
        details.addEventListener('toggle', function() {
            const sectionId = section.id;
            const isOpen = details.open;
            GM_setValue(`settings_${sectionId}_expanded`, isOpen);
        });

        // Restore collapsed state
        const savedState = GM_getValue(`settings_${section.id}_expanded`, true);
        details.open = savedState;
    }

    return {
        init: init
    };
})();

// ============================================================================
// AUTO-RECORD NATIVE SETTINGS CHANGES
// ============================================================================
function interceptNativeSettingsForm() {
    // Only run on settings page
    if (!window.location.pathname.includes('/settings')) {
        return;
    }

    console.log('[Redlib Enhancement Suite] Setting up native settings auto-recording...');

    // Find the main settings form
    const settingsForm = document.querySelector('form[action="/settings"]');
    if (!settingsForm) {
        console.log('[Redlib Enhancement Suite] Settings form not found');
        return;
    }

    // Intercept form submission
    settingsForm.addEventListener('submit', async function(event) {
        console.log('[Redlib Enhancement Suite] Native settings form submitted - auto-recording...');

        // Let the form submit normally first
        setTimeout(async () => {
            try {
                // Extract and record the settings as authoritative after form submission
                if (typeof RedlibSettingsSync !== 'undefined' && RedlibSettingsSync.inheritFromInstance) {
                    console.log('[Redlib Enhancement Suite] Auto-inheriting settings after native save...');
                    await RedlibSettingsSync.inheritFromInstance();
                }
            } catch (error) {
                console.warn('[Redlib Enhancement Suite] Failed to auto-record native settings:', error);
            }
        }, 1000); // Give time for the page to process the form submission
    });
}

// ============================================================================
    // COMMENT NAVIGATOR MODULE
    // ============================================================================
    const CommentNavigator = (function() {
        let navContainer = null;
        let currentTopLevelIndex = 0;
        let topLevelComments = [];

function createNavigationButtons() {
    // Add responsive CSS to document head (only once)
    if (!document.querySelector('#comment-nav-responsive-css')) {
        const style = document.createElement('style');
        style.id = 'comment-nav-responsive-css';
        style.textContent = `
            .comment-nav-buttons {
                position: fixed;
                z-index: 1000;
                display: flex;
            }

            .comment-nav-btn {
                background: var(--background);
                color: var(--text);
                border: 2px solid var(--highlighted);
                cursor: pointer;
                font-weight: bold;
                transition: all 0.2s ease;
                user-select: none;
            }

            .comment-nav-btn:hover {
                background: var(--highlighted);
                border-color: var(--accent);
            }

            /* Desktop layout */
            @media (min-width: 769px) {
                .comment-nav-buttons {
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    flex-direction: column;
                    gap: 20px;
                }

                .comment-nav-btn {
                    width: 50px;
                    height: 50px;
                    font-size: 16px;
                    border-radius: 50%;
                }
            }

            /* Mobile layout */
            @media (max-width: 768px) {
                .comment-nav-buttons {
                    bottom: 20px;
                    left: 10px;
                    right: 10px;
                    flex-direction: row;
                    gap: 10px;
                }

                .comment-nav-btn {
                    flex: 1;
                    height: 40px;
                    font-size: 14px;
                    border-radius: 8px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    navContainer = document.createElement('div');
    navContainer.className = 'comment-nav-buttons';

    // Up button
    const upButton = document.createElement('button');
    upButton.className = 'comment-nav-btn comment-nav-up';
    upButton.innerHTML = '▲';
    upButton.title = 'Previous top-level comment';

    // Down button
    const downButton = document.createElement('button');
    downButton.className = 'comment-nav-btn comment-nav-down';
    downButton.innerHTML = '▼';
    downButton.title = 'Next top-level comment';

// Add click handlers - FIXED: use correct function names
upButton.addEventListener('click', () => navigateToPrevious());
downButton.addEventListener('click', () => navigateToNext());

    navContainer.appendChild(upButton);
    navContainer.appendChild(downButton);

    return navContainer;
}

        function updateTopLevelComments() {
            // Get all top-level comments in document order
            const newCount = document.querySelectorAll('.thread > .comment').length;
            const oldCount = topLevelComments.length;

            topLevelComments = Array.from(document.querySelectorAll('.thread > .comment'));

            // Only log if the count actually changed
            if (newCount !== oldCount) {
                console.log('[Comment Navigator] Updated comment list:', oldCount, '→', newCount, 'comments');
            }
        }

        function navigateToNext() {
            if (topLevelComments.length === 0) {
                updateTopLevelComments();
                if (topLevelComments.length === 0) return;
            }

            // Simply increment by 1
            currentTopLevelIndex++;

            // Wrap around to beginning if at end
            if (currentTopLevelIndex >= topLevelComments.length) {
                currentTopLevelIndex = 0;
            }

            scrollToComment(currentTopLevelIndex);
            console.log('[Comment Navigator] Navigated to comment', currentTopLevelIndex + 1, 'of', topLevelComments.length);
        }

        function navigateToPrevious() {
            if (topLevelComments.length === 0) {
                updateTopLevelComments();
                if (topLevelComments.length === 0) return;
            }

            // Simply decrement by 1
            currentTopLevelIndex--;

            // Wrap around to end if at beginning
            if (currentTopLevelIndex < 0) {
                currentTopLevelIndex = topLevelComments.length - 1;
            }

            scrollToComment(currentTopLevelIndex);
            console.log('[Comment Navigator] Navigated to comment', currentTopLevelIndex + 1, 'of', topLevelComments.length);
        }

function scrollToComment(index) {
            if (index >= 0 && index < topLevelComments.length) {
                const targetComment = topLevelComments[index];

                // Calculate initial offset
                let offset = 80; // Base offset

                // Check if sticky post mode is enabled
                const isStickyModeEnabled = SettingsManager.getSetting('postCollapser', 'stickyMode');

                if (isStickyModeEnabled) {
                    // Always assume sticky mode will be active when scrolling to comments
                    // This prevents the timing issue where sticky activates after scroll
                    const nav = document.querySelector('nav');
                    const navHeight = nav ? nav.offsetHeight : (window.innerWidth <= 800 ? 100 : 60);

                    // Estimate sticky post height (it's compact in sticky mode)
                    // Based on the CSS: padding 4px 16px, compact header, no footer
                    const estimatedStickyHeight = window.innerWidth <= 800 ? 80 : 60;

                    offset = navHeight + estimatedStickyHeight + 20;
                    console.log('[Comment Navigator] Using sticky-aware offset:', offset);
                }

                // First scroll to position
                const rect = targetComment.getBoundingClientRect();
                window.scrollTo({
                    top: window.pageYOffset + rect.top - offset,
                    behavior: 'smooth'
                });

                // Wait for scroll to complete, then highlight
                setTimeout(() => {
                    highlightComment(targetComment);
                }, 500); // Wait for smooth scroll to finish
            }
        }

        function highlightComment(comment) {
            // Create a temporary highlight overlay instead of changing background
            const highlightOverlay = document.createElement('div');
            highlightOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--accent);
                opacity: 0.3;
                pointer-events: none;
                z-index: 999;
                transition: opacity 0.3s ease;
            `;

            // Make sure the comment has relative positioning for the overlay
            const originalPosition = comment.style.position;
            comment.style.position = 'relative';
            comment.appendChild(highlightOverlay);

            // Fade out and remove
            setTimeout(() => {
                highlightOverlay.style.opacity = '0';
                setTimeout(() => {
                    if (highlightOverlay.parentNode) {
                        highlightOverlay.parentNode.removeChild(highlightOverlay);
                    }
                    // Restore original position
                    comment.style.position = originalPosition;
                }, 300);
            }, 300);
        }

        function findCurrentCommentIndex() {
            // Find which comment is currently most visible in viewport
            const viewportTop = window.pageYOffset;
            const viewportMiddle = viewportTop + (window.innerHeight / 2);

            let closestIndex = 0;
            let closestDistance = Infinity;

            topLevelComments.forEach((comment, index) => {
                const rect = comment.getBoundingClientRect();
                const commentTop = rect.top + window.pageYOffset;
                const distance = Math.abs(commentTop - viewportMiddle);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        }

        function init() {
            // Only initialize on comment pages
            if (!window.location.pathname.includes('/comments/')) {
                return;
            }

            // Check if setting is enabled
            if (!SettingsManager.getSetting('commentNavigator', 'enabled')) {
                return;
            }

            // Create and add navigation buttons
            const navButtons = createNavigationButtons();
            document.body.appendChild(navButtons);

            // Initialize comment list
            updateTopLevelComments();

            // Set initial position to 0 (first comment)
            currentTopLevelIndex = -1; // Start at -1 so first click goes to comment 1

            // Listen for new comments being added (e.g., via AJAX) - but be more selective
            const observer = new MutationObserver((mutations) => {
                let shouldUpdate = false;

                mutations.forEach(mutation => {
                    // Only update if we detect actual comment additions
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if a top-level comment was added
                            if (node.matches && (node.matches('.thread > .comment') || node.querySelector('.thread > .comment'))) {
                                shouldUpdate = true;
                            }
                        }
                    });
                });

                if (shouldUpdate) {
                    setTimeout(() => {
                        console.log('[Comment Navigator] Detected new comments, updating list...');
                        updateTopLevelComments();
                    }, 200);
                }
            });

            // Only observe the main content area, not the entire body
            const mainContent = document.querySelector('main') || document.body;
            observer.observe(mainContent, {
                childList: true,
                subtree: true
            });

            console.log('[Redlib Enhancement Suite] Comment Navigator initialized');
        }

        return {
            init: init
        };
    })();

// ============================================================================
// MAIN INITIALIZATION
// ============================================================================
async function init() {
    console.log('[Redlib Enhancement Suite] Starting initialization...');

    // Initialize settings manager first
    SettingsManager.init();

    // Add combined styles (this now checks settings for conditional CSS)
    addCombinedStyles();

    const isCommentPage = window.location.pathname.includes('/comments/');

    // Initialize modules based on settings FIRST (these might cause DOM changes)
    if (SettingsManager.getSetting('postCollapser', 'enabled')) {
        PostCollapser.init();
        // Make PostCollapser globally accessible for other modules
        window.PostCollapser = PostCollapser;
    window.extractPostMetadata = extractPostMetadata;  // Make globally accessible
    }

// Add post actions (hide/save buttons)
if (!isCommentPage) {
    SettingsManager.addSaveButtonsToPosts();
} else {
    SettingsManager.addSaveButtonToCommentsPage();
    SettingsManager.addHideButtonToCommentsPage();
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

    if (isCommentPage && SettingsManager.getSetting('commentNavigator', 'enabled')) {
        CommentNavigator.init();
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

    if (isCommentPage && SettingsManager.getSetting('parentCommentHover', 'enabled')) {
        ParentCommentHover.init();
    }

    // Initialize settings feed collapsers
    if (window.location.pathname.includes('/settings')) {
        SettingsFeedCollapsers.init();
    }

    // Initialize auto-recording of native settings
    interceptNativeSettingsForm();

    // Temporary debug - remove after testing
    // console.log('Hidden posts debug:', GM_getValue('redlib_collapsed_posts', '{}'));
    // window.tempDebugHiddenPosts = GM_getValue('redlib_collapsed_posts', '{}');

    console.log('[Redlib Enhancement Suite] Core modules initialized for ' + (isCommentPage ? 'comment page' : 'post listing page'));

    // Initialize sync LAST to avoid interfering with DOM modifications
    // Also delay it slightly to ensure all DOM changes are complete
    setTimeout(async () => {
        try {
            await RedlibSettingsSync.init();
            console.log('[Redlib Enhancement Suite] Sync initialization complete');
        } catch (e) {
            console.warn('[Redlib Enhancement Suite] Sync initialization failed:', e);
        }
    }, 500); // Small delay to ensure DOM is stable
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // Add a small delay even for already loaded pages to ensure stability
    setTimeout(init, 100);
}
})();
