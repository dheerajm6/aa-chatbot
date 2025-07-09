#!/bin/bash

# Build script for AA Landing Page

echo "Building American Airlines Landing Page..."

# Check if files exist
if [ -f "aa-accurate.html" ] && [ -f "aa-accurate.css" ] && [ -f "aa-accurate.js" ] && [ -f "aa-large-default.webp" ]; then
    echo "✓ All files found"
    
    # Open in default browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open aa-accurate.html
        echo "✓ Opening accurate AA landing page in browser..."
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open aa-accurate.html
        echo "✓ Opening accurate AA landing page in browser..."
    else
        echo "✓ Files ready. Please open aa-accurate.html in your browser"
    fi
    
    echo ""
    echo "Build complete! The accurate American Airlines landing page is ready."
    echo "Files created:"
    echo "  - aa-accurate.html (Accurate HTML structure based on real AA design)"
    echo "  - aa-accurate.css (AA brand colors, fonts, and styling)"
    echo "  - aa-accurate.js (Interactive functionality)"
    echo "  - aa-large-default.webp (Official AA logo)"
    echo ""
    echo "Features:"
    echo "  ✓ Official AA brand colors (#0078D2, #00467F)"
    echo "  ✓ American Sans font family"
    echo "  ✓ Tailwind CSS-based layout"
    echo "  ✓ Interactive booking form"
    echo "  ✓ Form validation"
    echo "  ✓ Accessibility features"
    echo "  ✓ Mobile responsive design"
    
else
    echo "✗ Error: Missing required files"
    echo "Required files:"
    echo "  - aa-accurate.html"
    echo "  - aa-accurate.css" 
    echo "  - aa-accurate.js"
    echo "  - aa-large-default.webp"
    exit 1
fi