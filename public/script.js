// public/script.js - Robust Upload & Language Dropdown + Translation Structure

// --- Translations ---
// !!! IMPORTANT: ADD ACTUAL TRANSLATIONS FOR OTHER LANGUAGES BELOW !!!
const translations = {
    // --- English (en) ---
    en: {
        lang_name: "English",
        // Meta Tags
        meta_title_main_short: "Free Image to SVG Converter",
        meta_description_main: "Free online tool to convert raster images (JPG, PNG, WEBP) to scalable vector graphics (SVG) with real-time customization and presets.",
        meta_title_contact: "Contact Us - Vectorise.Me",
        meta_description_contact: "Get in touch with Vectorise.Me or find solutions to common vectorization problems.",
        meta_title_privacy: "Privacy Policy - Vectorise.Me",
        meta_description_privacy: "Privacy Policy for the Vectorise.Me online SVG conversion tool.",
        meta_title_cookies: "Cookie Policy - Vectorise.Me",
        meta_description_cookies: "Cookie Policy for the Vectorise.Me online SVG conversion tool.",
        meta_title_terms: "Terms of Service - Vectorise.Me",
        meta_description_terms: "Terms of Service for the Vectorise.Me online SVG conversion tool.",
        // Header
        upload_new: "Upload New",
        // Landing Page - Hero & Upload
        landing_h1_free: "Only FREE",
        landing_h1_and: "and",
        landing_h1_customizable: "CUSTOMIZABLE Vectorizer",
        landing_subheadline_detailed: "Instantly convert JPG, PNG, WEBP images into crisp, infinitely scalable SVG vectors. Features advanced tracing options and helpful presets for precise results.",
        upload_drag_drop: "Drag & Drop Image",
        upload_or: "or",
        upload_browse: "Browse Files",
        upload_formats: "Max 15MB (JPG, PNG, WEBP, BMP)",
        cancel_selection_title: "Cancel Selection",
        vectorize_image_btn: "Vectorize Image",
        // Landing Page - Features
        features_h2: "Features",
        features_p: "Everything you need for perfect SVGs. Our powerful conversion tool gives you complete control over your vector graphics.",
        feature_instant_h3: "Instant Conversion",
        feature_instant_p: "Upload your image and get an SVG preview instantly. No waiting, no processing delays.",
        feature_realtime_h3: "Real-time Customization",
        feature_realtime_p: "Adjust settings and see changes in real-time. Tweak your SVG to perfection.",
        feature_quality_h3: "High-Quality Results",
        feature_quality_p: "Get clean, optimized SVGs that scale perfectly for any use case.",
        // Landing Page - Presets
        presets_h2: "Preset Examples",
        presets_p: "See how different presets handle various image types.",
        preset_photo: "Photograph",
        preset_clipart: "Clipart / Logo",
        preset_pixel: "Pixel Art",
        preset_original: "Original",
        preset_vectorized: "Vectorized",
        // Landing Page - CTA
        cta_p_revised: "Get started instantly – no sign-up needed. Just upload and vectorize!",
        // App View - Options Panel
        options_h2: "Options",
        load_settings_title: "Load settings",
        save_settings_title: "Save settings",
        reset_options_title: "Reset options",
        load_btn: "Load",
        save_btn: "Save",
        reset_btn: "Reset",
        preset_label: "Image Type Preset:",
        preset_select_placeholder: "Load a Preset...",
        options_legend_color: "Color Settings",
        color_detail_title: "Color Detail", // Added title (was only on label)
        color_detail_label: "Color Detail:",
        color_detail_full: "Full (8 bit)",
        color_detail_standard: "Standard (6 bit)",
        color_detail_reduced: "Reduced (5 bit)",
        color_detail_limited: "Limited (4 bit)",
        color_detail_posterized: "Posterized (3 bit)",
        color_mode_title: "Color Mode", // Added title (was only on label)
        color_mode_label: "Color Mode:",
        color_mode_color: "Color",
        color_mode_binary: "Binary",
        options_legend_trace: "Tracing Parameters",
        filter_speckle_label: "Filter Speckle:",
        mode_label: "Mode:",
        mode_spline: "Spline",
        mode_polygon: "Polygon",
        mode_pixel: "Pixel",
        options_legend_geo: "Geometry & Path Fitting",
        corner_threshold_label: "Corner Threshold:", // Renamed Key + Spelled Out
        path_precision_label: "Path Precision:", // Renamed Key + Spelled Out
        unit_decimals: "decimals", // Renamed Key + Spelled Out
        spline_threshold_label: "Spline Threshold:", // Renamed Key + Spelled Out
        splice_threshold_label: "Splice Threshold:", // Renamed Key + Spelled Out
        segment_length_label: "Segment Length:", // Renamed Key + Spelled Out
        options_legend_color_proc: "Color Processing Options",
        layering_label: "Layering:",
        layering_stacked: "Stacked",
        layering_cutout: "Cutout",
        gradient_step_label: "Gradient Step:",
        update_vectorization_btn: "Update Vectorization",
        // App View - Result Panel
        preview_h2: "Preview",
        zoom_out_title: "Zoom Out",
        zoom_reset_title: "Reset Zoom",
        zoom_in_title: "Zoom In",
        preview_original_label: "Original",
        preview_vectorized_label: "Vectorized",
        preview_placeholder_processing: "Processing...",
        preview_placeholder_loading: "Loading preview...",
        preview_placeholder_select: "SVG result will appear here",
        preview_placeholder_update_failed: "Update Failed",
        download_svg_btn: "Download SVG",
        // Footer
        footer_description: "Free online tool to convert raster images to scalable vector graphics (SVG).",
        footer_links_heading: "Links", // This key wasn't actually used in HTML, but kept for potential future use
        footer_home_link: "Home",
        footer_contact_link: "Contact",
        footer_legal_heading: "Legal", // This key wasn't actually used in HTML, but kept for potential future use
        footer_privacy_link: "Privacy Policy",
        footer_cookies_link: "Cookie Policy",
        footer_terms_link: "Terms of Service",
        footer_copyright: "© 2025 JonkaryStudio. All rights reserved.",
        footer_powered_by: "Powered by", // Keep key even if not used in HTML, for consistency
        footer_page1_link: "Page 1", // Example for new page links
        footer_page2_link: "Page 2",
        footer_page3_link: "Page 3",
        footer_page4_link: "Page 4",
        // Contact Page
        contact_h1: "Contact Us",
        contact_name_label: "Name",
        contact_name_placeholder: "Your name",
        contact_email_label: "Email",
        contact_email_placeholder: "Your email",
        contact_subject_label: "Subject",
        contact_subject_placeholder: "Message subject",
        contact_message_label: "Message",
        contact_message_placeholder: "Your message",
        contact_send_btn: "Send Message",
        contact_status_fill_fields: "Please fill out all required fields.",
        contact_status_invalid_email: "Please enter a valid email address.",
        contact_status_opening_email: "Opening your email client...",
        contact_status_complete_send: "Please complete sending the email via your email application.",
        contact_status_error_email: "Could not open email client. Please copy details manually to {recipient}.",
        // FAQ / Common Problems
        faq_h2: "Common Problems & Solutions",
        faq_p: "Here are some common issues you might encounter and how to resolve them.",
        faq_q_quality: "Image Quality Issues:",
        faq_q_quality_desc: "The converted SVG doesn't match the original image quality.",
        faq_solution_label: "Solution:",
        faq_a_quality: "Adjust the settings in the vectorization process. Increasing 'Color Detail' (palette size), adjusting 'Spline Threshold' (lower for more detail), or reducing 'Filter Speckle' can help. For pixel art, ensure the 'Pixel' mode is selected. Experiment with different presets.",
        faq_q_performance: "Performance Issues:",
        faq_q_performance_desc: "The conversion process is slow or unresponsive, or the resulting SVG is very large.",
        faq_a_performance: "Try reducing the image size or complexity before uploading. Large or highly detailed images take longer to process and generate larger SVGs. Lowering 'Color Detail' or increasing 'Filter Speckle' can also simplify the output and improve performance.",
        faq_q_detail_loss: "Loss of Fine Detail:",
        faq_q_detail_loss_desc: "Small elements or thin lines disappear in the SVG.",
        faq_a_detail_loss: "Reduce the 'Filter Speckle' value significantly (e.g., to 0 or 1). Ensure 'Path Precision' is adequate (though higher values increase file size). For spline mode, slightly lowering 'Spline Threshold' might capture more curves.",
        faq_q_jagged: "Jagged Edges (Polygon Mode):",
        faq_q_jagged_desc: "Lines appear blocky instead of smooth.",
        faq_a_jagged: "Switch the 'Mode' to 'Spline' for smoother curves. Polygon mode inherently creates straight line segments.",
        faq_q_colors: "Unexpected Colors:",
        faq_q_colors_desc: "The colors in the SVG look different or posterized.",
        faq_a_colors: "Ensure 'Color Mode' is set to 'Color'. Increase the 'Color Detail' setting (higher bit precision). Check if the 'Gradient Step' is appropriate; a very high value might reduce subtle color transitions.",
        faq_q_transparency: "Transparency Not Preserved:",
        faq_q_transparency_desc: "Background transparency from PNGs is lost.",
        faq_a_transparency: "`vtracer` generally handles transparency well, especially with 'Stacked' layering. Ensure your original PNG has actual transparency. If using 'Cutout' layering, transparency might behave differently. The underlying process might sometimes quantize near-transparent colors to opaque ones depending on settings.",
        faq_q_browser: "Browser Rendering Differences:",
        faq_q_browser_desc: "The SVG looks slightly different in various web browsers.",
        faq_a_browser: "This is inherent to SVG rendering engines. Ensure your SVG is well-formed. Avoid overly complex CSS or filters within the SVG if compatibility is critical. Test in major browsers.",
        // Legal Pages Shared
        legal_last_updated: "Last Updated:",
        legal_date_placeholder: "[Insert Date]", // Placeholder, should be updated manually or via build script
        legal_disclaimer: "Disclaimer: This is placeholder text. Consult a legal professional to create accurate and compliant policies.",
        // Privacy Page Specific
        privacy_h1: "Privacy Policy",
        privacy_intro_1: 'Welcome to Vectorise.Me (the "Service"), operated by JonkaryStudio ("us", "we", or "our"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
        privacy_h2_collection: "Information Collection and Use",
        privacy_collection_p1: "We collect several different types of information for various purposes to provide and improve our Service to you.",
        privacy_h3_types: "Types of Data Collected",
        privacy_h4_personal: "Personal Data",
        privacy_personal_p1: 'While using our Service, particularly when contacting us, we may ask you to provide us with certain personally identifiable information ("Personal Data"). This may include, but is not limited to:',
        privacy_personal_li_email: "Email address",
        privacy_personal_li_name: "Name",
        privacy_personal_p2: "We may also collect Usage Data as described below.",
        privacy_h4_image: "Image Data",
        privacy_image_p1: "When you upload an image for conversion, the image data is sent to our server for processing. We process the image solely for the purpose of converting it to SVG format as requested by you.",
        privacy_image_policy_placeholder: "[Specify Your Policy Here - e.g., Uploaded images and generated SVGs are not stored on our servers after processing and download link generation.]",
        privacy_image_policy_placeholder_alt: "[e.g., Uploaded images and generated SVGs are temporarily stored for a maximum of X hours to allow download and then automatically deleted.]",
        privacy_h4_usage: "Usage Data",
        privacy_usage_p1: 'We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include your computer\'s IP address, browser type, browser version, the pages visited, time and date of visit, time spent on pages, unique device identifiers, and other diagnostic data.',
        privacy_usage_analytics_placeholder: "[Mention if you use analytics like Google Analytics, Plausible, etc.]",
        privacy_h2_use: "Use of Data",
        privacy_use_p1: "JonkaryStudio uses the collected data for purposes such as:",
        privacy_use_li_provide: "Providing and maintaining the Service.",
        privacy_use_li_process: "Processing image conversion requests.",
        privacy_use_li_respond: "Responding to your contact inquiries.",
        privacy_use_li_improve: "Improving the Service based on usage analysis.",
        privacy_use_li_monitor: "Monitoring Service usage for stability and security.",
        privacy_use_li_detect: "Detecting, preventing, and addressing technical issues.",
        privacy_h2_transfer: "Transfer Of Data",
        privacy_transfer_p1: "Your information, including image data during processing, may be processed on servers located outside of your jurisdiction where data protection laws may differ. Your consent to this Privacy Policy followed by your use of the Service represents your agreement to that transfer.",
        privacy_transfer_p2: "We take reasonable steps to ensure data is treated securely.",
        privacy_h2_disclosure: "Disclosure Of Data",
        privacy_disclosure_placeholder: "[Describe limited circumstances for disclosure, e.g., to comply with legal obligations, protect rights, prevent wrongdoing, during business transfers if applicable.]",
        privacy_disclosure_p1: "We do not sell your Personal Data.",
        privacy_h2_security: "Security of Data",
        privacy_security_p1: "The security of your data is important. While we strive to use commercially acceptable means (like HTTPS) to protect data, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.",
        privacy_h2_providers: "Service Providers",
        privacy_providers_placeholder: "[Mention necessary third-party service providers like hosting (e.g., Vercel, Netlify, AWS) and analytics, if any.]",
        privacy_h2_links: "Links to Other Sites",
        privacy_links_p1: "Our Service may contain links to other sites. We have no control over and assume no responsibility for the content or practices of any third-party sites.",
        privacy_h2_children: "Children's Privacy",
        privacy_children_p1: "Our Service does not knowingly collect personally identifiable information from children under the age of ",
        privacy_children_age_placeholder: "[e.g., 13 or 16]",
        privacy_h2_changes: "Changes to This Privacy Policy",
        privacy_changes_p1: 'We may update this policy. We will notify you by posting the new policy on this page and updating the "Last Updated" date.',
        privacy_h2_contact: "Contact Us",
        privacy_contact_p1: "If you have questions, contact us:",
        privacy_contact_li_email: "By email: jonkarystudio@gmail.com",
        privacy_contact_li_web: "Via our website:",
        privacy_contact_page_link: "Contact Page",
        // Cookies Page Specific
        cookies_h1: "Cookie Policy",
        cookies_intro_1: 'This Cookie Policy explains how JonkaryStudio ("us", "we", or "our") uses cookies and similar tracking technologies on the Vectorise.Me website (the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.',
        cookies_h2_what: "What Are Cookies?",
        cookies_what_p1: "Cookies are small data files placed on your device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.",
        cookies_what_p2: 'Cookies set by the website owner (in this case, JonkaryStudio) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognise your computer both when it visits the website in question and also when it visits certain other websites.',
        cookies_h2_why: "Why Do We Use Cookies?",
        cookies_why_p1: 'We use first-party and possibly third-party cookies for several reasons. Some cookies are required for technical reasons for our Service to operate, and we refer to these as "essential" or "strictly necessary" cookies.',
        cookies_why_p2: "[Be specific about your usage. Modify/Remove sections as needed]:",
        cookies_why_li_essential: "Essential Cookies:",
        cookies_why_li_essential_verify: "[Verify if your specific hosting/framework uses essential session cookies].",
        cookies_why_li_performance: "Performance and Functionality Cookies:",
        cookies_why_li_performance_verify: "[Currently, the provided code likely doesn't use these. Remove if not applicable.]",
        cookies_why_li_analytics: "Analytics and Customization Cookies:",
        cookies_why_li_analytics_verify: "[Specify if you use Google Analytics or similar tools.]",
        cookies_why_li_advertising: "Advertising Cookies:",
        cookies_why_li_advertising_verify: "[Remove if you do not display ads.]",
        cookies_why_p3: "The specific types of first and third-party cookies served through our Service and the purposes they perform are described in more detail below",
        cookies_why_p3_detail: "[Ideally, list specific cookies if possible, especially third-party ones like Google Analytics `_ga`, `_gid`].",
        cookies_h2_control: "How Can I Control Cookies?",
        cookies_control_p1: "You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls.",
        cookies_control_p2: "Most browsers allow you to:",
        cookies_control_li_view: "See what cookies you've got and delete them on an individual basis.",
        cookies_control_li_block_third: "Block third-party cookies.",
        cookies_control_li_block_site: "Block cookies from particular sites.",
        cookies_control_li_block_all: "Block all cookies from being set.",
        cookies_control_li_delete: "Delete all cookies when you close your browser.",
        cookies_control_p3: "You should be aware that any preferences will be lost if you delete cookies. If you choose to block cookies completely, many websites will not work properly as certain functionality relies on them.",
        cookies_control_p4: "Find out how to manage cookies on popular browsers:",
        cookies_control_link_chrome: "Google Chrome",
        cookies_control_link_edge: "Microsoft Edge",
        cookies_control_link_firefox: "Mozilla Firefox",
        cookies_control_link_safari: "Apple Safari",
        cookies_control_p5: "To find information relating to other browsers, visit the browser developer's website.",
        cookies_control_banner_placeholder: "[Consider adding a Cookie Consent Banner/Tool if required by regulations like GDPR/CCPA to manage non-essential cookies.]",
        cookies_h2_changes: "Changes to This Cookie Policy",
        cookies_changes_p1: "We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed.",
        cookies_h2_contact: "Contact Us",
        cookies_contact_p1: "If you have any questions about our use of cookies or other technologies, please contact us:",
        cookies_contact_li_email: "By email: jonkarystudio@gmail.com",
        cookies_contact_li_web: "Via our website:",
        cookies_contact_page_link: "Contact Page",
        // Terms Page Specific
        terms_h1: "Terms of Service",
        terms_intro_1: 'Please read these Terms of Service ("Terms") carefully before using the Vectorise.Me website (the "Service") operated by JonkaryStudio ("us", "we", or "our").',
        terms_intro_2: "Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.",
        terms_intro_3: "By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.",
        terms_h2_license: "Use License",
        terms_license_p1: "Permission is granted to temporarily use the materials (information or software) on Vectorise.Me's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
        terms_license_li_modify: "modify or copy the materials (except for the generated SVG output from your own images);",
        terms_license_li_commercial: "use the materials for any commercial purpose, or for any public display (commercial or non-commercial), except for the SVG output derived from your own content;",
        terms_license_li_reverse: "attempt to decompile or reverse engineer any software contained on Vectorise.Me's website;",
        terms_license_li_remove: "remove any copyright or other proprietary notations from the materials; or",
        terms_license_li_transfer: 'transfer the materials to another person or "mirror" the materials on any other server.',
        terms_license_p2: "This license shall automatically terminate if you violate any of these restrictions and may be terminated by JonkaryStudio at any time.",
        terms_h2_content: "Uploaded Content",
        terms_content_p1: 'You are solely responsible for the images you upload to the Service ("User Content"). You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to your User Content and you authorize us to use your User Content solely for the purpose of providing the Service (i.e., converting the image to SVG).',
        terms_content_p2: "You agree not to upload User Content that is illegal, infringing, defamatory, obscene, or otherwise harmful.",
        terms_content_p3: "We claim no ownership rights over your User Content or the resulting SVG files generated by the Service from your User Content.",
        terms_h2_disclaimer: "Disclaimer",
        terms_disclaimer_p1: "The materials and services on Vectorise.Me's website are provided on an 'as is' basis. JonkaryStudio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
        terms_disclaimer_p2: "Further, JonkaryStudio does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. The conversion process may not be perfect and results can vary based on the source image and selected settings.",
        terms_h2_limitations: "Limitations",
        terms_limitations_p1: "In no event shall JonkaryStudio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials or Service on Vectorise.Me's website, even if JonkaryStudio or a JonkaryStudio authorized representative has been notified orally or in writing of the possibility of such damage.",
        terms_h2_accuracy: "Accuracy of Materials",
        terms_accuracy_p1: "The materials appearing on Vectorise.Me's website could include technical, typographical, or photographic errors. JonkaryStudio does not warrant that any of the materials on its website are accurate, complete or current.",
        terms_h2_modifications: "Modifications to Service and Terms",
        terms_modifications_p1: "JonkaryStudio may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service. We may also modify or discontinue the Service at any time.",
        terms_h2_governing: "Governing Law",
        terms_governing_p1: "These terms and conditions are governed by and construed in accordance with the laws of ",
        terms_governing_jurisdiction_placeholder: "[Your Jurisdiction, e.g., the State of California, USA]",
        terms_governing_p2: "and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
        terms_h2_contact: "Contact Us",
        terms_contact_p1: "If you have any questions about these Terms, please contact us:",
        terms_contact_li_email: "By email: jonkarystudio@gmail.com",
        terms_contact_li_web: "Via our website:",
        terms_contact_page_link: "Contact Page",
        // Dynamic Status Messages
        status_uploading: "Uploading...",
        status_vectorizing: "Vectorizing...",
        status_updating: "Updating...",
        status_processing: "Processing...",
        status_working: "Working...", // Added for button text during processing
        status_updating_preview: "Updating preview...",
        status_complete: "Complete!",
        status_options_reset: "Options reset to default.",
        status_preset_loaded: "Preset \"{presetName}\" loaded.",
        status_settings_saved: "Settings saved.",
        status_error_saving_settings: "Error saving settings.",
        status_error_loading_settings: "Error loading settings: {errorMessage}",
        status_error_reading_file: "Error reading settings file.",
        status_error_invalid_json: "Invalid JSON structure.",
        status_error_no_options: "JSON does not contain recognizable options.",
        status_error_select_json: "Error: Please select a valid .json settings file.",
        status_settings_loaded: "Settings loaded successfully.",
        status_error_downloading: "Error preparing download.",
        status_error_generic: "Error: {errorMessage}",
        status_error_file_size: "Error: File exceeds 15MB limit.",
        status_error_file_type: "Error: Unsupported file type ({fileType}). Please use JPG, PNG, WEBP, or BMP.",
        status_no_file: "No file selected.",
        status_error_obj_url: "Error creating object URL: {errorMessage}",
        status_error_conversion_failed: "Conversion Failed: {errorMessage}",
        status_error_no_svg: "No SVG data received from server.",
        // Presets (Must match keys used in preset definition)
        preset_name_general: "General / Balanced",
        preset_name_pixel: "Pixel Art",
        preset_name_technical: "Technical Drawing / Blueprint",
        preset_name_illustration: "Illustration / Graphic",
        preset_name_clipart: "Clipart / Logo",
        preset_name_cartoon: "Cartoon / Flat Style",
        preset_name_photograph: "Photograph",
    },
    // --- German (de) ---
    de: {
        lang_name: "Deutsch",
        // Add DE translations using the updated English keys (e.g., corner_threshold_label)
        // ... (Rest of DE translations) ...
        corner_threshold_label: "[DE] Eckenschwellenwert:",
        path_precision_label: "[DE] Pfadpräzision:",
        unit_decimals: "[DE] Dezimalst.",
        spline_threshold_label: "[DE] Spline-Schwellenwert:",
        splice_threshold_label: "[DE] Splice-Schwellenwert:",
        segment_length_label: "[DE] Segmentlänge:",
        // ... etc
    },
    // --- Spanish (es) ---
    es: {
        lang_name: "Español",
        // Add ES translations using the updated English keys
        // ... (Rest of ES translations) ...
        corner_threshold_label: "[ES] Umbral de esquina:",
        path_precision_label: "[ES] Precisión de ruta:",
        unit_decimals: "[ES] decimales",
        spline_threshold_label: "[ES] Umbral de spline:",
        splice_threshold_label: "[ES] Umbral de empalme:",
        segment_length_label: "[ES] Longitud de segmento:",
        // ... etc
    },
    // --- French (fr) ---
    fr: {
        lang_name: "Français",
        // Add FR translations using the updated English keys
        // ... (Rest of FR translations) ...
        corner_threshold_label: "[FR] Seuil d'angle :",
        path_precision_label: "[FR] Précision du tracé :",
        unit_decimals: "[FR] décimales",
        spline_threshold_label: "[FR] Seuil de spline :",
        splice_threshold_label: "[FR] Seuil d'épissure :",
        segment_length_label: "[FR] Longueur du segment :",
        // ... etc
    },
    // --- Other languages ... update their keys similarly ---
     // ... (Hindi, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Thai, Turkish, Vietnamese, zh-CN, zh-TW, Arabic) ...
};


