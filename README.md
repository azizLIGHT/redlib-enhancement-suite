# Redlib Enhancement Suite

A comprehensive userscript that supercharges your Redlib experience with RES-style features, smooth animations, and powerful customization options.

## ✨ Features Overview

Transform your Redlib browsing with modern enhancements that make the interface more intuitive, efficient, and visually appealing. From collapsible posts with floating video players to hover previews and customizable layouts, this suite brings the best of Reddit Enhancement Suite to Redlib.

## 🎯 Feature Breakdown

### 🏠 General Features
- **⚙️ Settings Manager** - Comprehensive settings overlay with organized toggles and descriptions
- **🔗 Subreddit Hover Info** - Rich popups showing subreddit details, member count, and quick subscribe/filter actions
- **👤 Username Hover Info** - User profile previews with karma, join date, and follow/filter options

### 📰 Frontpage & Subreddit Pages

#### Post Management
- **🙈 Post Hider** - Click to hide/unhide posts with smooth slide animations
- **📏 Post Expand Buttons** - Three-state text expansion: Default → Expanded → Minimized
- **🎬 Floating Video Player** - Videos become draggable, resizable floating players when posts are hidden
- **👁️ Hover Comment Previews** - Preview top comments by hovering over comment links

#### Interface Enhancements
- **📱 Subreddit Info Toggler** - Hide/show sidebar with floating toggle button
- **💾 Persistent State** - All preferences saved across browser sessions

### 💬 Comment Pages

#### Post Enhancements
- **📌 Sticky Post Mode** - Post header stays visible when scrolling through comments
- **🎬 Floating Video Player** - Same floating video functionality on comment pages

#### Comment Features
- **🗂️ Comment Collapser** - Comments collapsed by default with custom expand buttons
- **🎨 Comment Styling** - Compact layout with alternating background colors and improved visual hierarchy

## ⚡ Smooth Animations

All interactions feature carefully crafted transitions:
- **Slide animations** for hiding/showing posts
- **Height transitions** for text expansion
- **Fade effects** for UI elements
- **Easing curves** for natural, polished feel

## 🛠️ Settings & Customization

Access the settings panel via the ⚙️ icon in the top-right corner:

### General Settings
- ✅ Subreddit Hover Info
- 🚧 Username Hover Info *(in development)*

### Frontpage & Subreddit Settings
- ✅ Subreddit Info Toggler
  - 🔧 Hide sidebars by default
- ✅ Post Hider
- ✅ Post Expand Buttons
  - 🔧 Expand posts by default
- ✅ Hover Comment Previews

### Comment Page Settings
- ✅ Sticky Post Mode
- ✅ Floating Video Player
- ✅ Comment Collapser
- ✅ Comment Styling

## 🎨 Visual Design

- **Dark theme optimized** with proper contrast and readability
- **Consistent sizing** - all popups and UI elements use standardized dimensions
- **Smooth transitions** - 400ms slide animations with cubic-bezier easing
- **Non-intrusive** - enhancements feel native to Redlib's design language

## 🔧 Technical Features

- **Intelligent caching** - Reduces API calls for better performance
- **Memory management** - Automatic cleanup of old data
- **Error handling** - Graceful fallbacks for network issues
- **CSP compliance** - Works within Content Security Policy restrictions
- **Mobile responsive** - Adapts to smaller screens

## 🖼️ Screenshots
Settings

![Settings](https://github.com/user-attachments/assets/9fb04b80-99b9-4b59-9ea7-cd7d109e8ea8)

Subreddit Hover Info

![Subreddit Hover Info](https://github.com/user-attachments/assets/9500f8b1-8cdf-4bbc-9d37-bda21ea0b27a)

User Hover Info

![User Hover Info](https://github.com/user-attachments/assets/03ff091d-6528-4a54-9929-c37ad6f4e827)

Hidden post with state preservation

![Hiden post](https://github.com/user-attachments/assets/9bd741f9-b048-45c1-acc6-e0324b1b8e2a)

Comments Preview

![Comments Preview](https://github.com/user-attachments/assets/62bfd2fc-d048-42d5-8afe-80fc75112542)

Comments Preview

![Comments Preview](https://github.com/user-attachments/assets/3c655e22-7838-4f7b-a38a-4a651bcd1ae7)

Sticky post at the top

![Sticky post at the top](https://github.com/user-attachments/assets/df77442b-ec36-4625-99c8-27d6028fbfb1)

Hover sticky post for preview

![Hover sticky post for preview](https://github.com/user-attachments/assets/64150ad4-74b1-4312-a269-78be2c146a27)

Floating video player, resizable and movable

![Floating video player, resizable and movable](https://github.com/user-attachments/assets/003646c6-b5c0-486c-b826-0be041dd17eb)


## 📱 Browser Compatibility

- ✅ **Chrome** 88+
- ✅ **Firefox** 85+
- ✅ **Safari** 14+
- ✅ **Edge** 88+
- ✅ **Mobile browsers** (with touch adaptations)

## 🚦 Performance

- **Lazy loading** - Features only initialize when needed
- **Event delegation** - Efficient event handling for dynamic content
- **Debounced interactions** - Prevents excessive API calls
- **Minimal footprint** - Clean code with no memory leaks

## 🚀 Installation

1. **Install a userscript manager:**
   - [Tampermonkey](https://tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. **Install the script:**
   - Click [here to install](https://github.com/azizLIGHT/redlib-enhancement-suite/raw/refs/heads/main/redlib-enhancement-suite.user.js) or copy the script content
   - Your userscript manager will prompt you to install
   - Refresh any open Redlib pages

3. **Configure settings:**
   - Look for the ⚙️ settings icon in the top-right corner of any Redlib page
   - Customize features to your preference
   - Changes apply immediately after clicking "Apply"

## 📋 Supported Instances

Works on all major Redlib instances including:
- redlib.freedit.eu
- redlib.privacyredirect.com
- redlib.zaggy.nl
- redlib.ducks.party
- And many more...

## 🤝 Contributing

Found a bug or have a feature request?

1. **Issues** - Report bugs or request features on the [Issues page](https://github.com/azizLIGHT/redlib-enhancement-suite/issues)
2. **Pull Requests** - Submit improvements via pull requests
3. **Testing** - Help test new features across different Redlib instances

## 📝 Version History

### v1.1.4 - Current
- Unify button appearances

### v1.1.3 - Previous
- 🐛 **Mobile Fix** - Fixed hover comments popup width on mobile (prevents horizontal scrolling)
- 🎨 **UI Consistency** - Made sidebar toggle button same size as settings button (40px)
- ✨ **Smooth Animations** - Added shrinking animation when showing sidebar (matches existing expand animation)
- 🔧 **Version Sync** - Settings dialog now automatically reflects script version number
- 🐛 **Popup Interactions** - Fixed issue where comments popup wouldn't hide after username popup closes

### v1.1.2
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

### v1.1.1
- ✨ Complete settings management system
- ✨ Username hover info with follow/filter actions
- ✨ Smooth slide transitions for all interactions
- ✨ Three-state post text expansion
- ✨ Floating video player with drag/resize
- 🐛 Fixed popup sizing consistency
- 🐛 Improved mobile responsiveness

## 📄 License

MIT License - Feel free to modify and distribute

## 💡 Inspiration

Inspired by Reddit Enhancement Suite (RES), this project brings familiar power-user features to the privacy-focused Redlib frontend while maintaining the clean, fast experience that makes Redlib special.

---

**Made with ❤️ for the Redlib community**

*Transform your Reddit browsing while keeping your privacy intact*
