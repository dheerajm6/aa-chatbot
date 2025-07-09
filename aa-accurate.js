// American Airlines Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTripTypeTabs();
    initializeFormValidation();
    initializeDatePickers();
    initializeDestinationCards();
    initializeLanguageToggle();
    initializeAccessibility();
});

// Trip Type Tabs
function initializeTripTypeTabs() {
    const tabs = document.querySelectorAll('.flex-wrap.mx-1.my-1.w-full.max-w-fit button');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active styles from all tabs
            tabs.forEach(t => {
                t.classList.remove('text-aa-blue', 'border-b-2', 'border-aa-blue', 'font-medium');
                t.classList.add('text-gray-600');
            });
            
            // Add active styles to clicked tab
            this.classList.remove('text-gray-600');
            this.classList.add('text-aa-blue', 'border-b-2', 'border-aa-blue', 'font-medium');
            
            // Handle form changes based on trip type
            const tripType = this.textContent.trim();
            handleTripTypeChange(tripType);
        });
    });
}

// Handle trip type changes
function handleTripTypeChange(tripType) {
    const returnDateInput = document.querySelector('input[type="date"]:last-of-type');
    const returnDateLabel = returnDateInput?.previousElementSibling;
    
    if (tripType === 'One way') {
        // Disable return date for one-way trips
        if (returnDateInput) {
            returnDateInput.disabled = true;
            returnDateInput.value = '';
            returnDateInput.parentElement.style.opacity = '0.5';
        }
    } else {
        // Enable return date for round trip and multi-city
        if (returnDateInput) {
            returnDateInput.disabled = false;
            returnDateInput.parentElement.style.opacity = '1';
        }
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fromInput = form.querySelector('input[placeholder="City or airport"]:first-of-type');
            const toInput = form.querySelectorAll('input[placeholder="City or airport"]')[1];
            const departDate = form.querySelector('input[type="date"]:first-of-type');
            const returnDate = form.querySelector('input[type="date"]:last-of-type');
            
            // Validate required fields
            const errors = [];
            
            if (!fromInput?.value.trim()) {
                errors.push('Please enter a departure city or airport');
                highlightError(fromInput);
            }
            
            if (!toInput?.value.trim()) {
                errors.push('Please enter a destination city or airport');
                highlightError(toInput);
            }
            
            if (!departDate?.value) {
                errors.push('Please select a departure date');
                highlightError(departDate);
            }
            
            // Check if return date is required and validate
            const isOneWay = document.querySelector('.border-aa-blue')?.textContent.trim() === 'One way';
            if (!isOneWay && !returnDate?.value) {
                errors.push('Please select a return date');
                highlightError(returnDate);
            }
            
            if (errors.length > 0) {
                // Show error message
                showFormErrors(errors);
            } else {
                // Show loading state
                showLoadingState();
                
                // Simulate search
                setTimeout(() => {
                    alert('Searching for flights... This is a demo page.');
                    hideLoadingState();
                }, 2000);
            }
        });
    }
}

// Highlight form field with error
function highlightError(field) {
    if (field) {
        field.classList.add('border-red-500', 'focus:border-red-500');
        field.addEventListener('input', function() {
            this.classList.remove('border-red-500', 'focus:border-red-500');
        }, { once: true });
    }
}

// Show form errors
function showFormErrors(errors) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <div>
                <p class="font-medium">Please correct the following:</p>
                <ul class="list-disc list-inside mt-1">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    const form = document.querySelector('form');
    form.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Date Pickers
function initializeDatePickers() {
    const today = new Date().toISOString().split('T')[0];
    const departInput = document.querySelector('input[type="date"]:first-of-type');
    const returnInput = document.querySelector('input[type="date"]:last-of-type');
    
    if (departInput) {
        departInput.setAttribute('min', today);
        
        departInput.addEventListener('change', function() {
            // Set return date minimum to departure date
            if (returnInput && this.value) {
                returnInput.setAttribute('min', this.value);
                
                // If return date is before departure date, clear it
                if (returnInput.value && returnInput.value < this.value) {
                    returnInput.value = '';
                }
            }
        });
    }
    
    if (returnInput) {
        returnInput.setAttribute('min', today);
    }
}

// Destination Cards
function initializeDestinationCards() {
    const destinationCards = document.querySelectorAll('.group');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.querySelector('h3')?.textContent;
            const price = this.querySelector('p')?.textContent;
            
            if (destination) {
                // Populate the search form with the destination
                const toInput = document.querySelectorAll('input[placeholder="City or airport"]')[1];
                if (toInput) {
                    toInput.value = destination;
                    toInput.focus();
                    
                    // Scroll to form
                    document.querySelector('.BookingMask')?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    });
}

// Language Toggle
function initializeLanguageToggle() {
    const languageButton = document.querySelector('.header-language-toggle button');
    
    if (languageButton) {
        languageButton.addEventListener('click', function() {
            // In a real implementation, this would show a language selection dropdown
            alert('Language selection would appear here. This is a demo.');
        });
    }
}

// Accessibility Features
function initializeAccessibility() {
    // Add keyboard navigation for tabs
    const tabs = document.querySelectorAll('.flex-wrap.mx-1.my-1.w-full.max-w-fit button');
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('text-aa-blue') ? 'true' : 'false');
        tab.setAttribute('tabindex', tab.classList.contains('text-aa-blue') ? '0' : '-1');
        
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const currentIndex = Array.from(tabs).indexOf(this);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[nextIndex].click();
                tabs[nextIndex].focus();
            }
        });
    });
    
    // Add ARIA labels
    document.querySelectorAll('input, select').forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            const id = 'input-' + Math.random().toString(36).substr(2, 9);
            input.id = id;
            label.setAttribute('for', id);
        }
    });
}

// Loading State
function showLoadingState() {
    const button = document.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = true;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching flights...
        `;
    }
}

function hideLoadingState() {
    const button = document.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = false;
        button.innerHTML = 'Search flights';
    }
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});