document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    // No changes needed here, IDs remain the same
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const landingStatusArea = document.getElementById('landingStatusArea');
    const uploadArea = document.getElementById('uploadArea');
    const dropZone = document.getElementById('dropZone');
    const fileInfoArea = document.getElementById('fileInfoArea');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const uploadNewBtn = document.getElementById('uploadNewBtn');
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn');
    const statusArea = document.getElementById('statusArea');
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');
    const svgOutputDiv = document.getElementById('svgOutput');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadLink = document.getElementById('downloadLink');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const paletteSelect = document.getElementById('optPalette');
    const colorPrecisionInput = document.getElementById('optColorPrecision');
    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const colorPrecisionGroup = document.getElementById('groupColorPrecision');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const pathPrecisionGroup = document.getElementById('groupPathPrecision'); // Added reference
    const paletteGroup = document.getElementById('groupPalette');
    const presetSelect = document.getElementById('presetSelect');
    const saveOptionsBtn = document.getElementById('saveOptionsBtn');
    const loadOptionsBtn = document.getElementById('loadOptionsBtn');
    const optionsFileInput = document.getElementById('optionsFileInput');
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');
    const languageToggleBtn = document.getElementById('languageToggleBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguageNameSpan = document.getElementById('currentLanguageName');

    // --- State Variables ---
    let currentFile = null;
    let currentFileObjectURL = null;
    let currentFilenameBase = 'vectorised-image';
    let currentSvgContent = '';
    const defaultOptions = {}; // Will be populated on init
    let scale = 1;
    const MIN_SCALE = 0.1; // Allow slightly more zoom out
    const MAX_SCALE = 12; // Allow slightly more zoom in
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };
    let currentLang = 'en'; // Set by getInitialLanguage()
    let statusClearTimer;
    let previewSizeDebounceTimer;

    // --- Preset Definitions (Keys MUST match preset_name_* translation keys) ---
    const presets = [
        // Defaults stored separately, 'general' preset will just reset to them
        { key: "general", name: "General / Balanced", options: {} }, // Options populated by storeDefaultOptions
        // Explicit options for specific presets
        { key: "pixel", name: "Pixel Art", options: { color_mode: "color", hierarchical: "stacked", filter_speckle: "0", palette_selector: "8", color_precision: "8", mode: "pixel", gradient_step: "0", corner_threshold: "60", path_precision: "3", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4" } },
        { key: "technical", name: "Technical Drawing / Blueprint", options: { color_mode: "bw", filter_speckle: "2", mode: "polygon", corner_threshold: "60", path_precision: "3", hierarchical: "stacked", palette_selector: "6", color_precision: "6", gradient_step: "2", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4" } },
        { key: "illustration", name: "Illustration / Graphic", options: { color_mode: "color", hierarchical: "stacked", filter_speckle: "4", palette_selector: "8", color_precision: "8", gradient_step: "5", mode: "spline", corner_threshold: "60", path_precision: "3", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4" } },
        { key: "clipart", name: "Clipart / Logo", options: { color_mode: "color", hierarchical: "stacked", filter_speckle: "1", palette_selector: "6", color_precision: "6", gradient_step: "0", mode: "spline", corner_threshold: "80", path_precision: "3", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4" } },
        { key: "cartoon", name: "Cartoon / Flat Style", options: { color_mode: "color", hierarchical: "stacked", filter_speckle: "2", palette_selector: "5", color_precision: "5", gradient_step: "1", mode: "spline", corner_threshold: "60", path_precision: "3", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4" } },
        { key: "photograph", name: "Photograph", options: { color_mode: "color", hierarchical: "stacked", filter_speckle: "6", palette_selector: "8", color_precision: "8", gradient_step: "8", mode: "spline", corner_threshold: "100", path_precision: "3", spline_threshold: "0.75", splice_threshold: "45", segment_length: "4" } }
    ];

    // --- Helper: Safe Event Listener ---
    function safeAddListener(element, event, handler, options) {
        if (element && typeof handler === 'function') {
            element.addEventListener(event, handler, options);
        } else if (!element && event !== 'DOMContentLoaded' && event !== 'load' && event !== 'resize' && event !== 'click' && event !== 'submit' && event !== 'input' && event !== 'change') {
             // Filter out common global listeners to reduce noise
            console.warn(`Element not found for listener registration: event '${event}' on path: ${window.location.pathname}. Check element ID/selector.`);
        }
    }

    // --- Translation Functions ---
    function getTranslation(key, lang = currentLang, replacements = {}) {
        const langDict = translations[lang] || translations.en;
        let text = langDict[key] || translations.en[key]; // Fallback: current lang -> english

        if (text === undefined) { // If key not found even in English
            console.warn(`Translation key missing: "${key}"`);
            return `_${key}_`; // Return key placeholder
        }

        for (const placeholder in replacements) {
            // Use a regex for global replacement to handle multiple occurrences
            const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
            text = text.replace(regex, replacements[placeholder]);
        }
        return text;
    }

    function translatePage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr'; // Handle RTL for Arabic

        // Translate elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            const translation = getTranslation(key, lang);
            // Only update if translation is not the placeholder key itself
            if (translation !== `_${key}_`) {
                 el.textContent = translation;
            } else if (el.dataset.fallbackText) {
                 el.textContent = el.dataset.fallbackText; // Use fallback if defined
            }
        });

        // Translate attributes like placeholder, title
        document.querySelectorAll('[data-translate-placeholder], [data-translate-title]').forEach(el => {
            const placeholderKey = el.dataset.translatePlaceholder;
            const titleKey = el.dataset.translateTitle;

            if (placeholderKey) {
                const translation = getTranslation(placeholderKey, lang);
                if (translation !== `_${placeholderKey}_`) {
                    el.placeholder = translation;
                } else if (el.dataset.fallbackPlaceholder) {
                    el.placeholder = el.dataset.fallbackPlaceholder;
                }
            }
            if (titleKey) {
                 const translation = getTranslation(titleKey, lang);
                 if (translation !== `_${titleKey}_`) {
                    el.title = translation;
                } else if (el.dataset.fallbackTitle) {
                     el.title = el.dataset.fallbackTitle;
                 }
            }
        });

        // Update specific dynamic elements
        if (currentLanguageNameSpan) {
            // Use the specific language's name (e.g., 'Deutsch', 'Español')
            currentLanguageNameSpan.textContent = getTranslation('lang_name', lang);
        }
        if (presetSelect) {
            populatePresetSelect(); // Ensure dropdown options are (re)translated
        }
        if (optionsForm) {
            // Update specific labels if needed (e.g., units that change with language)
            const unitSpan = pathPrecisionGroup?.querySelector('.unit');
            if (unitSpan) {
                unitSpan.textContent = getTranslation('unit_decimals');
            }
            // Update other dynamic texts within the form if they exist
        }
        // Ensure button texts reflect current state and language
        updateButtonTranslations();

        // Retranslate status messages if they are currently displayed
        retranslateStatus(statusArea);
        retranslateStatus(landingStatusArea);
        retranslateStatus(contactFormStatus);

        // Update layout dependent sizes after potential text length changes
        debounceCalculateAndApplyWrapperSize(50);
    }

    // Helper to update common button translations based on state
    function updateButtonTranslations() {
        if (convertBtn) {
            const key = convertBtn.disabled && (convertBtn.textContent === getTranslation('status_working') || !currentSvgContent)
                        ? 'update_vectorization_btn' // Should show 'Update' when disabled and not working or no SVG yet
                        : (convertBtn.textContent === getTranslation('status_working')
                            ? 'status_working' // Keep showing 'Working' if currently processing
                            : 'update_vectorization_btn'); // Otherwise, show 'Update'
            convertBtn.textContent = getTranslation(key);
        }
        if (startConversionBtn && !startConversionBtn.classList.contains('hidden')) {
             startConversionBtn.textContent = getTranslation('vectorize_image_btn');
        }
        if (downloadBtn) {
            downloadBtn.textContent = getTranslation('download_svg_btn');
        }
        if(resetOptionsBtn) {
             const btnTextSpan = resetOptionsBtn.querySelector('.btn-text') || resetOptionsBtn;
             btnTextSpan.textContent = getTranslation('reset_btn');
        }
        if(loadOptionsBtn) {
             const btnTextSpan = loadOptionsBtn.querySelector('.btn-text') || loadOptionsBtn;
             btnTextSpan.textContent = getTranslation('load_btn');
        }
         if(saveOptionsBtn) {
             const btnTextSpan = saveOptionsBtn.querySelector('.btn-text') || saveOptionsBtn;
             btnTextSpan.textContent = getTranslation('save_btn');
        }
    }

    // Retranslates a specific status area if it's currently showing a message
    function retranslateStatus(targetStatusArea) {
        if (!targetStatusArea) return;
        const currentKey = targetStatusArea.dataset.currentStatusKey;
        if (currentKey && targetStatusArea.style.display !== 'none') {
            const currentReplacements = JSON.parse(targetStatusArea.dataset.currentStatusReplacements || '{}');
            const retranslatedMsg = getTranslation(currentKey, currentLang, currentReplacements);
             if (retranslatedMsg !== `_${currentKey}_`) {
                 targetStatusArea.textContent = retranslatedMsg;
             }
        }
    }

    // Sets the current language, updates UI, and saves preference
    function setLanguage(lang) {
        if (!translations[lang]) {
            lang = 'en'; // Default to English if language not found
        }
        translatePage(lang); // Translate all elements
        try {
            localStorage.setItem('vectoriseLang', lang); // Save preference
        } catch (e) { console.warn("Could not save language preference to localStorage.", e); }

        // Update language dropdown state
        if (languageToggleBtn && languageDropdown) {
            languageToggleBtn.setAttribute('aria-expanded', 'false');
            languageDropdown.classList.add('hidden');
        }
    }

    // Determines initial language based on saved pref, browser, or default 'en'
    function getInitialLanguage() {
        let savedLang = null;
        try { savedLang = localStorage.getItem('vectoriseLang'); } catch (e) {}
        // Use full locale first, then just language code for broader match
        const browserLocale = navigator.language;
        const browserLang = browserLocale?.split('-')[0];

        return (savedLang && translations[savedLang]) ? savedLang : // Priority 1: Saved
               (browserLocale && translations[browserLocale]) ? browserLocale : // Priority 2: Full Browser Locale (e.g., 'zh-CN')
               (browserLang && translations[browserLang]) ? browserLang : // Priority 3: Base Browser Lang (e.g., 'en')
               'en'; // Default: English
    }

    // --- UI Update Functions ---
    function showLandingView() {
        if(landingView) landingView.classList.remove('hidden');
        if(appView) appView.classList.add('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.add('hidden');
        resetUploadAreaVisuals();
        // Potentially set document title specific to landing page if needed
        // document.title = getTranslation('meta_title_main_short');
    }

    function showAppView() {
        if(landingView) landingView.classList.add('hidden');
        if(appView) appView.classList.remove('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.remove('hidden');
        updateOptionsAvailability();
        resetResultArea(); // Clear previous results but keep status intact
        resetZoomPan();
        // Optionally set document title for the app view if needed
        // document.title = getTranslation('meta_title_app') || getTranslation('meta_title_main_short');

        // Recalculate preview sizes after view switch and potential layout shifts
        debounceCalculateAndApplyWrapperSize(50); // Debounce slightly
    }

    // Resets the initial upload area on the landing page
    function resetUploadAreaVisuals(){
        if(dropZone) dropZone.style.display = 'flex'; // Ensure drop zone is visible
        if(fileInfoArea) fileInfoArea.classList.add('hidden');
        if(uploadProgress) uploadProgress.classList.add('hidden');
        if(startConversionBtn) startConversionBtn.classList.add('hidden');
        if(uploadArea) uploadArea.classList.remove('file-selected');
        if(progressBar) progressBar.style.width = '0%';
        if (fileNameDisplay) fileNameDisplay.textContent = '';
        // Clear any previous landing error message
        updateStatus('', '', 0, false);
    }

    // Resets the entire app state back to the initial landing page
    function resetAppToLanding() {
        currentFile = null;
        currentSvgContent = '';
        if (imageInput) imageInput.value = ''; // Clear file input selection
        if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
        if (previewOriginalImage) previewOriginalImage.removeAttribute('src');
        originalImageNaturalDims = { width: 0, height: 0 };

        resetZoomPan(); // Reset zoom/pan state

        // Reset image wrapper styles explicitly to avoid leftover transform/size
        if (originalImageWrapper) { originalImageWrapper.style.width = ''; originalImageWrapper.style.height = ''; originalImageWrapper.style.transform = ''; }
        if (vectorImageWrapper) { vectorImageWrapper.style.width = ''; vectorImageWrapper.style.height = ''; vectorImageWrapper.style.transform = ''; }

        // Reset options form to its default values
        handleResetOptions(false); // Reset without showing status message

        // Switch view visibility
        showLandingView();

        // Clear status messages in both areas
        updateStatus('', '', 0, false); // Clear landing status
        updateStatus('', '', 0, true); // Clear app status

        // Ensure buttons are in correct initial state
        if (convertBtn) { convertBtn.disabled = true; updateButtonTranslations(); }
        if (downloadBtn) downloadBtn.disabled = true;
    }

    // Updates the status message area (app or landing)
    function updateStatus(messageKey, type = 'info', clearDelay = 0, isAppStatus = true, replacements = {}) {
        const targetStatusArea = isAppStatus ? statusArea : landingStatusArea;
        if (!targetStatusArea) return;

        clearTimeout(statusClearTimer); // Clear any existing auto-clear timer

        const message = messageKey ? getTranslation(messageKey, currentLang, replacements) : '';

        // Store key and replacements for potential re-translation on language change
        targetStatusArea.dataset.currentStatusKey = messageKey || '';
        targetStatusArea.dataset.currentStatusReplacements = JSON.stringify(replacements);
        targetStatusArea.dataset.currentStatusType = type; // Store type as well

        targetStatusArea.textContent = message;
        targetStatusArea.className = `status-area ${isAppStatus ? 'app-status' : 'landing-status'} ${type || ''}`.trim();

        // Control visibility based on whether there's a message
        targetStatusArea.style.display = message ? '' : 'none';

        // Auto-clear message after delay (except for errors)
        if (type !== 'error' && clearDelay > 0 && messageKey) {
             statusClearTimer = setTimeout(() => {
                // Only clear if the message hasn't been replaced by another one
                if(targetStatusArea.dataset.currentStatusKey === messageKey) {
                    targetStatusArea.textContent = '';
                    targetStatusArea.style.display = 'none';
                    delete targetStatusArea.dataset.currentStatusKey; // Clear stored data
                    delete targetStatusArea.dataset.currentStatusReplacements;
                    delete targetStatusArea.dataset.currentStatusType;
                }
            }, clearDelay);
        }

        // Log errors to console for easier debugging
        if (type === 'error' && messageKey) {
            console.error(`UI Status (${isAppStatus ? 'App' : 'Landing'}):`, message);
        }
    }

    // Specifically for showing file validation errors on landing page (doesn't use translation keys)
    function showLandingError(message) {
        if (landingStatusArea) {
             landingStatusArea.textContent = message; // Direct message, not key
             landingStatusArea.className = 'status-area landing-status error';
             landingStatusArea.style.display = '';
             // Clear stored key info as this is a direct message
             delete landingStatusArea.dataset.currentStatusKey;
             delete landingStatusArea.dataset.currentStatusReplacements;
             delete landingStatusArea.dataset.currentStatusType;
        } else {
             console.error("Landing Error (Status Area Not Found):", message);
        }
    }

    // --- Event Handlers ---

    // Drag and Drop Handlers
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); /* Required to allow drop */ }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); const files = e.dataTransfer?.files; if (files && files.length > 0) handleFile(files[0]); }

    // File Input Change Handler
    function handleFileSelectChange(event) {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        } else {
            // If user cancels file selection, reset relevant parts
            currentFile = null;
            if (!appView || appView.classList.contains('hidden')) { // Only reset landing visuals if on landing page
                resetUploadAreaVisuals();
            }
            // Could potentially clear preview in app view too if desired
        }
    }

    // Core File Handling Logic (called by Drop or Input Change)
    function handleFile(file) {
        if (!file) return; // Should not happen if called correctly
        updateStatus('', '', 0, false); // Clear any previous landing status message

        // 1. Validate File
        const validationError = validateFile(file);
        if (validationError) {
            // Show error only if on landing page
            if (!appView || appView.classList.contains('hidden')) {
                showLandingError(validationError);
                resetUploadAreaVisuals(); // Reset dropzone visuals
                if(imageInput) imageInput.value = ''; // Clear input selection
            } else {
                // Show error in app view status if already there
                updateStatus('status_error_file_type', 'error', 0, true, { fileType: file.type || 'unknown' }); // Or specific size error
            }
            currentFile = null; // Discard invalid file
            return;
        }

        // 2. Update State
        currentFile = file;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        // Revoke previous object URL to free memory
        if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
        originalImageNaturalDims = { width: 0, height: 0 }; // Reset dims

        // Clear existing previews and transformations
        if (previewOriginalImage) previewOriginalImage.removeAttribute('src');
        if(originalImageWrapper) { originalImageWrapper.style.width=''; originalImageWrapper.style.height=''; originalImageWrapper.style.transform=''; }
        if(vectorImageWrapper) { vectorImageWrapper.style.width=''; vectorImageWrapper.style.height=''; vectorImageWrapper.style.transform=''; }
        resetZoomPan(); // Reset pan/zoom state

        // 3. Create Object URL for Preview
        try {
            currentFileObjectURL = URL.createObjectURL(file);
            if (previewOriginalImage) {
                previewOriginalImage.src = currentFileObjectURL; // Load original preview
            } else {
                 throw new Error("Original preview image element not found.");
            }
        } catch(e) {
            const errorMsg = getTranslation('status_error_obj_url', currentLang, { errorMessage: e.message });
            // Show error appropriately
            if (!appView || appView.classList.contains('hidden')) {
                 showLandingError(errorMsg);
                 resetUploadAreaVisuals();
            } else {
                 updateStatus('status_error_obj_url', 'error', 0, true, { errorMessage: e.message });
            }
            currentFile = null;
            if(imageInput) imageInput.value = '';
            return;
        }

        // 4. Update UI based on current view
        if(!appView || appView.classList.contains('hidden')) { // On Landing View
            if (fileNameDisplay) fileNameDisplay.textContent = file.name;
            if (fileInfoArea) fileInfoArea.classList.remove('hidden');
            if (dropZone) dropZone.style.display = 'none'; // Hide drop zone
            if (uploadProgress) uploadProgress.classList.add('hidden');
            if (startConversionBtn) {
                 startConversionBtn.classList.remove('hidden'); // Show vectorize button
                 updateButtonTranslations(); // Ensure button text is correct
            }
            if (uploadArea) uploadArea.classList.add('file-selected'); // Style the outer container
        } else { // Already in App View
             handleOptionsFormChange(); // Enable 'Update Vectorization' button
             resetResultArea(false); // Clear SVG output, keep original preview loading
             debounceCalculateAndApplyWrapperSize(100); // Recalculate size after image starts loading
        }
    }

    // Handler for the initial "Vectorize Image" button on landing page
    function triggerConversionFromLanding() {
        if (!currentFile || !startConversionBtn || !landingView) {
            console.warn("Conversion trigger from landing: conditions not met.");
            return;
        }

        startConversionBtn.disabled = true; // Disable button temporarily
        startConversionBtn.textContent = getTranslation('status_processing'); // Indicate action
        // Hide file info temporarily, show progress bar
        //if (fileInfoArea) fileInfoArea.style.display = 'none';
        if (uploadProgress) {
             uploadProgress.classList.remove('hidden');
             if (progressBar) progressBar.style.width = '0%';
        }
        updateStatus('', '', 0, false); // Clear any previous landing status

        // Simulate a short "upload" delay before switching views
        simulateUploadProgress(() => {
             if (uploadProgress) uploadProgress.classList.add('hidden');
             // Reset button state before switching views
             startConversionBtn.disabled = false;
             startConversionBtn.classList.add('hidden'); // Hide it now we're leaving landing
             if(fileInfoArea) fileInfoArea.classList.add('hidden'); // Ensure file info is hidden
             showAppView();
             // Use setTimeout to ensure view transition completes before heavy work
             setTimeout(() => handleConvert(true), 50); // Start actual conversion in app view
        });
    }

    // Handles the actual conversion process (called initially or on update)
    async function handleConvert(isInitial = false) {
        if (!currentFile) {
             console.error("handleConvert called but currentFile is null.");
             updateStatus('status_no_file', 'error', 0, true);
             // If initial conversion fails without file, revert to landing page
             if (isInitial && landingView && (!appView || appView.classList.contains('hidden'))) {
                 resetAppToLanding();
             }
             return;
        }
        if (!convertBtn || !downloadBtn || !appView) {
            console.error("handleConvert called but required UI elements are missing.");
            return;
        }

        // --- Update UI for Loading State ---
        const statusKey = isInitial ? 'status_vectorizing' : 'status_updating';
        updateStatus(statusKey, 'loading', 0, true); // Show "Vectorizing..." or "Updating..."

        convertBtn.disabled = true; // Disable update button during process
        convertBtn.textContent = getTranslation('status_working'); // Set button text to "Working..."
        downloadBtn.disabled = true; // Disable download button

        // Show placeholder text in SVG output area
        if (svgOutputDiv) {
            const placeholderKey = isInitial ? 'preview_placeholder_processing' : 'preview_placeholder_loading';
            svgOutputDiv.innerHTML = `<p class="placeholder-text">${getTranslation(placeholderKey)}</p>`;
            svgOutputDiv.classList.add('placeholder-active'); // Add class to potentially style placeholder
        }

        // --- Prepare Form Data ---
        const formData = new FormData();
        formData.append('imageFile', currentFile); // The image itself

        // Append currently selected and enabled options from the form
        if (optionsForm) {
            const data = new FormData(optionsForm);
            for (let [key, value] of data.entries()) {
                const el = optionsForm.elements[key];
                // Include if element exists, is not disabled, has a value, and isn't the dummy palette selector key
                if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') {
                    formData.append(key, value);
                }
            }
        }

        console.log("Sending data for conversion:", Object.fromEntries(formData)); // Log for debugging

        // --- Make API Call ---
        try {
            const response = await fetch('/convert', { method: 'POST', body: formData });

            // Check for server-side errors (non-2xx status)
            if (!response.ok) {
                let errorMsg = `Server error: ${response.status} ${response.statusText}`;
                try {
                    // Attempt to parse JSON error from server response body
                    const errorResult = await response.json();
                    if (errorResult && errorResult.error) {
                         errorMsg = errorResult.error; // Use server-provided error message
                    }
                } catch (parseError) {
                    // If response wasn't JSON or parsing failed, use the basic status error
                    console.warn("Could not parse error response body:", parseError);
                }
                throw new Error(errorMsg); // Throw with the best error message available
            }

            // --- Process Successful Response ---
            const result = await response.json();

            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) {
                    svgOutputDiv.innerHTML = currentSvgContent; // Display the SVG
                    svgOutputDiv.classList.remove('placeholder-active');
                }
                updateStatus('status_complete', 'success', 3000, true); // Show "Complete!"
                downloadBtn.disabled = false; // Enable download
                convertBtn.disabled = true; // Keep update disabled until options change again
                updateButtonTranslations(); // Reset button text

                // Calculate and apply preview sizes AFTER SVG is potentially rendered
                debounceCalculateAndApplyWrapperSize(100);
                // Reset zoom/pan ONLY on the very first conversion
                if(isInitial) { resetZoomPan(); }

            } else {
                // Successful response, but no SVG data found (unexpected)
                throw new Error(getTranslation('status_error_no_svg'));
            }

        } catch (error) {
            // --- Handle Errors (Fetch or Server-Side) ---
            console.error('Conversion Failed:', error);
            const errorMessage = error.message || "An unknown error occurred.";
            updateStatus('status_error_conversion_failed', 'error', 0, true, { errorMessage: errorMessage });

            if (svgOutputDiv) {
                 // Show specific error message in preview area
                 const errorText = getTranslation('status_error_conversion_failed', currentLang, {errorMessage: errorMessage});
                 svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">${errorText}</p>`;
                 svgOutputDiv.classList.add('placeholder-active');
            }
            downloadBtn.disabled = true; // Ensure download remains disabled
            convertBtn.disabled = !currentFile; // Re-enable update button only if a file is still loaded
            updateButtonTranslations(); // Update button text
        }
    }

    // Handler for when any option in the form changes
    function handleOptionsFormChange() {
        if (!optionsForm) return;
        // Sync hidden color_precision input with the visible palette_selector dropdown
        if (paletteSelect && colorPrecisionInput) {
            colorPrecisionInput.value = paletteSelect.value;
        }

        // Only enable the 'Update Vectorization' button if a file is currently loaded
        if (currentFile && convertBtn) {
            convertBtn.disabled = false; // Enable the button
            updateButtonTranslations(); // Ensure text is 'Update Vectorization'
        }

        updateOptionsAvailability(); // Enable/disable options based on mode/color selections
        resetPresetSelection(); // Clear preset dropdown if options are manually changed
    }

    // Handler for the "Reset" options button
    function handleResetOptions(showStatus = true) {
        if (!optionsForm) return;

        // Retrieve the stored default options
        const defaultsToApply = presets.find(p => p.key === 'general')?.options || defaultOptions;
        applyOptions(defaultsToApply); // Apply the defaults to the form

        if (showStatus) {
            updateStatus('status_options_reset', 'success', 2000, true); // Show confirmation
        }
        resetPresetSelection(); // Clear preset dropdown

        // Disable update button after reset, as options match the last generated (or initial state)
        if (convertBtn) {
            convertBtn.disabled = true;
            updateButtonTranslations();
        }
        updateOptionsAvailability(); // Ensure conditional options are correctly enabled/disabled
    }

    // Handler for when a preset is selected from the dropdown
    function handlePresetChange(event) {
        if (!presetSelect) return;
        const selectedIndex = event.target.value;
        // Ignore if the placeholder ("") or an invalid index is selected
        if (selectedIndex === "" || !presets[selectedIndex]) return;

        const selectedPreset = presets[selectedIndex];
        applyOptions(selectedPreset.options); // Apply the selected preset's options

        // Show status message indicating which preset was loaded
        const presetNameKey = `preset_name_${selectedPreset.key}`;
        const presetName = getTranslation(presetNameKey) || selectedPreset.name; // Use translated name or fallback
        updateStatus('status_preset_loaded', 'info', 3000, true, { presetName: presetName });

        // Keep the dropdown showing the selected preset (visual confirmation)
        presetSelect.value = selectedIndex;

        // Enable the 'Update Vectorization' button if a file is loaded
        if (currentFile && convertBtn) {
            convertBtn.disabled = false;
            updateButtonTranslations();
        }
        updateOptionsAvailability(); // Update conditional fields based on preset options
    }

    // Handler for the "Save" options button
    function handleSaveOptions() {
        if (!optionsForm || !downloadLink) return;
        const currentOptions = {};
        const formData = new FormData(optionsForm);

        // Iterate over known default keys to ensure we only save relevant options
        Object.keys(defaultOptions).forEach(key => {
            if (formData.has(key)) {
                const el = optionsForm.elements[key];
                // Save if the element exists and is not disabled
                if (el && !el.disabled) {
                    currentOptions[key] = formData.get(key);
                }
            }
        });

        try {
            // Create JSON string and trigger download
            const jsonString = JSON.stringify(currentOptions, null, 2); // Pretty print JSON
            const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'vectorise-options.json'; // Suggest filename
            downloadLink.click(); // Programmatically click the hidden link
            URL.revokeObjectURL(url); // Clean up the object URL
            updateStatus('status_settings_saved', 'success', 2000, true); // Confirm save
        } catch (e) {
            console.error('Error saving options:', e);
            updateStatus('status_error_saving_settings', 'error', 0, true);
        }
    }

    // Handler for when a file is selected via the hidden "Load Options" input
    function handleLoadOptionsFile(event) {
        const file = event.target.files?.[0];
        if (!file) {
             if(optionsFileInput) optionsFileInput.value = ''; // Reset input if no file selected
             return;
        }

        // Validate file type
        if (file.type !== 'application/json') {
            updateStatus('status_error_select_json', 'error', 0, true);
            if(optionsFileInput) optionsFileInput.value = ''; // Reset input
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedOptions = JSON.parse(e.target.result);

                // Basic validation of the loaded JSON structure
                if (typeof loadedOptions !== 'object' || loadedOptions === null || Array.isArray(loadedOptions)) {
                    throw new Error(getTranslation('status_error_invalid_json'));
                }

                // Check if it contains at least one known option key
                const knownKeys = Object.keys(defaultOptions);
                const loadedKeys = Object.keys(loadedOptions);
                const hasKnownKey = loadedKeys.some(key => knownKeys.includes(key));
                if (!hasKnownKey) {
                    throw new Error(getTranslation('status_error_no_options'));
                }

                // Filter the loaded options to only include keys present in our defaultOptions
                const filteredOptions = {};
                knownKeys.forEach(key => {
                    if (loadedOptions.hasOwnProperty(key)) {
                        filteredOptions[key] = loadedOptions[key];
                    }
                });

                // Apply the loaded (and filtered) options
                applyOptions(filteredOptions);
                updateStatus('status_settings_loaded', 'success', 3000, true);
                resetPresetSelection(); // Clear preset dropdown

                // Enable update button if a file is present
                if (currentFile && convertBtn) {
                    convertBtn.disabled = false;
                    updateButtonTranslations();
                }
                updateOptionsAvailability(); // Update conditional fields

            } catch (error) {
                console.error('Error processing loaded options file:', error);
                const specificError = error.message || getTranslation('status_error_reading_file');
                updateStatus('status_error_loading_settings', 'error', 0, true, { errorMessage: specificError });
            } finally {
                if(optionsFileInput) optionsFileInput.value = ''; // Always reset file input
            }
        };
        reader.onerror = () => {
            // Handle file reading errors
            updateStatus('status_error_reading_file', 'error', 0, true);
            if(optionsFileInput) optionsFileInput.value = ''; // Reset file input
        };
        reader.readAsText(file); // Read the file as text
    }

    // Handler for the "Download SVG" button
    function handleDownload() {
        if (!currentSvgContent || !downloadLink) return;
        try {
            // Create a Blob from the SVG content
            const blob = new Blob([currentSvgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            // Configure and trigger the hidden download link
            downloadLink.href = url;
            downloadLink.download = `${currentFilenameBase}_vectorised.svg`; // Use base filename + suffix
            downloadLink.click();

            // Clean up the object URL
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error('Error preparing SVG download:', e);
            updateStatus('status_error_downloading', 'error', 0, true);
        }
    }

    // Handler for Contact Form submission (uses mailto link)
    function handleContactFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        if (!contactForm || !contactFormStatus) return;

        const nameInput = contactForm.elements['name'];
        const emailInput = contactForm.elements['email'];
        const subjectInput = contactForm.elements['subject'];
        const messageInput = contactForm.elements['message'];
        const recipientEmail = "jonkarystudio@gmail.com"; // Hardcoded recipient

        let isValid = true;
        const requiredFields = [nameInput, emailInput, subjectInput, messageInput];

        // Basic validation: Check if fields are filled
        requiredFields.forEach(input => {
             if (input) {
                 input.style.borderColor = ''; // Reset border color
                 if (!input.value.trim()) {
                    input.style.borderColor = 'var(--danger-color)'; // Highlight empty required fields
                    isValid = false;
                 }
             } else {
                 isValid = false; // Should not happen if HTML is correct
             }
        });

        // Email format validation
        if (emailInput && emailInput.value.trim() && !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
             emailInput.style.borderColor = 'var(--danger-color)';
             isValid = false;
             // Show specific error message only if other fields were filled
             if(requiredFields.every(input => input?.value.trim() || input === emailInput )) {
                  showContactFormStatus("contact_status_invalid_email", "error");
             }
             // Return early if email is invalid, even if other fields are also empty
             return;
        }

        // If any field is empty (and email wasn't the specific issue shown above)
        if (!isValid) {
             showContactFormStatus("contact_status_fill_fields", "error");
             return;
        }

        // Construct mailto link
        const mailtoSubject = encodeURIComponent(subjectInput.value.trim());
        const mailtoBody = encodeURIComponent(
            `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
        );
        const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Attempt to open mail client
        try {
            showContactFormStatus("contact_status_opening_email", "info");
            window.location.href = mailtoLink; // This redirects the user's browser
            // We can't know if they actually sent it, so provide feedback after a delay
            setTimeout(() => {
                if (contactForm) contactForm.reset(); // Clear the form fields
                showContactFormStatus("contact_status_complete_send", "success", {}, 8000); // Use success type and longer delay
            }, 1500); // Wait a moment before showing success/clearing form
        } catch (error) {
            console.error("Failed to open mailto link:", error);
            // Inform user how to manually send the email
            showContactFormStatus("contact_status_error_email", "error", { recipient: recipientEmail });
        }
    }

    // Displays status messages specifically for the contact form
    function showContactFormStatus(messageKey, type = 'info', replacements = {}, clearDelay = 5000) {
        if (!contactFormStatus) return;
        const message = getTranslation(messageKey, currentLang, replacements);

        contactFormStatus.textContent = message;
        contactFormStatus.className = `form-status ${type || ''}`.trim();
        contactFormStatus.style.display = ''; // Make it visible

        // Store key info for retranslation
        contactFormStatus.dataset.currentStatusKey = messageKey;
        contactFormStatus.dataset.currentStatusReplacements = JSON.stringify(replacements);
        contactFormStatus.dataset.currentStatusType = type;

        // Auto-hide after delay (unless it's an error that needs user action)
        // Modify this logic if errors should also auto-hide
        if (type !== 'error' || messageKey === 'contact_status_complete_send') { // Allow success msg to hide
             const timer = setTimeout(() => {
                 // Only hide if it's still the same message
                 if (contactFormStatus.dataset.currentStatusKey === messageKey) {
                     contactFormStatus.style.display = 'none';
                     // Clear stored key info
                     delete contactFormStatus.dataset.currentStatusKey;
                     delete contactFormStatus.dataset.currentStatusReplacements;
                     delete contactFormStatus.dataset.currentStatusType;
                 }
             }, clearDelay);
             // Optional: Store timer reference if you need to cancel it elsewhere
             // contactFormStatus.dataset.clearTimerId = timer;
        }
    }


    // --- Other Helper Functions ---

    // Validates the selected file based on type and size
    function validateFile(file) {
        if (!file) return getTranslation('status_no_file'); // Should not happen if called correctly

        const maxSizeMB = 15;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];

        if (file.size > maxSizeBytes) {
            return getTranslation('status_error_file_size'); // Use translation key
        }
        if (!allowedTypes.includes(file.type)) {
            return getTranslation('status_error_file_type', currentLang, { fileType: file.type || 'unknown' });
        }
        return null; // No error
    }

    // Simulates upload progress for visual feedback on landing page
    function simulateUploadProgress(callback) {
        if (!uploadProgress || !progressBar ) {
            // If progress bar elements don't exist, skip simulation and proceed
            if (typeof callback === 'function') callback();
            return;
        }

        let progress = 0;
        progressBar.style.width = `0%`; // Start at 0%
        uploadProgress.classList.remove('hidden'); // Make sure it's visible

        const interval = setInterval(() => {
             progress += Math.random() * 15 + 5; // Simulate variable progress steps
             progress = Math.min(progress, 100); // Cap at 100%
             progressBar.style.width = `${progress}%`;

             if (progress >= 100) {
                 clearInterval(interval);
                 // Wait a brief moment at 100% before executing the callback
                 setTimeout(() => {
                    uploadProgress.classList.add('hidden'); // Hide progress bar again
                    if (typeof callback === 'function') callback();
                 }, 250);
             }
        }, 80); // Adjust interval timing as needed
    }

    // Calculates the appropriate size for the preview image wrappers based on container and image aspect ratio
    function calculateAndApplyWrapperSize() {
        // Check if required elements are present and visible
        if (!appView || appView.classList.contains('hidden') || !previewAreaWrapper || !previewOriginalImage || !originalImageWrapper || !vectorImageWrapper) {
             // console.warn("calculateAndApplyWrapperSize: Pre-requisites not met.");
            return;
        }

        // Try to get natural dimensions if not already stored
        if (originalImageNaturalDims.width === 0 && previewOriginalImage.naturalWidth > 0) {
             originalImageNaturalDims.width = previewOriginalImage.naturalWidth;
             originalImageNaturalDims.height = previewOriginalImage.naturalHeight;
             // console.log("Captured natural image dimensions:", originalImageNaturalDims);
        }

        // Exit if dimensions are still unknown
        if (!originalImageNaturalDims.width) {
             // console.warn("calculateAndApplyWrapperSize: Image dimensions unknown.");
            return;
        }

        // Get container dimensions (ensure they are valid)
        const containerWidth = previewAreaWrapper.clientWidth;
        const containerHeight = previewAreaWrapper.clientHeight;
        if (containerWidth <= 1 || containerHeight <= 1) {
            // console.warn("calculateAndApplyWrapperSize: Invalid container dimensions.", { containerWidth, containerHeight });
            // Don't try to size if container has no space, wait for next resize/call
             return;
         }


        const imgRatio = originalImageNaturalDims.width / originalImageNaturalDims.height;
        const containerRatio = containerWidth / containerHeight;

        let targetWidth, targetHeight;

        // Determine if image is limited by container width or height
        if (imgRatio > containerRatio) {
             // Limited by width
            targetWidth = containerWidth;
            targetHeight = targetWidth / imgRatio;
        } else {
             // Limited by height
            targetHeight = containerHeight;
            targetWidth = targetHeight * imgRatio;
        }

        // Apply calculated dimensions (ensure positive integers)
        targetWidth = Math.max(1, Math.floor(targetWidth));
        targetHeight = Math.max(1, Math.floor(targetHeight));

        // Apply to both wrappers
        originalImageWrapper.style.width = `${targetWidth}px`;
        originalImageWrapper.style.height = `${targetHeight}px`;
        vectorImageWrapper.style.width = `${targetWidth}px`;
        vectorImageWrapper.style.height = `${targetHeight}px`;

        // console.log("Applied wrapper size:", { targetWidth, targetHeight });

        // Important: Resetting zoom/pan after resizing might be needed
        // depending on desired behavior (e.g., center after resize).
        // resetZoomPan(); // Consider if this should happen here or only initially.
        // For now, keep existing behavior (resetZoomPan is called separately where needed).
        // Update transform to ensure scaling is correct after resize.
         setTransform();
    }

     // Debounced version of calculateAndApplyWrapperSize for resize events
    function debounceCalculateAndApplyWrapperSize(delay = 150) {
        clearTimeout(previewSizeDebounceTimer);
        previewSizeDebounceTimer = setTimeout(() => {
             // console.log("Debounced resize calculation trigger");
            calculateAndApplyWrapperSize();
        }, delay);
    }


    // Sets up synchronization between range sliders and their corresponding number inputs
    function setupNumberInputSync() {
        if (!optionsForm) return;
        optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
            const numInputId = `${slider.id}Num`; // Convention: sliderId + 'Num'
            const numInput = document.getElementById(numInputId);
            if (numInput) {
                const sliderStep = parseFloat(slider.step) || 1;
                const numStep = parseFloat(numInput.step) || sliderStep; // Use numInput step if defined
                const decimalPlaces = (String(numStep).split('.')[1] || '').length;

                // Function to update number input from slider value
                const syncSliderToNum = () => {
                    numInput.value = parseFloat(slider.value).toFixed(decimalPlaces);
                };

                // Function to update slider value from number input
                const syncNumToSlider = () => {
                    let numVal = parseFloat(numInput.value);
                    const minVal = parseFloat(slider.min);
                    const maxVal = parseFloat(slider.max);

                    if (isNaN(numVal)) return; // Ignore non-numeric input

                    // Clamp value within slider bounds
                    numVal = Math.max(minVal, Math.min(maxVal, numVal));

                    // Only update slider if the value significantly changed
                    // (to avoid minor floating point differences causing loops)
                    if (Math.abs(parseFloat(slider.value) - numVal) > numStep / 2) {
                         slider.value = String(numVal);
                         // Crucially, trigger the 'input' event on the slider
                         // so other listeners react to the change
                         slider.dispatchEvent(new Event('input',{bubbles:true}));
                    }
                     // Update the number input itself to the potentially clamped value with correct formatting
                     numInput.value = numVal.toFixed(decimalPlaces);
                };

                // Add listeners
                safeAddListener(slider, 'input', syncSliderToNum);
                safeAddListener(numInput, 'change', syncNumToSlider); // Use 'change' for num input (fires on blur/enter)
                safeAddListener(numInput, 'input', (e)=> { // Also consider input for immediate feedback, debounced maybe
                    // If immediate feedback from number input to slider is desired, use 'input'
                    // Might need debouncing if it causes performance issues
                     syncNumToSlider();
                });


                // Initial sync on page load
                syncSliderToNum();
            }
        });
    }

    // Updates the enabled/disabled state of option groups based on current selections
    function updateOptionsAvailability() {
        if (!optionsForm || !modeSelect || !colormodeSelect || !paletteSelect) return;
        const mode = modeSelect.value;
        const colorMode = colormodeSelect.value;

        const isSpline = (mode === 'spline');
        const isPixel = (mode === 'pixel');
        const isColor = (colorMode === 'color');

        // Toggle groups based on conditions
        toggleOptionGroup(splineThresholdGroup, isSpline);
        toggleOptionGroup(spliceThresholdGroup, isSpline);
        toggleOptionGroup(segmentLengthGroup, isSpline);
        toggleOptionGroup(cornerThresholdGroup, !isPixel); // Disabled for pixel mode
        toggleOptionGroup(hierarchicalGroup, isColor);   // Disabled for binary mode
        toggleOptionGroup(gradientStepGroup, isColor);     // Disabled for binary mode
        toggleOptionGroup(paletteGroup, isColor);       // Disabled for binary mode
        // Path precision might always be enabled, or conditional? Check vtracer docs if unsure. Assume enabled for now.
        toggleOptionGroup(pathPrecisionGroup, true);
        // Color Precision group itself is hidden, no need to toggle visually
    }

    // Helper to toggle class and disabled state for controls within a group
    function toggleOptionGroup(groupElement, enable) {
        if (!groupElement) return;
        const controls = groupElement.querySelectorAll('input, select');
        groupElement.classList.toggle('disabled', !enable); // Add/remove 'disabled' class for styling
        controls.forEach(control => {
            if(control) control.disabled = !enable; // Set disabled attribute on form controls
        });
    }

    // Stores the initial default values from the options form on page load
    function storeDefaultOptions() {
        if (!optionsForm) return;
        const data = new FormData(optionsForm);
        for (let [key, value] of data.entries()) {
            // Store all initial values
             if (key !== 'palette_selector') { // Exclude the dummy key
                 defaultOptions[key] = value;
             }
        }
        // Ensure hidden color_precision matches initial palette_selector value
         if (defaultOptions.hasOwnProperty('color_precision') && optionsForm.elements['palette_selector']) {
              defaultOptions['color_precision'] = optionsForm.elements['palette_selector'].value;
         }

        // Assign these defaults to the 'general' preset's options
        const defaultPreset = presets.find(p => p.key === 'general');
        if (defaultPreset) {
            // Use object spread for a shallow copy
            defaultPreset.options = { ...defaultOptions };
        } else {
             console.error("Could not find 'general' preset to store defaults.");
        }
        console.log("Stored default options:", defaultOptions);
    }

    // Populates the preset selection dropdown with available presets and translations
    function populatePresetSelect() {
        if (!presetSelect) return;
        const currentVal = presetSelect.value; // Preserve current selection if possible
        presetSelect.innerHTML = `<option value="" disabled selected>${getTranslation('preset_select_placeholder')}</option>`; // Add placeholder

        presets.forEach((preset, index) => {
            // Don't add the 'general' preset as an explicit selectable option
            if (preset.key === 'general') return;

            const option = document.createElement('option');
            option.value = index.toString(); // Use index as value
            const translationKey = `preset_name_${preset.key}`;
            // Get translated name or fallback to the defined name
            option.textContent = getTranslation(translationKey) || preset.name;
            presetSelect.appendChild(option);
        });

        // Restore previous selection if it's still valid
        if (currentVal !== "" && currentVal < presets.length && presets[currentVal]?.key !== 'general') {
            presetSelect.value = currentVal;
        } else {
            presetSelect.value = ""; // Reset to placeholder otherwise
        }
    }

    // Clears the preset dropdown selection (sets to placeholder)
    function resetPresetSelection() {
        if(presetSelect && presetSelect.value !== "") {
            presetSelect.value = ""; // Set value to the placeholder's value
        }
    }

    // Applies a given set of options (from preset or loaded file) to the form
    function applyOptions(optionsToApply) {
        if (!optionsForm) return;
        console.log("Applying options:", optionsToApply);

        let needsLayoutUpdate = false; // Flag if conditional options might change

        for (const key in optionsToApply) {
             // Check if this is a known option key (present in defaults)
            if (!defaultOptions.hasOwnProperty(key)) {
                console.warn(`applyOptions: Skipping unknown option key "${key}"`);
                continue;
            }

            const value = optionsToApply[key];
            const element = optionsForm.elements[key];

            if (element) {
                // Update element value based on type
                if (element.type === 'radio' || element.type === 'checkbox') {
                    // Find the correct radio button in a group, or set checkbox checked state
                    const matchingElement = Array.from(optionsForm.elements[key]).find(el => el.value === String(value));
                    if(matchingElement) matchingElement.checked = true;
                    else if(element.type === 'checkbox') element.checked = !!value; // Handle checkbox boolean/value
                } else {
                     // For select, range, number, text, hidden etc.
                    element.value = String(value);
                }

                 // Special handling for range sliders: update corresponding number input
                if (element.type === 'range') {
                    const numInputId = `${element.id}Num`;
                    const numInput = document.getElementById(numInputId);
                    if (numInput) {
                        const step = parseFloat(element.step) || 1;
                        const decimalPlaces = (String(step).split('.')[1] || '').length;
                        numInput.value = parseFloat(value).toFixed(decimalPlaces);
                    }
                }

                 // Trigger events to ensure UI updates and listeners react
                // Use 'input' for immediate effect, 'change' for finalization/blur effect
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));

                 // Mark if a change might affect option availability
                if (['mode', 'color_mode'].includes(key)) {
                    needsLayoutUpdate = true;
                }

            } else {
                console.warn(`applyOptions: Element for key "${key}" not found in form.`);
            }
        }
         // Sync hidden color_precision based on palette_selector if applying options included palette_selector
         if (optionsToApply.hasOwnProperty('palette_selector') && paletteSelect && colorPrecisionInput) {
             colorPrecisionInput.value = paletteSelect.value;
              // Dispatch event on the hidden input if needed
              colorPrecisionInput.dispatchEvent(new Event('change', { bubbles: true }));
         }

        // Update conditional option visibility after all values are set
        if (needsLayoutUpdate) {
            // Use setTimeout to ensure updates happen after the current event loop cycle
            setTimeout(updateOptionsAvailability, 0);
        }
    }

    // --- Zoom and Pan Functions ---

    // Applies the current scale and translation to the preview wrappers
    function setTransform() {
        if (!originalImageWrapper || !vectorImageWrapper) return;
        // Use integer pixel values for translation for potentially sharper rendering
        const transformValue = `translate(${Math.round(pointX)}px, ${Math.round(pointY)}px) scale(${scale})`;
        originalImageWrapper.style.transform = transformValue;
        vectorImageWrapper.style.transform = transformValue;
        updateZoomButtons(); // Update button disabled state based on new scale
    }

    // Initializes zoom and pan event listeners on the preview area
    function setupZoomPan() {
        if (!previewAreaWrapper) return;

        // Mouse Down / Touch Start - Initialize panning
        const startPan = (e) => {
            // Only pan with left mouse button or single touch
            if(e.button !== 0 && e.type !== 'touchstart') return;
            e.preventDefault(); // Prevent image dragging etc.
            panning = true;
            const clientX = e.clientX ?? e.touches[0].clientX;
            const clientY = e.clientY ?? e.touches[0].clientY;
            start = { x: clientX - pointX, y: clientY - pointY };
            previewAreaWrapper.classList.add('grabbing'); // Change cursor

            // Add move/end listeners to window to capture movement outside the element
            window.addEventListener('mousemove', panMove, { passive: false });
            window.addEventListener('touchmove', panMove, { passive: false });
            window.addEventListener('mouseup', endPan);
            window.addEventListener('touchend', endPan);
            window.addEventListener('mouseleave', endPan); // Stop panning if mouse leaves window
        };

        // Mouse Move / Touch Move - Update position during panning
        const panMove = (e) => {
            if(!panning) return;
            e.preventDefault(); // Prevent scrolling page during pan
            const clientX = e.clientX ?? e.touches[0].clientX;
            const clientY = e.clientY ?? e.touches[0].clientY;
            pointX = clientX - start.x;
            pointY = clientY - start.y;
            setTransform(); // Apply the new translation
        };

        // Mouse Up / Touch End - Finalize panning
        const endPan = () => {
            if(!panning) return;
            panning = false;
            previewAreaWrapper.classList.remove('grabbing'); // Restore cursor

            // Remove window listeners
            window.removeEventListener('mousemove', panMove);
            window.removeEventListener('touchmove', panMove);
            window.removeEventListener('mouseup', endPan);
            window.removeEventListener('touchend', endPan);
            window.removeEventListener('mouseleave', endPan);
        };

        // Mouse Wheel - Handle zooming
        const handleWheelZoom = (e) => {
             e.preventDefault(); // Prevent page scrolling
            const rect = previewAreaWrapper.getBoundingClientRect();

            // Calculate mouse position relative to the preview area
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

             // Calculate point under mouse before zoom
            const pointUnderMouseX = (mouseX - pointX) / scale;
            const pointUnderMouseY = (mouseY - pointY) / scale;

            // Determine zoom factor (increase/decrease scale)
            const delta = -e.deltaY; // Negative deltaY means scroll down (zoom out)
            const zoomFactor = 1.18; // Adjust sensitivity
            let newScale = (delta > 0) ? scale * zoomFactor : scale / zoomFactor;

            // Clamp scale within limits
            newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

            // If scale didn't change (already at min/max), do nothing
            if(newScale === scale) return;

            // Calculate new translation (pointX, pointY) to keep the point under the mouse stationary
            pointX = mouseX - pointUnderMouseX * newScale;
            pointY = mouseY - pointUnderMouseY * newScale;

            // Update scale and apply transformation
            scale = newScale;
            setTransform();
        };

        // Attach listeners to the preview wrapper
        safeAddListener(previewAreaWrapper, 'mousedown', startPan);
        safeAddListener(previewAreaWrapper, 'touchstart', startPan, { passive: false });
        safeAddListener(previewAreaWrapper, 'wheel', handleWheelZoom, { passive: false });
    }

    // Zooms in or out by a given factor, centered on the current view
    function zoom(factor) {
        if (!previewAreaWrapper) return;
        const rect = previewAreaWrapper.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate point at the center of the view before zoom
        const pointUnderCenterX = (centerX - pointX) / scale;
        const pointUnderCenterY = (centerY - pointY) / scale;

        // Calculate and clamp new scale
        let newScale = scale * factor;
        newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

        if(newScale === scale) return; // No change

        // Calculate new translation to keep center point stationary
        pointX = centerX - pointUnderCenterX * newScale;
        pointY = centerY - pointUnderCenterY * newScale;

        // Update scale and apply
        scale = newScale;
        setTransform();
    }

    // Resets zoom to 1x and centers the content
    function resetZoomPan() {
        scale = 1;
        pointX = 0;
        pointY = 0;
        setTransform(); // Apply reset state
        // No need to call calculateAndApplyWrapperSize here usually,
        // as reset often happens when size is already set or being calculated.
    }

    // Updates the disabled state of zoom buttons based on current scale
    function updateZoomButtons() {
        if(zoomInBtn) zoomInBtn.disabled = (scale >= MAX_SCALE);
        if(zoomOutBtn) zoomOutBtn.disabled = (scale <= MIN_SCALE);
        // Reset button is never disabled
    }

    // --- SVG Specific Helpers ---

    // Toggles a highlight class on hovered SVG path elements
    function handleSvgPathHover(event) {
        const target = event.target;
        // Check if the target is a 'path' element within an SVG
        if(target && target.tagName === 'path' && target.closest('svg')) {
            target.classList.toggle('path-hover', event.type === 'mouseover');
        }
    }

    // Clears the SVG preview area and resets download state
    function resetResultArea(clearStatusToo = true) {
        if(svgOutputDiv) {
            svgOutputDiv.innerHTML = `<p class="placeholder-text">${getTranslation('preview_placeholder_select')}</p>`;
            svgOutputDiv.classList.add('placeholder-active');
        }
        currentSvgContent = ''; // Clear stored SVG data
        if(downloadBtn) downloadBtn.disabled = true; // Disable download button
        if(clearStatusToo && statusArea) {
             updateStatus('', '', 0, true); // Optionally clear the app status message
        }
    }


    // --- Initialization ---

    // 1. Determine and set initial language
    currentLang = getInitialLanguage();
    setLanguage(currentLang); // Apply translation based on determined language

    // 2. Set up based on page context (index.html vs static pages)
    if (landingView || appView) { // On main app page (index.html)

        console.log("vectorise.me script initializing (App Mode)...");

        // Store initial form values as defaults & populate 'general' preset
        if (optionsForm) {
            storeDefaultOptions();
        }
        // Populate preset dropdown (after defaults are stored)
        populatePresetSelect();

        // --- Attach Event Listeners for Core App Functionality ---
        safeAddListener(optionsForm, 'change', handleOptionsFormChange); // Any form change
        safeAddListener(optionsForm, 'input', handleOptionsFormChange); // Handle range slider input immediately

        safeAddListener(imageInput, 'change', handleFileSelectChange); // File input browse
        safeAddListener(cancelUploadBtn, 'click', resetAppToLanding); // Cancel button in file info area
        safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding); // "Vectorize" on landing
        safeAddListener(convertBtn, 'click', () => handleConvert(false)); // "Update Vectorization" in app
        safeAddListener(downloadBtn, 'click', handleDownload); // "Download SVG"
        safeAddListener(uploadNewBtn, 'click', resetAppToLanding); // "Upload New" in header

        // Option panel buttons
        safeAddListener(resetOptionsBtn, 'click', () => handleResetOptions(true)); // Pass true to show status
        safeAddListener(presetSelect, 'change', handlePresetChange); // Preset dropdown
        safeAddListener(saveOptionsBtn, 'click', handleSaveOptions); // Save settings button
        safeAddListener(loadOptionsBtn, 'click', () => optionsFileInput?.click()); // Trigger hidden file input
        safeAddListener(optionsFileInput, 'change', handleLoadOptionsFile); // Handle loaded settings file

        // Preview controls
        setupZoomPan(); // Init zoom/pan listeners
        safeAddListener(zoomInBtn, 'click', () => zoom(1.4)); // Slightly increase zoom step
        safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.4));
        safeAddListener(zoomResetBtn, 'click', resetZoomPan);
        updateZoomButtons(); // Set initial button state

        // SVG interaction (optional highlight on hover)
        safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
        safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);

        // Original preview image load/error handling
        safeAddListener(previewOriginalImage, 'load', () => {
            console.log("Original preview image loaded.");
            debounceCalculateAndApplyWrapperSize(50); // Recalculate size after load
        });
        safeAddListener(previewOriginalImage, 'error', () => {
            console.error("Failed to load original preview image. Check Object URL or file.");
            // Optionally show an error state in the original preview pane
        });

        // Drop zone listeners
        if (dropZone) {
            safeAddListener(dropZone, 'dragenter', handleDragEnter, false);
            safeAddListener(dropZone, 'dragover', handleDragOver, false);
            safeAddListener(dropZone, 'dragleave', handleDragLeave, false);
            safeAddListener(dropZone, 'drop', handleDrop, false);
            // Allow clicking the drop zone (excluding buttons/links inside) to trigger file input
            safeAddListener(dropZone, 'click', (e) => {
                if (imageInput && e.target !== imageInput && !e.target.closest('button, a, label')) {
                    imageInput.click();
                }
            });
        } else {
            console.warn("Drop zone element not found.");
        }

         // Sync number inputs with sliders
         setupNumberInputSync();
         // Set initial availability of options
         updateOptionsAvailability();

        // Default view state on load
        showLandingView();

    } else { // On other static pages (contact, privacy, etc.)
        console.log("vectorise.me script initializing (Static Page Mode)...");
        // Basic setup needed even on static pages might go here (e.g., mobile menu toggle)
    }

    // Contact form listeners (only add if the form exists on the current page)
    if (contactForm) {
        safeAddListener(contactForm, 'submit', handleContactFormSubmit);
        console.log("Contact form listeners added.");
    } else if (window.location.pathname.includes('contact.html')) {
         console.warn("Contact form element (#contactForm) not found on contact page.");
    }

    // Language dropdown listeners (should be present on all pages)
    if (languageToggleBtn && languageDropdown) {
        // Toggle dropdown visibility
        safeAddListener(languageToggleBtn, 'click', (e) => {
            e.stopPropagation(); // Prevent click bubbling to window listener
            const isExpanded = languageToggleBtn.getAttribute('aria-expanded') === 'true';
            languageToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            languageDropdown.classList.toggle('hidden', isExpanded); // Toggle based on current state
        });

        // Close dropdown if clicking outside
        safeAddListener(window, 'click', (e) => {
            if (languageDropdown && !languageDropdown.classList.contains('hidden')) {
                // Check if click was outside the toggle button AND outside the dropdown itself
                if (!languageToggleBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                    languageToggleBtn.setAttribute('aria-expanded', 'false');
                    languageDropdown.classList.add('hidden');
                }
            }
        });

        // Handle language selection links within the dropdown
        languageDropdown.querySelectorAll('a[lang]').forEach(link => {
            safeAddListener(link, 'click', (e) => {
                 e.preventDefault(); // Prevent page reload
                 const selectedLang = link.getAttribute('lang');
                 if (selectedLang !== currentLang) { // Only update if language changed
                     setLanguage(selectedLang);
                 } else {
                     // If same language clicked, just close dropdown
                     languageToggleBtn.setAttribute('aria-expanded', 'false');
                     languageDropdown.classList.add('hidden');
                 }
            });
        });
        console.log("Language dropdown listeners added.");
    } else {
         console.warn("Language toggle button or dropdown element not found.");
    }

    // Global listeners
    // Debounced resize listener to recalculate preview sizes
    let resizeTimeout;
    safeAddListener(window, 'resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Only recalculate if app view is active and elements exist
            if (appView && !appView.classList.contains('hidden') && previewAreaWrapper) {
                 console.log("Window resize detected - recalculating preview size.");
                 calculateAndApplyWrapperSize(); // No debounce here, debounce applied before calling this
            }
        }, 150); // Debounce resize events
    });

     // Add listener for clicks outside dropdown if needed - ALREADY HANDLED ABOVE
     console.log(`Initialization complete. Current language: ${currentLang}`);

}); // End DOMContentLoaded