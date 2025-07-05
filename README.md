# Redlib Enhancement Suite

A comprehensive userscript that supercharges your Redlib experience with RES style features, smooth animations, and powerful customization options.

## 🚀 Installation

### Browser Compatibility
- ✅ **Chrome** 88+
- ✅ **Firefox** 85+
- ✅ **Safari** 14+
- ✅ **Edge** 88+
- ✅ **Mobile browsers** (with touch adaptations)

1. **Install a userscript manager:**
   - [Tampermonkey](https://tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. **Install the script:**
   - Click [here to install latest version](https://github.com/azizLIGHT/redlib-enhancement-suite/raw/refs/heads/main/redlib-enhancement-suite.user.js) or copy the script content
   - Your userscript manager will prompt you to install
   - Refresh any open Redlib pages

3. **Configure settings:**
   - Look for the ⚙️ settings icon in the top-right corner of any Redlib page
   - Customize features to your preference
   - Changes apply immediately after clicking "Apply"

## ✨ Features

Transform your Redlib browsing with modern enhancements that make the interface more intuitive, efficient, and visually appealing. From collapsible posts with floating video players to hover previews, all with cross-device settings synchronization and export/import functionality, this suite brings the best of Reddit Enhancement Suite to Redlib.

## 🏠 General Features

### ⚙️ Settings Manager
Comprehensive settings overlay with organized toggles and descriptions. Access the settings panel via the ⚙️ icon in the top-right corner.

![Settings Manager](https://github.com/user-attachments/assets/1e1638a9-0130-4c2f-baa0-c25dc0a82bea)

### 🔗 Subreddit Hover Info
Rich popups showing subreddit details, member count, and quick subscribe/filter actions.

![Subreddit Hover Info](https://github.com/user-attachments/assets/68b7ea67-223f-4a68-bbed-4cffab0b60d4)

### 👤 Username Hover Info
User profile previews with karma, join date, and follow/filter options.

![Username Hover Info](https://github.com/user-attachments/assets/0fbf3836-29ad-4ccf-bc44-1f936b90eb26)

### 🔄 Cross-Instance Sync
Synchronize settings across multiple Redlib instances with authoritative source management.

![Cross-Instance Sync](https://github.com/user-attachments/assets/1e056325-b5cc-45ee-b15f-aa86482c2d2f)

**Cross-Instance Sync Features:**
- ✅ **Authoritative Source Management** - Adopt any Redlib instance as master for all settings
- ✅ **Settings Sync Status** - Side by side comparison showing Instance vs Script settings with difference highlighted
- ✅ **Push Settings to Instances** - Push master settings to instance, with confirmation messages
- ✅ **Merge Settings** - Adopt missing settings from the instance and push stored settings to the instance
- ✅ **Intelligent Merge Preview** - See exactly what changes will be made before applying

### 📤 Export/Import System
Complete redlib-style settings backup and restore to import/export between devices: redlib settings, redlib subscriptions/filters, RES configuration options, and hidden posts states.

![Export/Import System](https://github.com/user-attachments/assets/2c4e1941-9489-4373-b1bb-ae5a73008f0c)

**Export/Import Features:**
- ✅ **Complete Settings Backup** - Export all redlib settings, userscript settings, and hidden posts in one encoded string
- ✅ **Unicode-Safe Encoding** - Base64 + Cyrillic mapping ensures reliable copy/paste across platforms
- ✅ **One-Click Clipboard** - Copy export strings with visual success/failure feedback
- ✅ **Comprehensive Import** - Restore complete configuration with validation and error handling
- ✅ **Cross-Device Transfer** - Move complete configuration between devices/browsers

## 📰 Posts List Pages

### 🙈 Post Hider
Click to hide/unhide posts with smooth slide animations and persistent state across instances.

![Post Hider](https://github.com/user-attachments/assets/b8e9d719-a7d1-4617-972f-964026f93d8b)

### 📏 Post Expand Buttons
Three-state text expansion: Default → Expanded → Minimized.

**Default state:**
![Post Expand Default](https://github.com/user-attachments/assets/5014ae9f-62f1-4225-bb73-199efd77a646)

**Expanded state** with full post text visible:
![Post Expand Expanded](https://github.com/user-attachments/assets/800f939f-9f7b-4267-8aac-45f433e4a782)

**Minimized state** with post text hidden and post picture thumbnailed (if available):
![Post Expand Minimized](https://github.com/user-attachments/assets/4eaf0c13-47c9-4ed6-9050-2e9d6ac07e0f)

### 👁️ Hover Comment Previews
Preview top comments by hovering over comment links.

![Hover Comment Previews](https://github.com/user-attachments/assets/ae677c78-8c47-4a70-93d4-b8c7ab39efbb)

**Load more top level comments** in the preview:
![Hover Comments Load More](https://github.com/user-attachments/assets/85eba91c-6914-4703-9c43-c69310f78f1b)

**Load more child comments:**
![Hover Comments Child](https://github.com/user-attachments/assets/c5323229-4a8b-4af9-a7c5-e96622265f72)

## 📰 Subreddit Pages

### 📱 Subreddit Info Toggler
Hide/show sidebar with floating toggle button.

![Subreddit Info Toggler](https://github.com/user-attachments/assets/f310796c-419b-4930-b809-d469bcdfe047)

**Hide subreddit panel and sidebar panel** to expand post width:
![Subreddit Sidebar Hidden](https://github.com/user-attachments/assets/8b3c32e4-c6e0-4714-9823-40770b38313d)

## 💬 Comments Pages

### 📌 Sticky Post Mode
Post header stays visible when scrolling through comments.

![Sticky Post Mode](https://github.com/user-attachments/assets/df77442b-ec36-4625-99c8-27d6028fbfb1)

**Hover mouse over sticky post** to reveal post content:
![Sticky Post Hover](https://github.com/user-attachments/assets/64150ad4-74b1-4312-a269-78be2c146a27)

### 🎬 Floating Video Player
Videos become draggable, resizable floating players when posts are hidden.

![Floating Video Player](https://github.com/user-attachments/assets/003646c6-b5c0-486c-b826-0be041dd17eb)

## 💬 Comments Readability

### 🗂️ Comment Collapser
Child comments collapsed by default with custom expand buttons.

![Comment Collapser](https://github.com/user-attachments/assets/eadf86eb-3a94-4b70-bb9f-4930947fbde6)

**Click to expand children:**
![Comment Expand](https://github.com/user-attachments/assets/4ff3fbc6-1af4-4519-b139-81866dbd68c8)

**Per level child comments** expansion/collapse:
![Comment Levels](https://github.com/user-attachments/assets/8a77872e-11f2-490b-b367-cb84e6ba6031)

### 🎨 Comment Styling
Compact layout with alternating background colors and improved visual hierarchy.

![Comment Styling](https://github.com/user-attachments/assets/dcc7c292-7342-47a6-b09b-2fe336da96be)

## 🎨 Visual Design & Technical Features

### Visual Design
- **Dark theme optimized** with proper contrast and readability
- **Consistent sizing** - all popups and UI elements use standardized dimensions
- **Smooth transitions** - 400ms slide animations with cubic-bezier easing
- **Non-intrusive** - enhancements feel native to Redlib's design language

### Technical Features
- **Intelligent caching** - Reduces API calls for better performance
- **Memory management** - Automatic cleanup of old data
- **Error handling** - Graceful fallbacks for network issues
- **CSP compliance** - Works within Content Security Policy restrictions
- **Mobile responsive** - Adapts to smaller screens
- **Unicode-safe encoding** - Reliable export/import across platforms and browsers

### Performance
- **Lazy loading** - Features only initialize when needed
- **Event delegation** - Efficient event handling for dynamic content
- **Debounced interactions** - Prevents excessive API calls
- **Minimal footprint** - Clean code with no memory leaks

## 🤝 Contributing

Found a bug or have a feature request?

1. **Issues** - Report bugs or request features on the [Issues page](https://github.com/azizLIGHT/redlib-enhancement-suite/issues)
2. **Pull Requests** - Submit improvements via pull requests
3. **Testing** - Help test new features across different Redlib instances

## 📝 Version History

### v2.0 - Current

🚀 **Major Export/Import System**
- **Complete redlib-style Backup** - Export all userscript settings, sync settings, and hidden posts in one encoded string
- **Unicode-Safe Encoding** - Base64 + Cyrillic character mapping ensures reliable copy/paste across all platforms and browsers
- **One-Click Clipboard** - Copy export strings with visual success/failure feedback
- **Comprehensive Import** - Restore complete configuration with validation, error handling, and detailed success summaries
- **Cross-Device Transfer** - Move entire setup between devices, browsers, and Redlib instances seamlessly
- **Hidden Posts Integration** - Collapsed/hidden post states fully included in backup and restore operations

🔄 **Enhanced Sync System Integration**
- **Export/Import + Sync Compatibility** - New backup system works seamlessly with existing cross-instance synchronization
- **Enhanced Merge Dialogs** - Import operations trigger comprehensive change summaries and sync status updates
- **Intelligent Refresh** - Settings overlay automatically refreshes after import to show new configuration
- **Hidden Posts Tracking** - Sync system now includes hidden post counts in instance comparisons and merge previews

🔧 **Technical Improvements**
- **Robust Error Handling** - Enhanced validation for import operations with detailed error messages
- **Memory Management** - Improved cleanup and caching for export/import operations
- **Settings Integration** - Export/import functions properly integrated with existing settings management
- **Performance Optimizations** - Efficient encoding/decoding for large configuration exports

<details>
<summary><h2>v1.91 - Previous</h2></summary>
  
🔄 **Sync System Enhancements**
- **Auto-Refresh Settings Panel** - Settings overlay automatically refreshes after sync operations
- **Enhanced Merge Operations** - Improved mergeAndPushToInstance() with better error handling and timing
- **Real-time Updates** - Live refresh of sync status, comparison tables, and merge previews
- **Comprehensive Refresh Function** - New refreshSettingsOverlay() manages all settings panel updates

🎨 **UI/UX Improvements**
- **Z-index Fix** - Resolved conflicts between settings overlay and hover popups with proper layering
- **Enhanced Merge Dialogs** - Confirmation dialogs now show detailed merge preview text before action
- **Improved Visual Hierarchy** - Better organization and display of sync interface components
- **Dynamic Popup Handling** - Mutation observer ensures proper z-index for dynamically created popups

⚡ **Performance & Reliability**
- **Better Error Handling** - Enhanced error recovery in merge operations and settings refresh
- **Improved Timing Control** - Proper delays and sequencing for post-merge operations
- **Function Scoping** - Better integration between sync components and settings manager
- **Event Listener Management** - More robust event handling for sync system interactions

🐛 **Bug Fixes**
- Fixed popup display issues when settings overlay is open
- Resolved timing conflicts between merge operations and UI updates
- Improved stability of sync status monitoring and refresh cycles
</details>

<details>
<summary><h2>v1.52</h2></summary>
  
🆕 **Major New Feature**
- **🔄 Cross-Instance Settings Synchronization** - Complete multi-instance settings sync system
  - **Authoritative Source Management** - Designate one Redlib instance as the master source for all settings
  - **Real-time Sync Status** - Live monitoring of sync status with detailed difference tracking
  - **Side-by-Side Comparison** - Visual comparison tables showing Instance vs Authority settings
  - **Intelligent Merge Preview** - See exactly what changes will be made before applying
  - **Selective Synchronization** - Choose which settings to inherit from instance vs push from authority
  - **Timestamp Tracking** - Automatic conflict detection based on last update times
  - **Smart Conflict Resolution** - Handles scenarios like cookie size limits with alternative sync methods

🔧 **Sync System Details**
- **Settings Comparison Interface** - Three-column table (Setting | Instance | Authority) with clickable headers
- **Merge Operations** - "Inherit from Instance" and "Push to Instance" buttons for bulk operations  
- **Detailed Differences View** - Expandable preview showing exactly what subscriptions/filters will be added
- **Refresh Status** - Manual sync status refresh with detailed change summaries
- **Error Handling** - Graceful handling of network issues and API limitations

🎨 **UI Enhancements**
- **Enhanced Settings Modal** - New "Cross-Instance Sync" section in settings panel
- **Monospace Status Display** - Technical sync information displayed in easy-to-read format
- **Mobile Responsive** - Sync interface adapts to smaller screens with appropriate font sizing
- **Visual Status Indicators** - Clear ✅/❌ status with color-coded difference highlights

⚡ **Performance & Reliability**
- **Caching System** - Reduces redundant API calls during sync operations
- **Background Processing** - Sync initialization happens after DOM stabilization
- **Memory Management** - Proper cleanup of cached sync data
- **Error Recovery** - Fallback mechanisms for failed sync operations
</details>

<details>
<summary><h2>v1.1.4</h2></summary>
  
- Unify button appearances
</details>

<details>
<summary><h2>v1.1.3</h2></summary>
  
- 🐛 **Mobile Fix** - Fixed hover comments popup width on mobile (prevents horizontal scrolling)
- 🎨 **UI Consistency** - Made sidebar toggle button same size as settings button (40px)
- ✨ **Smooth Animations** - Added shrinking animation when showing sidebar (matches existing expand animation)
- 🔧 **Version Sync** - Settings dialog now automatically reflects script version number
- 🐛 **Popup Interactions** - Fixed issue where comments popup wouldn't hide after username popup closes
</details>

<details>
<summary><h2>v1.1.2</h2></summary>
  
🆕 **New Features**
- **AJAX Comment Loader Module** - Extracted comment loading functionality into a separate module for better organization
- **Close Buttons** - Added close buttons (×) to Subreddit Hover and Username Hover popups for better UX
- **Enhanced Comment Preview** - Hover Comments now has a dedicated close button and improved interaction handling

🔧 **Improvements**
- **Hover Comments Module**
  - Fixed Width - Comment popups now have a consistent 500px width for better readability
  - Enhanced Styling - Complete overhaul of nested comment backgrounds with true alternating pattern (gray/black) extending to 10+ nesting levels
  - Improved Close Button - Added floating close button with better positioning and scroll-aware behavior
  - Better Interaction - Improved popup hiding logic to work seamlessly with other hover popups

- **Comment System Overhaul**
  - Modular Architecture - Split comment functionality into separate modules (CommentCollapser, AjaxCommentLoader)
  - Simplified UI - Comment expand buttons now use simpler [+]/[−] instead of [+++]/[---]
  - Ultra-Compact Styling - More aggressive spacing reduction with alternating backgrounds extended to Level 15

- **Settings & Configuration**
  - New Setting - Added "AJAX Load More Comments" toggle in settings panel
  - Better Organization - Reorganized comment-related settings for clarity

🐛 **Bug Fixes**
- Fixed popup positioning conflicts when multiple hover systems are active
- Resolved issues with comment loading state management
- Improved scroll handling for floating close buttons
- Better error handling in AJAX comment loading
</details>

<details>
<summary><h2>v1.1.1</h2></summary>
  
- ✨ Complete settings management system
- ✨ Username hover info with follow/filter actions
- ✨ Smooth slide transitions for all interactions
- ✨ Three-state post text expansion
- ✨ Floating video player with drag/resize
- 🐛 Fixed popup sizing consistency
- 🐛 Improved mobile responsiveness
</details>

## 📄 License

MIT License - Feel free to modify and distribute

## 💡 Inspiration

Inspired by Reddit Enhancement Suite (RES), this project brings familiar power-user features to the privacy-focused Redlib frontend while maintaining the clean, fast experience that makes Redlib special.

---

**Made with ❤️ for the Redlib community**

*Transform your Reddit browsing while keeping your privacy intact*
