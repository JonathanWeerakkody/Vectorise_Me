// public/script.js - VTracer Only + Info Tooltips + Comparison Sliders + Ads + AdBlock Msg (English Only Translations)

// --- Translations (English Only) ---
const translations = {
    en: {
        lang_name: "English",
        // Meta Tags (SEO Optimized)
        meta_title_main_seo: "Vectorise.Me: Free Online Image to SVG Converter (JPG, PNG, BMP)",
        meta_description_main_seo: "Instantly convert JPG, PNG, BMP images to high-quality, scalable SVG vectors online for free using advanced tracing options and helpful presets.",
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
        landing_subheadline_detailed: "Instantly convert raster images (JPG, PNG, BMP) into crisp, infinitely scalable SVG vectors online for free. Features advanced tracing options with helpful presets for precise results.",
        upload_drag_drop: "Drag & Drop Image",
        upload_or: "or",
        upload_browse: "Browse Files",
        upload_formats: "Max 15MB (JPG, PNG, & BMP)",
        cancel_selection_title: "Cancel Selection",
        vectorize_image_btn: "Vectorize Image",
        // Landing Page - Features
        features_h2_seo: "Key SVG Converter Features",
        features_p: "Everything you need for perfect SVGs. Our powerful conversion tool gives you complete control over your vector graphics.",
        feature_instant_h3: "Instant Conversion",
        feature_instant_p: "Upload your image and get an SVG preview instantly. No waiting, no processing delays.",
        feature_realtime_h3: "Real-time Customization",
        feature_realtime_p: "Adjust settings and see changes in real-time. Tweak your SVG to perfection.",
        feature_quality_h3: "High-Quality Results",
        feature_quality_p: "Get clean, optimized SVGs that scale perfectly for any use case.",
        // Landing Page - Presets
        presets_h2_seo: "Image to SVG Preset Examples",
        presets_p: "Hover over the images to see the difference!",
        preset_photo: "Technical Drawings / Blueprints",
        preset_clipart: "Clipart / Logo",
        preset_pixel: "Pixel Art",
        preset_original: "Original",
        preset_vectorized: "Vectorized",
        // Landing Page - CTA
        cta_p_revised: "Get started instantly – no sign-up needed. Just upload and vectorize!",
        // App View - Options Panel (VTracer Only)
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
        color_detail_title: "Color Detail",
        color_detail_label: "Color Detail:",
        color_detail_full: "Full (8 bit)",
        color_detail_standard: "Standard (6 bit)",
        color_detail_reduced: "Reduced (5 bit)",
        color_detail_limited: "Limited (4 bit)",
        color_detail_posterized: "Posterized (3 bit)",
        color_mode_title: "Color Mode",
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
        corner_thr_label: "Corner Threshold:",
        path_prec_label: "Path Precision:",
        spline_thr_label: "Spline Threshold:",
        splice_thr_label: "Splice Threshold:",
        segment_len_label: "Segment Length:",
        options_legend_color_proc: "Color Processing Options",
        layering_label: "Layering:",
        layering_stacked: "Stacked",
        layering_cutout: "Cutout",
        gradient_step_label: "Gradient Step:",

        // ===== User-Friendly Info Tooltip Texts =====
        info_preset: "Quick start! Choose a type that matches your image (like Logo, Photo, Pixel Art) for suggested settings.",
        info_color_detail: "Fewer colors (e.g., 'Posterized') gives a simplified, stylized look and smaller file. More colors ('Full') is closer to the original but makes a larger file.",
        info_color_mode: "'Color' keeps the image colors. 'Binary' makes it strictly black and white, like a silhouette.",
        info_filter_speckle: "Removes tiny stray dots ('speckles'). Increase to remove larger spots, but be careful - it might erase small details like thin lines. Set to 0 to keep everything.",
        info_mode: "'Spline' creates smooth, curved lines (good for photos, drawings). 'Polygon' uses straight lines and sharp corners (good for technical drawings, some logos). 'Pixel' makes perfect squares (for pixel art).",
        info_corner_threshold: "Controls how easily corners are made sharp. Higher values make more smooth curves instead of sharp corners. Lower values create more pointy corners.",
        info_path_precision: "How detailed the vector paths are. Higher values are more accurate but increase file size. Lower values simplify the shape and reduce file size.",
        info_spline_threshold: "(Spline Mode Only) How closely the smooth curves follow the original image shapes. Lower values stick closer (more detail, complex). Higher values make simpler, smoother curves.",
        info_splice_threshold: "(Spline Mode Only) Joins together curve sections that are almost straight to simplify the result. Higher values merge more.",
        info_segment_length: "(Spline Mode Only) Maximum length of a single curved piece. Lower values use more, smaller pieces (more detail). Higher values use longer, simpler pieces.",
        info_layering: "(Color Mode Only) 'Stacked' puts colors on top of each other (like layers). 'Cutout' cuts shapes from the layer below (can simplify, might change look/transparency).",
        info_gradient_step: "(Color Mode Only) Smoothness of color gradients. Higher values make gradients look blocky or 'posterized'. Set to 0 or 1 for smooth gradients.",
        // ===== END: Info Tooltip Texts =====

        // Common App View
        update_vectorization_btn: "Update Vectorization",
        // App View - Result Panel
        preview_h2: "Preview",
        zoom_out_title: "Zoom Out",
        zoom_reset_title: "Reset Zoom",
        zoom_in_title: "Zoom In",
        preview_original_label: "Original",
        preview_vectorized_label: "Vectorized",
        preview_placeholder_processing: "Vectorizing...",
        preview_placeholder_loading: "Updating preview...",
        preview_placeholder_select: "SVG result will appear here",
        preview_placeholder_update_failed: "Update Failed",
        download_svg_btn: "Download SVG",
        // Footer
        footer_home_link: "Home",
        footer_contact_link: "Contact",
        footer_privacy_link: "Privacy Policy",
        footer_cookies_link: "Cookie Policy",
        footer_terms_link: "Terms of Service",
        footer_copyright: "© 2025 JonkaryStudio. All rights reserved.",
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
        contact_status_error_email: "Could not open email client. Please send email manually to {recipient}.",
        // FAQ / Common Problems
        faq_h2: "Common Problems & Solutions",
        faq_p: "Here are some common issues you might encounter and how to resolve them.",
        faq_q_quality: "Image Quality Issues:",
        faq_q_quality_desc: "The converted SVG doesn't match the original image quality.",
        faq_solution_label: "Solution:",
        faq_a_quality: "Adjust the settings in the vectorization process. Increasing 'Color Detail' (palette size), adjusting 'Spline Threshold' (lower for more detail), or reducing 'Filter Speckle' can help. For pixel art, ensure the 'Pixel' mode is selected. Experiment with different presets.",
        faq_q_upload_failed: "Image Failed to Convert:",
        faq_q_upload_failed_desc: "The uploaded image failed to convert.",
        faq_a_upload_failed: "Check for image compatibility. Vectorise.Me only handles JPG, PNG and BMP. If you have images of different formats, convert them first before uploading them.",
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
        faq_a_transparency: "Vectorise.Me generally handles transparency well, especially with 'Stacked' layering. Ensure your original PNG has actual transparency. If using 'Cutout' layering, transparency might behave differently. The underlying process might sometimes quantize near-transparent colors to opaque ones depending on settings.",
        faq_q_browser: "Browser Rendering Differences:",
        faq_q_browser_desc: "The SVG looks slightly different in various web browsers.",
        faq_a_browser: "This is inherent to SVG rendering engines. Ensure your SVG is well-formed. Avoid overly complex CSS or filters within the SVG if compatibility is critical. Test in major browsers.",
        // Legal Pages Shared
        legal_last_updated: "Last Updated:",
        legal_date_placeholder: "04/10/2025", // Remember to update this date
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
        privacy_image_p1: "When you upload an image for conversion, the image data is sent to our server for processing. We process the image solely for the purpose of converting it to SVG format as requested by you. Uploaded images and generated SVGs are not stored on our servers after processing and download link generation.",
        privacy_h4_usage: "Usage Data",
        privacy_usage_p1: 'We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include your computer\'s IP address, browser type, browser version, the pages visited, time and date of visit, time spent on pages, unique device identifiers, and other diagnostic data. We do use Google Analytics to help us analyze and improve the performance and user experience of our Service.',
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
        privacy_disclosure_placeholder: "We may disclose your Usage Data under limited circumstances, such as to comply with legal obligations, protect our rights or those of others, prevent wrongdoing, or in the event of a business transfer (e.g., merger or acquisition). We do not sell your Personal Data.",
        privacy_h2_security: "Security of Data",
        privacy_security_p1: "The security of your data is important. While we strive to use commercially acceptable means (like HTTPS) to protect data, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.",
        privacy_h2_providers: "Service Providers",
        privacy_providers_placeholder: "We may employ third-party service providers to facilitate the operation of our Service. These providers include Render.com for hosting services and Google Analytics for analytics, as mentioned earlier. These third parties have access to your Usage Data only to perform these specific tasks on our behalf and are obligated to protect your information in accordance with applicable standards.",
        privacy_h2_links: "Links to Other Sites",
        privacy_links_p1: "Our Service may contain links to other sites. We have no control over and assume no responsibility for the content or practices of any third-party sites.",
        privacy_h2_children: "Children's Privacy",
        privacy_children_p1: "Our Service does not knowingly collect personally identifiable information from children under the age of 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it as soon as possible. We encourage parents and guardians to contact us if they believe their child may have provided us with personal information.",
        privacy_h2_changes: "Changes to This Privacy Policy",
        privacy_changes_p1: 'We may update this policy. We will notify you by posting the new policy on this page and updating the "Last Updated" date.',
        privacy_h2_contact: "Contact Us",
        privacy_contact_p1: "If you have questions, contact us:",
        privacy_contact_li_email: "By email: jonkarystudio@gmail.com",
        privacy_contact_li_web_label: "Via our website:",
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
        cookies_why_li_essential: "Essential Cookies: These are necessary to provide you with services available through our Service and to enable you to use some of its features, such as managing your session during the conversion process (if applicable) or securing the site. Render.com, our hosting provider, may use essential session cookies to ensure proper functionality.",
        cookies_why_li_analytics: "Analytics and Customization Cookies: These cookies collect information that is used either in aggregate form to help us understand how our Service is being used or how effective our marketing campaigns are, or to help us customize our Service for you. We use Google Analytics, which may set cookies such as `_ga` and `_gid` to track usage patterns and improve your experience.",
        cookies_why_li_advertising: "Advertising Cookies: These cookies are used to make advertising messages more relevant to you. They may be set by third-party advertising partners (like Google AdSense) to track your browsing habits and deliver personalized ads based on your interests.",
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
        cookies_h2_changes: "Changes to This Cookie Policy",
        cookies_changes_p1: "We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed.",
        cookies_h2_contact: "Contact Us",
        cookies_contact_p1: "If you have any questions about our use of cookies or other technologies, please contact us:",
        cookies_contact_li_email: "By email: jonkarystudio@gmail.com",
        cookies_contact_li_web_label: "Via our website:",
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
        terms_governing_p1: "These terms and conditions are governed by and construed in accordance with the laws of the State of Connecticut, USA and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
        terms_h2_contact: "Contact Us",
        terms_contact_p1: "If you have any questions about these Terms, please contact us:",
        terms_contact_li_email: "By email: jonkarystudio@gmail.com",
        terms_contact_li_web_label: "Via our website:",
        terms_contact_page_link: "Contact Page",
        // Dynamic Status Messages (Used by JS)
        status_uploading: "Uploading...",
        status_vectorizing: "Vectorizing...",
        status_updating: "Updating Preview...",
        status_processing: "Processing...",
        status_working: "Working...",
        status_updating_preview: "Updating preview...",
        status_complete: "Vectorization Complete!",
        status_options_reset: "Options reset to default.",
        status_preset_loaded: "Preset \"{presetName}\" loaded.",
        status_settings_saved: "Settings saved.",
        status_error_saving_settings: "Error saving settings.",
        status_error_loading_settings: "Error loading settings: {errorMessage}",
        status_error_reading_file: "Error reading settings file.",
        status_error_invalid_json: "Invalid settings file structure.",
        status_error_no_options: "Settings file doesn't contain valid options.",
        status_error_select_json: "Error: Please select a valid '.json' settings file.",
        status_settings_loaded: "Settings loaded successfully.",
        status_error_downloading: "Error preparing download.",
        status_error_generic: "Error: {errorMessage}",
        status_error_file_size: "Error: File too large (Max 15MB).",
        status_error_file_type: "Error: Unsupported file type. Please use JPG, PNG, or BMP.",
        status_no_file: "No file selected.",
        status_error_obj_url: "Error displaying preview: {errorMessage}",
        status_error_conversion_failed: "Conversion Failed: {errorMessage}",
        status_error_no_svg: "Conversion failed: No SVG data received from server.",
        // Presets (Used by JS for status messages and dropdown)
        preset_name_general: "General / Balanced",
        preset_name_pixel: "Pixel Art",
        preset_name_technical: "Technical Drawing / Blueprint",
        preset_name_illustration: "Illustration / Graphic",
        preset_name_clipart: "Clipart / Logo",
        preset_name_cartoon: "Cartoon / Flat Style",
        preset_name_photograph: "Photograph",
        // Ad Related
        advertisement_label: "Advertisement",
        // AdBlock Notice Related
        adblock_notice_title: "Ad Blocker Detected!",
        adblock_notice_text: "Vectorise.Me is free thanks to ads. Please consider whitelisting our site to help us keep it running.",
        adblock_notice_link: "How to whitelist?",
        adblock_notice_close_title: "Close notice",
    }
    // Other language objects removed for brevity
};


// --- State Variables ---
let currentFile = null;
let currentFileObjectURL = null;
let currentFilenameBase = 'vectorised-image';
let currentSvgContent = '';
const defaultOptions = {}; // Populated on init
let scale = 1;
const MIN_SCALE = 0.1;
const MAX_SCALE = 12;
let panning = false;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let originalImageNaturalDims = { width: 0, height: 0 };
let currentLang = 'en'; // Default to English since other translations removed
let statusClearTimer;
let previewSizeDebounceTimer;
let infoTooltipElement = null; // Tooltip element reference
let currentInfoButton = null; // Reference to button that opened tooltip
let adBlockerDetected = false; // Global flag for AdBlock status

// --- Preset Definitions (VTracer specific) ---
const presets = [
    { key: "general", name: "General / Balanced", options: {} }, // Populated by storeDefaultOptions
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
         console.warn(`Element not found for listener registration: event '${event}' on path: ${window.location.pathname}. Check element ID/selector.`);
    }
}

// --- Translation Functions (Simplified for English only) ---
function getTranslation(key, lang = currentLang, replacements = {}) {
    const text = translations.en[key]; // Always use English
    if (text === undefined) {
        console.warn(`Translation key missing: "${key}"`);
        return `_${key}_`;
    }
    let processedText = text;
    for (const placeholder in replacements) {
        const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
        processedText = processedText.replace(regex, replacements[placeholder]);
    }
    return processedText;
}

function translatePage(lang) { // Lang parameter kept for structure, but always uses 'en'
    currentLang = 'en'; // Force English
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';

    // Translate text content
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        const translation = getTranslation(key); // Uses 'en' implicitly
        if (translation !== `_${key}_`) {
             el.textContent = translation;
        }
    });

    // Translate attributes
    document.querySelectorAll('[data-translate-placeholder], [data-translate-title]').forEach(el => {
        const placeholderKey = el.dataset.translatePlaceholder;
        const titleKey = el.dataset.translateTitle;
        if (placeholderKey) {
            const translation = getTranslation(placeholderKey);
            if (translation !== `_${placeholderKey}_`) el.placeholder = translation;
        }
        if (titleKey) {
             const translation = getTranslation(titleKey);
             if (translation !== `_${titleKey}_`) el.title = translation;
        }
    });

    // Translate main title and meta description based on page
    const titleElement = document.querySelector('title');
    const metaDescriptionElement = document.querySelector('meta[name="description"]');
    let titleKey = 'meta_title_main_seo';
    let descKey = 'meta_description_main_seo';

    if (window.location.pathname.includes('contact.html')) {
        titleKey = 'meta_title_contact'; descKey = 'meta_description_contact';
    } else if (window.location.pathname.includes('privacy.html')) {
        titleKey = 'meta_title_privacy'; descKey = 'meta_description_privacy';
    } else if (window.location.pathname.includes('cookies.html')) {
        titleKey = 'meta_title_cookies'; descKey = 'meta_description_cookies';
    } else if (window.location.pathname.includes('terms.html')) {
        titleKey = 'meta_title_terms'; descKey = 'meta_description_terms';
    }

    if(titleElement) titleElement.textContent = getTranslation(titleKey);
    if(metaDescriptionElement) metaDescriptionElement.content = getTranslation(descKey);

    // Update language display (will always show "English")
    const currentLanguageNameSpan = document.getElementById('currentLanguageName');
    if (currentLanguageNameSpan) {
        currentLanguageNameSpan.textContent = getTranslation('lang_name');
    }
    // Update preset dropdown options
    const presetSelect = document.getElementById('presetSelect');
    if (presetSelect) {
        populatePresetSelect();
    }

    updateButtonTranslations();
    retranslateStatus(document.getElementById('statusArea'));
    retranslateStatus(document.getElementById('landingStatusArea'));
    retranslateStatus(document.getElementById('contactFormStatus'));
    debounceCalculateAndApplyWrapperSize(50);
}

function setLanguage(lang) { // Simplified
    translatePage('en'); // Always translate to English

    const languageToggleBtn = document.getElementById('languageToggleBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageToggleBtn && languageDropdown) {
        languageToggleBtn.setAttribute('aria-expanded', 'false');
        languageDropdown.classList.add('hidden');
    }
}

function getInitialLanguage() {
    // Simplified: always return English since others are removed
    return 'en';
}

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

function updateButtonTranslations() {
    const convertBtn = document.getElementById('convertBtn');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');
    const loadOptionsBtn = document.getElementById('loadOptionsBtn');
    const saveOptionsBtn = document.getElementById('saveOptionsBtn');

    if (convertBtn) {
        const key = convertBtn.disabled && (convertBtn.textContent === getTranslation('status_working') || !currentSvgContent)
                    ? 'update_vectorization_btn'
                    : (convertBtn.textContent === getTranslation('status_working')
                        ? 'status_working'
                        : 'update_vectorization_btn');
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

// --- UI Update Functions ---
function showLandingView() {
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const uploadNewBtn = document.getElementById('uploadNewBtn');
    if(landingView) landingView.classList.remove('hidden');
    if(appView) appView.classList.add('hidden');
    if(uploadNewBtn) uploadNewBtn.classList.add('hidden');
    resetUploadAreaVisuals();
}

function showAppView() {
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const uploadNewBtn = document.getElementById('uploadNewBtn');
    if(landingView) landingView.classList.add('hidden');
    if(appView) appView.classList.remove('hidden');
    if(uploadNewBtn) uploadNewBtn.classList.remove('hidden');
    updateOptionsAvailability(); // VTracer specific option visibility
    resetResultArea();
    resetZoomPan();
    debounceCalculateAndApplyWrapperSize(50);
}

function resetUploadAreaVisuals(){
    const dropZone = document.getElementById('dropZone');
    const fileInfoArea = document.getElementById('fileInfoArea');
    const uploadProgress = document.getElementById('uploadProgress');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const uploadArea = document.getElementById('uploadArea');
    const progressBar = document.getElementById('progressBar');
    const fileNameDisplay = document.getElementById('fileName');
    if(dropZone) dropZone.style.display = 'flex';
    if(fileInfoArea) fileInfoArea.classList.add('hidden');
    if(uploadProgress) uploadProgress.classList.add('hidden');
    if(startConversionBtn) startConversionBtn.classList.add('hidden');
    if(uploadArea) uploadArea.classList.remove('file-selected');
    if(progressBar) progressBar.style.width = '0%';
    if (fileNameDisplay) fileNameDisplay.textContent = '';
    updateStatus('', '', 0, false); // Clear landing status
}

function resetAppToLanding() {
    const imageInput = document.getElementById('imageInput');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    currentFile = null;
    currentSvgContent = '';
    if (imageInput) imageInput.value = '';
    if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
    if (previewOriginalImage) previewOriginalImage.removeAttribute('src');
    originalImageNaturalDims = { width: 0, height: 0 };
    resetZoomPan();
    if (originalImageWrapper) { originalImageWrapper.style.width = ''; originalImageWrapper.style.height = ''; originalImageWrapper.style.transform = ''; }
    if (vectorImageWrapper) { vectorImageWrapper.style.width = ''; vectorImageWrapper.style.height = ''; vectorImageWrapper.style.transform = ''; }
    handleResetOptions(false); // Reset options without showing status msg
    showLandingView();
    updateStatus('', '', 0, false); // Clear landing status
    updateStatus('', '', 0, true); // Clear app status
    if (convertBtn) { convertBtn.disabled = true; updateButtonTranslations(); }
    if (downloadBtn) downloadBtn.disabled = true;
}

function updateStatus(messageKey, type = 'info', clearDelay = 0, isAppStatus = true, replacements = {}) {
    const targetStatusArea = isAppStatus ? document.getElementById('statusArea') : document.getElementById('landingStatusArea');
    if (!targetStatusArea) return;
    clearTimeout(statusClearTimer);
    const message = messageKey ? getTranslation(messageKey, currentLang, replacements) : '';
    targetStatusArea.dataset.currentStatusKey = messageKey || '';
    targetStatusArea.dataset.currentStatusReplacements = JSON.stringify(replacements);
    targetStatusArea.dataset.currentStatusType = type;
    targetStatusArea.textContent = message;
    targetStatusArea.className = `status-area ${isAppStatus ? 'app-status' : 'landing-status'} ${type || ''}`.trim();
    targetStatusArea.style.display = message ? '' : 'none';
    if (type !== 'error' && clearDelay > 0 && messageKey) {
         statusClearTimer = setTimeout(() => {
            if(targetStatusArea.dataset.currentStatusKey === messageKey) { // Ensure message hasn't changed
                targetStatusArea.textContent = '';
                targetStatusArea.style.display = 'none';
                delete targetStatusArea.dataset.currentStatusKey;
                delete targetStatusArea.dataset.currentStatusReplacements;
                delete targetStatusArea.dataset.currentStatusType;
            }
        }, clearDelay);
    }
    if (type === 'error' && messageKey) {
        console.error(`UI Status (${isAppStatus ? 'App' : 'Landing'}):`, message);
    }
}

function showLandingError(message) {
    const landingStatusArea = document.getElementById('landingStatusArea');
    if (landingStatusArea) {
         landingStatusArea.textContent = message; // Display raw message since it's an error
         landingStatusArea.className = 'status-area landing-status error';
         landingStatusArea.style.display = '';
         // Clear any translation keys associated with it
         delete landingStatusArea.dataset.currentStatusKey;
         delete landingStatusArea.dataset.currentStatusReplacements;
         delete landingStatusArea.dataset.currentStatusType;
    } else {
         console.error("Landing Error (Status Area Not Found):", message);
    }
}

// --- Event Handlers ---
function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); document.getElementById('dropZone')?.classList.add('dragover'); }
function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); }
function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); document.getElementById('dropZone')?.classList.remove('dragover'); }
function handleDrop(e) {
    e.preventDefault(); e.stopPropagation();
    const dropZone = document.getElementById('dropZone');
    dropZone?.classList.remove('dragover');
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) handleFile(files[0]);
}

function handleFileSelectChange(event) {
    const file = event.target.files?.[0];
    if (file) {
        handleFile(file);
    } else {
        currentFile = null;
        const appView = document.getElementById('appView');
        if (!appView || appView.classList.contains('hidden')) {
            resetUploadAreaVisuals(); // Only reset landing if we are on landing view
        }
    }
}

function handleFile(file) {
    const imageInput = document.getElementById('imageInput');
    const appView = document.getElementById('appView');
    const fileNameDisplay = document.getElementById('fileName');
    const fileInfoArea = document.getElementById('fileInfoArea');
    const dropZone = document.getElementById('dropZone');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const uploadArea = document.getElementById('uploadArea');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');


    if (!file) return;
    updateStatus('', '', 0, false); // Clear landing status

    // File Validation
    const validationError = validateFile(file);
    if (validationError) {
        if (!appView || appView.classList.contains('hidden')) { // If on landing page
            showLandingError(validationError); // Show error on landing status
            resetUploadAreaVisuals();
            if(imageInput) imageInput.value = ''; // Clear file input
        } else { // If already on app page
            updateStatus('status_error_file_type', 'error', 0, true, { fileType: file.type || 'unknown' });
        }
        currentFile = null;
        return;
    }

    // File is valid, proceed
    currentFile = file;
    currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

    // Reset preview areas
    if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
    originalImageNaturalDims = { width: 0, height: 0 };
    if (previewOriginalImage) previewOriginalImage.removeAttribute('src');
    if(originalImageWrapper) { originalImageWrapper.style.width=''; originalImageWrapper.style.height=''; originalImageWrapper.style.transform=''; }
    if(vectorImageWrapper) { vectorImageWrapper.style.width=''; vectorImageWrapper.style.height=''; vectorImageWrapper.style.transform=''; }
    resetZoomPan();

    // Create object URL for preview
    try {
        currentFileObjectURL = URL.createObjectURL(file);
        if (previewOriginalImage) {
            previewOriginalImage.src = currentFileObjectURL; // Set preview source
        } else {
             throw new Error("Original preview image element not found.");
        }
    } catch(e) {
        const errorMsg = getTranslation('status_error_obj_url', currentLang, { errorMessage: e.message });
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

    // Update UI based on current view
    if(!appView || appView.classList.contains('hidden')) { // On Landing View
        if (fileNameDisplay) fileNameDisplay.textContent = file.name;
        if (fileInfoArea) fileInfoArea.classList.remove('hidden');
        if (dropZone) dropZone.style.display = 'none';
        if (startConversionBtn) {
             startConversionBtn.classList.remove('hidden');
             updateButtonTranslations();
        }
        if (uploadArea) uploadArea.classList.add('file-selected');
    } else { // Already in App View (uploading a new file)
         handleOptionsFormChange(); // Enable 'Update Vectorization' button because options might apply differently now
         resetResultArea(false); // Clear previous SVG result but keep status
         debounceCalculateAndApplyWrapperSize(100); // Recalculate preview size
         // Optionally trigger conversion automatically if needed
         // setTimeout(() => handleConvert(true), 50);
    }
}

function triggerConversionFromLanding() {
    const startConversionBtn = document.getElementById('startConversionBtn');
    const landingView = document.getElementById('landingView');
    const fileInfoArea = document.getElementById('fileInfoArea');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');

    if (!currentFile || !startConversionBtn || !landingView) return;

    startConversionBtn.disabled = true;
    startConversionBtn.textContent = getTranslation('status_processing');
    if (uploadProgress) {
         uploadProgress.classList.remove('hidden');
         if (progressBar) progressBar.style.width = '0%';
    }
    updateStatus('', '', 0, false); // Clear landing status

    // Simulate progress for UX, then switch view and convert
    simulateUploadProgress(() => {
         if (uploadProgress) uploadProgress.classList.add('hidden');
         startConversionBtn.disabled = false; // Re-enable in case user cancels
         startConversionBtn.classList.add('hidden'); // Hide it now
         if(fileInfoArea) fileInfoArea.classList.add('hidden');
         showAppView();
         setTimeout(() => handleConvert(true), 50); // Trigger initial conversion after view switch
    });
}

async function handleConvert(isInitial = false) {
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const appView = document.getElementById('appView');
    const svgOutputDiv = document.getElementById('svgOutput');
    const optionsForm = document.getElementById('optionsForm');

    if (!currentFile) {
         updateStatus('status_no_file', 'error', 0, true);
         return;
    }
    if (!convertBtn || !downloadBtn || !appView) return;

    const statusKey = isInitial ? 'status_vectorizing' : 'status_updating';
    updateStatus(statusKey, 'loading', 0, true);
    convertBtn.disabled = true;
    convertBtn.textContent = getTranslation('status_working');
    downloadBtn.disabled = true;

    // Show placeholder in SVG area
    if (svgOutputDiv) {
        const placeholderKey = isInitial ? 'preview_placeholder_processing' : 'preview_placeholder_loading';
        svgOutputDiv.innerHTML = `<p class="placeholder-text">${getTranslation(placeholderKey)}</p>`;
        svgOutputDiv.classList.add('placeholder-active');
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('imageFile', currentFile);

    // Append VTracer options (only enabled ones)
    if (optionsForm) {
        const data = new FormData(optionsForm);
        for (let [key, value] of data.entries()) {
            const el = optionsForm.elements[key];
            // Include only if element exists, is NOT disabled, has a value, and isn't the helper selector
            if (el && !el.closest('.option-group.disabled') && value !== '' && value !== null && key !== 'palette_selector') {
                formData.append(key, value);
            }
        }
    }

    console.log("Sending data for VTracer conversion:", Object.fromEntries(formData));

    // Make API call
    try {
        const response = await fetch('/convert', { method: 'POST', body: formData });

        if (!response.ok) {
            let errorMsg = `Server error: ${response.status} ${response.statusText}`;
            try {
                const errorResult = await response.json();
                if (errorResult && errorResult.error) errorMsg = errorResult.error;
            } catch (parseError) { console.warn("Could not parse error response body:", parseError); }
            throw new Error(errorMsg);
        }

        const result = await response.json();
        if (result.svg) {
            currentSvgContent = result.svg;
            if (svgOutputDiv) {
                svgOutputDiv.innerHTML = currentSvgContent; // Inject SVG
                svgOutputDiv.classList.remove('placeholder-active');
            }
            updateStatus('status_complete', 'success', 3000, true);
            downloadBtn.disabled = false;
            convertBtn.disabled = true; // Keep disabled until options change again
            updateButtonTranslations();
            debounceCalculateAndApplyWrapperSize(100); // Adjust size based on new SVG potentially
            if(isInitial) { resetZoomPan(); } // Reset zoom only on initial conversion
        } else {
            throw new Error(getTranslation('status_error_no_svg'));
        }
    } catch (error) {
        console.error('Conversion Failed:', error);
        const errorMessage = error.message || "An unknown error occurred.";
        updateStatus('status_error_conversion_failed', 'error', 0, true, { errorMessage: errorMessage });
        if (svgOutputDiv) {
             const errorText = getTranslation('status_error_conversion_failed', currentLang, {errorMessage: errorMessage});
             svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">${errorText}</p>`;
             svgOutputDiv.classList.add('placeholder-active');
        }
        downloadBtn.disabled = true;
        convertBtn.disabled = !currentFile; // Re-enable only if a file is still loaded
        updateButtonTranslations();
    }
}

function handleOptionsFormChange() {
    const optionsForm = document.getElementById('optionsForm');
    const paletteSelect = document.getElementById('optPalette');
    const colorPrecisionInput = document.getElementById('optColorPrecision');
    const convertBtn = document.getElementById('convertBtn');

    if (!optionsForm) return;

    // Sync hidden color_precision with visible palette selector
    if (paletteSelect && colorPrecisionInput) {
        colorPrecisionInput.value = paletteSelect.value;
    }

    // Enable update button if a file is loaded
    if (currentFile && convertBtn) {
        convertBtn.disabled = false;
        updateButtonTranslations();
    }

    updateOptionsAvailability(); // Show/hide conditional options
    resetPresetSelection(); // Deselect preset if options changed manually
}

function handleResetOptions(showStatus = true) {
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn');

    if (!optionsForm) return;
    const defaultsToApply = presets.find(p => p.key === 'general')?.options || defaultOptions;
    applyOptions(defaultsToApply);
    if (showStatus) {
        updateStatus('status_options_reset', 'success', 2000, true);
    }
    resetPresetSelection(); // Clear preset dropdown
    if (convertBtn) {
        convertBtn.disabled = true; // Disable update until next change
        updateButtonTranslations();
    }
    updateOptionsAvailability(); // Refresh conditional options visibility
}

function handlePresetChange(event) {
    const presetSelect = document.getElementById('presetSelect');
    const convertBtn = document.getElementById('convertBtn');

    if (!presetSelect) return;
    const selectedIndex = event.target.value;
    if (selectedIndex === "" || !presets[selectedIndex]) return;

    const selectedPreset = presets[selectedIndex];
    applyOptions(selectedPreset.options); // Apply the preset's options to the form

    // Show status message
    const presetNameKey = `preset_name_${selectedPreset.key}`;
    const presetName = getTranslation(presetNameKey) || selectedPreset.name;
    updateStatus('status_preset_loaded', 'info', 3000, true, { presetName: presetName });
    presetSelect.value = selectedIndex; // Ensure dropdown shows the selected preset

    // Enable update button if file exists
    if (currentFile && convertBtn) {
        convertBtn.disabled = false;
        updateButtonTranslations();
    }
    updateOptionsAvailability(); // Update conditional fields based on preset
}

function handleSaveOptions() {
    const optionsForm = document.getElementById('optionsForm');
    const downloadLink = document.getElementById('downloadLink');
    if (!optionsForm || !downloadLink) return;
    const currentOptions = {};
    const formData = new FormData(optionsForm);

    // Iterate through known default keys to ensure structure
    Object.keys(defaultOptions).forEach(key => {
        if (formData.has(key)) {
            const el = optionsForm.elements[key];
            // Only save if element exists and is not disabled
            if (el && !el.closest('.option-group.disabled')) {
                 // Special handling for palette_selector -> color_precision if needed
                 if (key === 'palette_selector') {
                     currentOptions['color_precision'] = formData.get(key);
                 } else {
                     currentOptions[key] = formData.get(key);
                 }
            }
        }
    });

    // Save as JSON
    try {
        const jsonString = JSON.stringify(currentOptions, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'vectorise-options.json';
        downloadLink.click();
        URL.revokeObjectURL(url);
        updateStatus('status_settings_saved', 'success', 2000, true);
    } catch (e) {
        console.error('Error saving options:', e);
        updateStatus('status_error_saving_settings', 'error', 0, true);
    }
}

function handleLoadOptionsFile(event) {
    const optionsFileInput = document.getElementById('optionsFileInput');
    const convertBtn = document.getElementById('convertBtn');
    const file = event.target.files?.[0];
    if (!file) {
         if(optionsFileInput) optionsFileInput.value = '';
         return;
    }
    if (file.type !== 'application/json') {
        updateStatus('status_error_select_json', 'error', 0, true);
        if(optionsFileInput) optionsFileInput.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const loadedOptions = JSON.parse(e.target.result);
            if (typeof loadedOptions !== 'object' || loadedOptions === null || Array.isArray(loadedOptions)) {
                throw new Error(getTranslation('status_error_invalid_json'));
            }

            // Validate structure - check if at least one known key exists
            const knownKeys = Object.keys(defaultOptions);
            const loadedKeys = Object.keys(loadedOptions);
            const hasKnownKey = loadedKeys.some(key => knownKeys.includes(key) || key === 'color_precision'); // Allow color_precision explicitly
            if (!hasKnownKey && !loadedOptions.hasOwnProperty('palette_selector')) { // Check palette_selector too
                throw new Error(getTranslation('status_error_no_options'));
            }

            // Filter and apply only known options
            const optionsToApply = {};
            knownKeys.forEach(key => {
                 if (loadedOptions.hasOwnProperty(key)) {
                     optionsToApply[key] = loadedOptions[key];
                 }
            });
            // Special handling for palette_selector (applies value to color_precision)
            if (loadedOptions.hasOwnProperty('palette_selector')) {
                 optionsToApply['palette_selector'] = loadedOptions['palette_selector'];
                 optionsToApply['color_precision'] = loadedOptions['palette_selector'];
             } else if (loadedOptions.hasOwnProperty('color_precision')) {
                  // If only color_precision exists, try to set palette_selector
                  optionsToApply['palette_selector'] = loadedOptions['color_precision'];
             }


            applyOptions(optionsToApply);
            updateStatus('status_settings_loaded', 'success', 3000, true);
            resetPresetSelection(); // Deselect preset
            if (currentFile && convertBtn) { // Re-enable convert button
                convertBtn.disabled = false;
                updateButtonTranslations();
            }
            updateOptionsAvailability(); // Update conditional visibility
        } catch (error) {
            console.error('Error processing loaded options file:', error);
            const specificError = error.message || getTranslation('status_error_reading_file');
            updateStatus('status_error_loading_settings', 'error', 0, true, { errorMessage: specificError });
        } finally {
            if(optionsFileInput) optionsFileInput.value = ''; // Clear input regardless
        }
    };
    reader.onerror = () => {
        updateStatus('status_error_reading_file', 'error', 0, true);
        if(optionsFileInput) optionsFileInput.value = '';
    };
    reader.readAsText(file);
}

function handleDownload() {
    const downloadLink = document.getElementById('downloadLink');
    if (!currentSvgContent || !downloadLink) return;
    try {
        const blob = new Blob([currentSvgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `${currentFilenameBase}_vectorised.svg`;
        downloadLink.click();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error('Error preparing SVG download:', e);
        updateStatus('status_error_downloading', 'error', 0, true);
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');
    if (!contactForm || !contactFormStatus) return;

    const nameInput = contactForm.elements['name'];
    const emailInput = contactForm.elements['email'];
    const subjectInput = contactForm.elements['subject'];
    const messageInput = contactForm.elements['message'];
    const recipientEmail = "jonkarystudio@gmail.com"; // Your email address

    let isValid = true;
    const requiredFields = [nameInput, emailInput, subjectInput, messageInput];

    // Basic validation
    requiredFields.forEach(input => {
         if (input) {
             input.classList.remove('is-invalid'); // Use class for styling consistency
             if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
             }
         } else { isValid = false; } // Should not happen if form is correct
    });

    // Email format validation
    if (emailInput && emailInput.value.trim() && !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
         emailInput.classList.add('is-invalid');
         isValid = false;
         if(requiredFields.every(input => input?.value.trim() || input === emailInput )) { // Only show email error if other fields are filled
              showContactFormStatus("contact_status_invalid_email", "error");
         }
         // Don't return immediately, show general error if other fields are missing too
    }

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
        window.location.href = mailtoLink;
        // Give user time to switch, then show success/reset form
        setTimeout(() => {
            if (contactForm) contactForm.reset();
            requiredFields.forEach(input => input?.classList.remove('is-invalid')); // Clear validation styles
            showContactFormStatus("contact_status_complete_send", "success", {}, 8000);
        }, 1500);
    } catch (error) {
        console.error("Failed to open mailto link:", error);
        showContactFormStatus("contact_status_error_email", "error", { recipient: recipientEmail });
    }
}

// --- Other Helper Functions ---
function validateFile(file) {
    if (!file) return getTranslation('status_no_file');
    const maxSizeMB = 15;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp']; // Allowed types
    if (file.size > maxSizeBytes) {
        return getTranslation('status_error_file_size');
    }
    if (!allowedTypes.includes(file.type)) {
        return getTranslation('status_error_file_type', currentLang, { fileType: file.type || 'unknown' });
    }
    return null; // No error
}

function simulateUploadProgress(callback) {
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    if (!uploadProgress || !progressBar ) {
        if (typeof callback === 'function') callback();
        return;
    }
    let progress = 0;
    progressBar.style.width = `0%`;
    uploadProgress.classList.remove('hidden');
    const interval = setInterval(() => {
         progress += Math.random() * 15 + 5; // Simulate variable progress
         progress = Math.min(progress, 100);
         progressBar.style.width = `${progress}%`;
         if (progress >= 100) {
             clearInterval(interval);
             setTimeout(() => {
                uploadProgress.classList.add('hidden');
                if (typeof callback === 'function') callback();
             }, 250); // Short delay after reaching 100%
         }
    }, 80); // Update interval
}

function calculateAndApplyWrapperSize() {
    const appView = document.getElementById('appView');
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');

    // Ensure we are in app view and elements exist
    if (!appView || appView.classList.contains('hidden') || !previewAreaWrapper || !previewOriginalImage || !originalImageWrapper || !vectorImageWrapper) {
        return;
    }
    // Get natural dimensions if not already stored
    if (originalImageNaturalDims.width === 0 && previewOriginalImage.naturalWidth > 0) {
         originalImageNaturalDims.width = previewOriginalImage.naturalWidth;
         originalImageNaturalDims.height = previewOriginalImage.naturalHeight;
         console.log("Captured natural dimensions:", originalImageNaturalDims);
    }
    // Exit if dimensions still not available
    if (!originalImageNaturalDims.width) {
         console.log("Natural dimensions not available yet.");
         return;
    }
    // Get container dimensions
    const containerWidth = previewAreaWrapper.clientWidth;
    const containerHeight = previewAreaWrapper.clientHeight;
    // Avoid division by zero or tiny containers
    if (containerWidth <= 1 || containerHeight <= 1) {
         console.log("Container dimensions too small or zero.");
         return;
     }
    // Calculate aspect ratios
    const imgRatio = originalImageNaturalDims.width / originalImageNaturalDims.height;
    const containerRatio = containerWidth / containerHeight;

    // Determine target dimensions to fit within container while maintaining aspect ratio
    let targetWidth, targetHeight;
    if (imgRatio > containerRatio) { // Image is wider than container
        targetWidth = containerWidth;
        targetHeight = targetWidth / imgRatio;
    } else { // Image is taller or same ratio as container
        targetHeight = containerHeight;
        targetWidth = targetHeight * imgRatio;
    }

    // Ensure positive dimensions and floor them
    targetWidth = Math.max(1, Math.floor(targetWidth));
    targetHeight = Math.max(1, Math.floor(targetHeight));

    // Apply dimensions to both wrappers
    originalImageWrapper.style.width = `${targetWidth}px`;
    originalImageWrapper.style.height = `${targetHeight}px`;
    vectorImageWrapper.style.width = `${targetWidth}px`;
    vectorImageWrapper.style.height = `${targetHeight}px`;

    console.log(`Applied wrapper size: ${targetWidth}x${targetHeight}`);
     setTransform(); // Reapply existing zoom/pan
}

function debounceCalculateAndApplyWrapperSize(delay = 150) {
    clearTimeout(previewSizeDebounceTimer);
    previewSizeDebounceTimer = setTimeout(() => {
        calculateAndApplyWrapperSize();
    }, delay);
}

function setupNumberInputSync() {
    const optionsForm = document.getElementById('optionsForm');
    if (!optionsForm) return;
    optionsForm.querySelectorAll('input[type="range"]').forEach(slider => {
        const numInputId = `${slider.id}Num`;
        const numInput = document.getElementById(numInputId);
        if (numInput) {
            const sliderStep = parseFloat(slider.step) || 1;
            const numStep = parseFloat(numInput.step) || sliderStep;
            const decimalPlaces = sliderStep === 1 || sliderStep === 0 ? 0 : (String(numStep).split('.')[1] || '').length;

            const syncSliderToNum = () => {
                numInput.value = parseFloat(slider.value).toFixed(decimalPlaces);
            };

            const syncNumToSlider = () => {
                let numVal = parseFloat(numInput.value);
                const minVal = parseFloat(slider.min);
                const maxVal = parseFloat(slider.max);
                if (isNaN(numVal)) return; // Ignore if not a number

                // Clamp value
                numVal = Math.max(minVal, Math.min(maxVal, numVal));

                // Round to nearest step if needed (more robust step snapping)
                 if (numStep > 0) {
                    numVal = Math.round(numVal / numStep) * numStep;
                 }

                // Prevent infinite loops by checking if slider value is already close
                 if (Math.abs(parseFloat(slider.value) - numVal) > numStep / 2) {
                     slider.value = String(numVal);
                     // Trigger input event on slider so other listeners react
                     slider.dispatchEvent(new Event('input',{bubbles:true}));
                 }
                 // Always update number input display to clamped/rounded value
                 numInput.value = numVal.toFixed(decimalPlaces);
            };

            safeAddListener(slider, 'input', syncSliderToNum);
            safeAddListener(numInput, 'change', syncNumToSlider); // Use change for final value
            // Consider 'input' on numInput too if immediate feedback is desired, but 'change' is often safer
            // safeAddListener(numInput, 'input', syncNumToSlider);

            syncSliderToNum(); // Initial sync
        }
    });
}

function updateOptionsAvailability() {
    // VTracer specific conditional options logic
    const optionsForm = document.getElementById('optionsForm');
    const modeSelect = document.getElementById('optMode');
    const colormodeSelect = document.getElementById('optColormode');
    const paletteSelect = document.getElementById('optPalette'); // Although palette itself is grouped below

    const splineThresholdGroup = document.getElementById('groupSplineThreshold');
    const spliceThresholdGroup = document.getElementById('groupSpliceThreshold');
    const segmentLengthGroup = document.getElementById('groupSegmentLength');
    const hierarchicalGroup = document.getElementById('groupHierarchical');
    const gradientStepGroup = document.getElementById('groupGradientStep');
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
    const paletteGroup = document.getElementById('groupPalette');

    if (!optionsForm || !modeSelect || !colormodeSelect) return;

    const mode = modeSelect.value;
    const colorMode = colormodeSelect.value;
    const isSpline = (mode === 'spline');
    const isPixel = (mode === 'pixel');
    const isColor = (colorMode === 'color');

    // Toggle groups based on conditions
    toggleOptionGroup(splineThresholdGroup, isSpline);
    toggleOptionGroup(spliceThresholdGroup, isSpline);
    toggleOptionGroup(segmentLengthGroup, isSpline);
    toggleOptionGroup(cornerThresholdGroup, !isPixel); // Disabled for Pixel mode
    toggleOptionGroup(hierarchicalGroup, isColor);     // Disabled for Binary mode
    toggleOptionGroup(gradientStepGroup, isColor);      // Disabled for Binary mode
    toggleOptionGroup(paletteGroup, isColor);           // Disabled for Binary mode
}

function storeDefaultOptions() {
    const optionsForm = document.getElementById('optionsForm');
    if (!optionsForm) return;
    const data = new FormData(optionsForm);
    for (let [key, value] of data.entries()) {
         if (key !== 'palette_selector') { // Exclude the helper selector
             defaultOptions[key] = value;
         }
    }
    // Store the initial palette value under color_precision specifically
    if (optionsForm.elements['palette_selector']) {
          defaultOptions['color_precision'] = optionsForm.elements['palette_selector'].value;
     }
    // Update the 'general' preset with these defaults
    const defaultPreset = presets.find(p => p.key === 'general');
    if (defaultPreset) {
        defaultPreset.options = { ...defaultOptions };
        // Ensure palette_selector matches color_precision in the general preset
        if (defaultOptions.hasOwnProperty('color_precision')) {
             defaultPreset.options['palette_selector'] = defaultOptions['color_precision'];
        }
    }
    console.log("Stored default options:", defaultOptions);
}

function populatePresetSelect() {
    const presetSelect = document.getElementById('presetSelect');
    if (!presetSelect) return;
    const currentVal = presetSelect.value; // Remember current selection if any
    presetSelect.innerHTML = `<option value="" disabled selected>${getTranslation('preset_select_placeholder')}</option>`;

    presets.forEach((preset, index) => {
        if (preset.key === 'general') return; // Skip showing 'General' as a loadable preset
        const option = document.createElement('option');
        option.value = index.toString(); // Use index as value
        const translationKey = `preset_name_${preset.key}`;
        option.textContent = getTranslation(translationKey) || preset.name; // Use translated name
        presetSelect.appendChild(option);
    });

    // Restore previous selection if it was valid and not 'General'
    if (currentVal !== "" && currentVal < presets.length && presets[currentVal]?.key !== 'general') {
        presetSelect.value = currentVal;
    } else {
        presetSelect.value = ""; // Default to placeholder
    }
}

function resetPresetSelection() {
    const presetSelect = document.getElementById('presetSelect');
    if(presetSelect && presetSelect.value !== "") {
        presetSelect.value = ""; // Set back to the placeholder
    }
}

function applyOptions(optionsToApply) {
    const optionsForm = document.getElementById('optionsForm');
    if (!optionsForm) return;
    console.log("Applying options:", optionsToApply);
    let needsLayoutUpdate = false;

    // Iterate through the options to apply
    for (const key in optionsToApply) {
        // Find the corresponding form element
        let element = optionsForm.elements[key];

         // Special case: map palette_selector value to the actual palette select element
         if (key === 'palette_selector') {
            element = optionsForm.elements['optPalette'];
        } else if (key === 'color_precision' && !optionsForm.elements['color_precision']){
            // If only color_precision is provided (e.g. from saved file),
            // try to apply it to the palette_selector if it exists
            const paletteSelect = optionsForm.elements['optPalette'];
            if (paletteSelect) {
                paletteSelect.value = String(optionsToApply[key]);
                // Trigger change/input on the actual select element
                paletteSelect.dispatchEvent(new Event('input', { bubbles: true }));
                paletteSelect.dispatchEvent(new Event('change', { bubbles: true }));
                 // Also update the hidden input if it exists
                 const hiddenPrecision = document.getElementById('optColorPrecision');
                 if(hiddenPrecision) hiddenPrecision.value = String(optionsToApply[key]);
            }
            continue; // Skip further processing for this key
        }

        if (element) {
            const value = String(optionsToApply[key]); // Ensure value is string

            if (element.type === 'radio' || element.type === 'checkbox') {
                // Handle radio/checkbox groups
                const matchingElement = Array.from(optionsForm.elements[key]).find(el => el.value === value);
                if(matchingElement) matchingElement.checked = true;
                else if(element.type === 'checkbox') element.checked = !!value; // Handle single checkbox boolean
            } else {
                // Handle select, text, number, range, hidden
                element.value = value;
            }

            // Trigger events to update UI (like slider<->number sync)
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));

            // Check if this option affects layout
            if (['mode', 'color_mode'].includes(key)) {
                needsLayoutUpdate = true;
            }
        } else {
            // Log if an element for a known option wasn't found (excluding palette_selector itself)
            if (key !== 'palette_selector') {
                 console.warn(`applyOptions: Element for key "${key}" not found in form.`);
            }
        }
    }

     // Update hidden color_precision if palette_selector was applied
     const paletteSelect = document.getElementById('optPalette');
     const hiddenPrecision = document.getElementById('optColorPrecision');
     if (paletteSelect && hiddenPrecision && optionsToApply.hasOwnProperty('palette_selector')) {
        hiddenPrecision.value = paletteSelect.value;
     }


    // Update conditional visibility if layout changed
    if (needsLayoutUpdate) {
        setTimeout(updateOptionsAvailability, 0); // Use setTimeout to ensure changes propagate
    }
}

function toggleOptionGroup(groupElement, enable) {
    if (!groupElement) return;
    const controls = groupElement.querySelectorAll('input, select');
    groupElement.classList.toggle('disabled', !enable); // Add/remove 'disabled' class on the group
    controls.forEach(control => {
        if(control) control.disabled = !enable; // Enable/disable individual controls
    });
}


// --- Zoom and Pan Functions ---
function setTransform() {
    const originalImageWrapper = document.getElementById('originalImageWrapper');
    const vectorImageWrapper = document.getElementById('vectorImageWrapper');
    if (!originalImageWrapper || !vectorImageWrapper) return;
    // Use Math.round for potentially smoother rendering on some browsers
    const transformValue = `translate(${Math.round(pointX)}px, ${Math.round(pointY)}px) scale(${scale})`;
    originalImageWrapper.style.transform = transformValue;
    vectorImageWrapper.style.transform = transformValue;
    updateZoomButtons();
}

function setupZoomPan() {
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    if (!previewAreaWrapper) return;

    // Mouse/Touch Down: Start panning
    const startPan = (e) => {
        if(e.button !== 0 && e.type !== 'touchstart') return; // Only main mouse button or touch
        e.preventDefault(); // Prevent text selection/default drag
        panning = true;
        const clientX = e.clientX ?? e.touches[0].clientX;
        const clientY = e.clientY ?? e.touches[0].clientY;
        start = { x: clientX - pointX, y: clientY - pointY }; // Record starting point relative to current pan
        previewAreaWrapper.classList.add('grabbing'); // Change cursor
        // Add move/end listeners to the window for smoother dragging outside the element
        window.addEventListener('mousemove', panMove, { passive: false });
        window.addEventListener('touchmove', panMove, { passive: false });
        window.addEventListener('mouseup', endPan);
        window.addEventListener('touchend', endPan);
        window.addEventListener('mouseleave', endPan); // Stop panning if mouse leaves window
    };

    // Mouse/Touch Move: Update pan position
    const panMove = (e) => {
        if(!panning) return;
        e.preventDefault();
        const clientX = e.clientX ?? e.touches[0].clientX;
        const clientY = e.clientY ?? e.touches[0].clientY;
        pointX = clientX - start.x; // Calculate new pan based on drag distance
        pointY = clientY - start.y;
        setTransform(); // Apply the new transform
    };

    // Mouse/Touch Up/Leave: End panning
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

    // Mouse Wheel: Zoom in/out
    const handleWheelZoom = (e) => {
         e.preventDefault(); // Prevent page scroll
        const rect = previewAreaWrapper.getBoundingClientRect();
        // Calculate mouse position relative to the preview area
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        // Calculate where the mouse pointer is *within the scaled image*
        const pointUnderMouseX = (mouseX - pointX) / scale;
        const pointUnderMouseY = (mouseY - pointY) / scale;

        const delta = -e.deltaY; // Wheel direction
        const zoomFactor = 1.18; // Zoom sensitivity
        let newScale = (delta > 0) ? scale * zoomFactor : scale / zoomFactor;
        newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)); // Clamp scale

        if(newScale === scale) return; // No change

        // Calculate new pan position to keep the point under mouse stationary
        pointX = mouseX - pointUnderMouseX * newScale;
        pointY = mouseY - pointUnderMouseY * newScale;
        scale = newScale;
        setTransform(); // Apply zoom and pan
    };

    // Attach listeners to the preview area
    safeAddListener(previewAreaWrapper, 'mousedown', startPan);
    safeAddListener(previewAreaWrapper, 'touchstart', startPan, { passive: false }); // Needs passive: false to prevent default touch actions
    safeAddListener(previewAreaWrapper, 'wheel', handleWheelZoom, { passive: false }); // Needs passive: false to prevent default scroll
}

function zoom(factor) { // Zoom from buttons (centers zoom)
    const previewAreaWrapper = document.getElementById('previewAreaWrapper');
    if (!previewAreaWrapper) return;
    const rect = previewAreaWrapper.getBoundingClientRect();
    // Center point of the preview area
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate where the center is *within the scaled image*
    const pointUnderCenterX = (centerX - pointX) / scale;
    const pointUnderCenterY = (centerY - pointY) / scale;

    let newScale = scale * factor;
    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)); // Clamp scale

    if(newScale === scale) return; // No change

    // Calculate new pan position to keep the center point stationary
    pointX = centerX - pointUnderCenterX * newScale;
    pointY = centerY - pointUnderCenterY * newScale;
    scale = newScale;
    setTransform(); // Apply zoom and pan
}

function resetZoomPan() {
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
}

function updateZoomButtons() {
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    if(zoomInBtn) zoomInBtn.disabled = (scale >= MAX_SCALE);
    if(zoomOutBtn) zoomOutBtn.disabled = (scale <= MIN_SCALE);
}

// --- SVG Specific Helpers ---
function handleSvgPathHover(event) { // Optional: for highlighting paths on hover
    const target = event.target;
    if(target && target.tagName === 'path' && target.closest('svg')) {
        target.classList.toggle('path-hover', event.type === 'mouseover');
    }
}

function resetResultArea(clearStatusToo = true) {
    const svgOutputDiv = document.getElementById('svgOutput');
    const downloadBtn = document.getElementById('downloadBtn');
    const statusArea = document.getElementById('statusArea');
    if(svgOutputDiv) {
        svgOutputDiv.innerHTML = `<p class="placeholder-text">${getTranslation('preview_placeholder_select')}</p>`;
        svgOutputDiv.classList.add('placeholder-active');
    }
    currentSvgContent = '';
    if(downloadBtn) downloadBtn.disabled = true;
    if(clearStatusToo && statusArea) {
         updateStatus('', '', 0, true); // Clear app status
    }
}

// Helper for contact form status
function showContactFormStatus(messageKey, type = 'info', replacements = {}, clearDelay = 5000) {
    const contactFormStatus = document.getElementById('contactFormStatus');
    if (!contactFormStatus) return;
    const message = getTranslation(messageKey, currentLang, replacements);

    contactFormStatus.textContent = message;
    contactFormStatus.className = `form-status ${type || ''}`.trim();
    contactFormStatus.style.display = ''; // Make visible

    // Store current state for retranslation if language changes
    contactFormStatus.dataset.currentStatusKey = messageKey;
    contactFormStatus.dataset.currentStatusReplacements = JSON.stringify(replacements);
    contactFormStatus.dataset.currentStatusType = type;

    // Auto-clear for non-errors or specific success messages
    if (type !== 'error' || messageKey === 'contact_status_complete_send') {
         const timer = setTimeout(() => {
             // Only clear if the message hasn't changed in the meantime
             if (contactFormStatus.dataset.currentStatusKey === messageKey) {
                 contactFormStatus.style.display = 'none';
                 // Clear stored state
                 delete contactFormStatus.dataset.currentStatusKey;
                 delete contactFormStatus.dataset.currentStatusReplacements;
                 delete contactFormStatus.dataset.currentStatusType;
             }
         }, clearDelay);
    }
}

// --- START: Info Tooltip Functions ---
function showInfoTooltip(button, infoKey) {
    hideInfoTooltip(); // Hide any existing tooltip

    const text = getTranslation(infoKey);
    if (!text || text.startsWith('_') || text.trim() === '') {
        console.warn(`No tooltip text found for key: ${infoKey}`);
        return;
    }

    infoTooltipElement = document.createElement('div');
    infoTooltipElement.className = 'info-tooltip';
    infoTooltipElement.textContent = text;
    document.body.appendChild(infoTooltipElement);
    currentInfoButton = button;

    positionTooltip();

    // Make it visible after positioning
    requestAnimationFrame(() => {
        infoTooltipElement.classList.add('visible');
    });
}

function hideInfoTooltip() {
    if (infoTooltipElement) {
        infoTooltipElement.classList.remove('visible');
        // Remove after transition finishes
        infoTooltipElement.addEventListener('transitionend', () => {
            if (infoTooltipElement && !infoTooltipElement.classList.contains('visible')) {
                infoTooltipElement.remove();
                infoTooltipElement = null;
                currentInfoButton = null;
            }
        }, { once: true });
         // Fallback removal if transition doesn't fire (e.g., display: none)
         setTimeout(() => {
             if (infoTooltipElement && !infoTooltipElement.classList.contains('visible')) {
                 infoTooltipElement.remove();
                 infoTooltipElement = null;
                 currentInfoButton = null;
             }
         }, 300); // Slightly longer than transition duration
    }
}

function positionTooltip() {
    if (!infoTooltipElement || !currentInfoButton) return;

    const btnRect = currentInfoButton.getBoundingClientRect();
    const tipRect = infoTooltipElement.getBoundingClientRect(); // Get initial size
    const spaceAbove = btnRect.top;
    const spaceBelow = window.innerHeight - btnRect.bottom;
    const arrowHeight = 6; // Height of the CSS arrow

    let top, left;
    let arrowClass = 'arrow-down'; // Default: tooltip below button

    // Position horizontally: Center tooltip above/below button
    left = btnRect.left + (btnRect.width / 2) - (tipRect.width / 2);

    // Position vertically: Prefer below, fallback to above
    if (spaceBelow > tipRect.height + arrowHeight) {
        top = btnRect.bottom + arrowHeight;
        arrowClass = 'arrow-up'; // Arrow points up from tooltip top edge
    } else if (spaceAbove > tipRect.height + arrowHeight) {
        top = btnRect.top - tipRect.height - arrowHeight;
        arrowClass = 'arrow-down'; // Arrow points down from tooltip bottom edge
    } else {
        // Fallback: Position below even if tight
        top = btnRect.bottom + arrowHeight;
         arrowClass = 'arrow-up';
    }

    // Prevent tooltip from going off-screen horizontally
    const minLeft = 10;
    const maxLeft = window.innerWidth - tipRect.width - 10;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    infoTooltipElement.style.top = `${top + window.scrollY}px`;
    infoTooltipElement.style.left = `${left + window.scrollX}px`;
    infoTooltipElement.classList.remove('arrow-up', 'arrow-down'); // Reset arrow classes
    infoTooltipElement.classList.add(arrowClass); // Add correct arrow class
}

function handleInfoButtonClick(event) {
     // Use closest to find the button, even if the icon inside is clicked
     const button = event.target.closest('.info-button');
     if (button) {
         event.stopPropagation(); // Prevent triggering outside click listener
         const infoKey = button.dataset.infoKey;
         if (infoKey) {
             // If clicking the same button that already has the tooltip open, close it.
             if (infoTooltipElement && infoTooltipElement.classList.contains('visible') && currentInfoButton === button) {
                 hideInfoTooltip();
             } else {
                 showInfoTooltip(button, infoKey);
             }
         }
     }
 }

function handleClickOutsideTooltip(event) {
    // Hide tooltip if click is outside the current button AND outside the tooltip itself
    if (infoTooltipElement && infoTooltipElement.classList.contains('visible')) {
        if (!currentInfoButton?.contains(event.target) && !infoTooltipElement.contains(event.target)) {
            hideInfoTooltip();
        }
    }
}
// --- END: Info Tooltip Functions ---


// --- START: AdBlock Detection Functions ---
function checkAdBlocker() {
    const baitElement = document.getElementById('adBlockBait');
    if (!baitElement) {
        console.warn('AdBlockBait element not found.');
        return; // Cannot perform check
    }

    // Use multiple checks for robustness
    if (baitElement.offsetHeight === 0 || // Most reliable check
        baitElement.clientHeight === 0 || // Alternative height check
        baitElement.offsetParent === null || // Checks if it's rendered in layout
        window.getComputedStyle(baitElement).getPropertyValue('display') === 'none' ||
        window.getComputedStyle(baitElement).getPropertyValue('visibility') === 'hidden')
    {
        adBlockerDetected = true;
        console.log('Ad blocker likely detected (bait element hidden).');
    } else {
        console.log('Ad blocker not detected (bait element visible).');
        adBlockerDetected = false;
    }
}

function showAdBlockMessage() {
    const messageBanner = document.getElementById('adblockMessage');
    const closeButton = document.getElementById('closeAdblockMessage');

    if (!messageBanner || !closeButton) {
        console.warn('AdBlock message banner or close button not found.');
        return;
    }

    // Check sessionStorage to see if dismissed during this session
    try {
        if (sessionStorage.getItem('adblockMessageDismissed') === 'true') {
            console.log('AdBlock message previously dismissed in this session.');
            return; // Don't show if already dismissed
        }
    } catch (e) {
        console.warn("Could not access sessionStorage for adblock dismissal check.");
        // Continue without session check if sessionStorage fails
    }

    // If detected and not dismissed, show the message
    if (adBlockerDetected) {
        // Ensure content is translated before showing
        messageBanner.querySelectorAll('[data-translate], [data-translate-title]').forEach(el => {
            const key = el.dataset.translate || el.dataset.translateTitle;
            const isTitle = !!el.dataset.translateTitle;
            if(key) {
                const translation = getTranslation(key); // Always uses 'en'
                if (translation !== `_${key}_`) {
                    if (isTitle) el.title = translation;
                    else el.textContent = translation;
                }
            }
        });
        // Show the banner
        messageBanner.classList.remove('hidden');

        // Add listener to close button (only once)
        closeButton.addEventListener('click', () => {
            messageBanner.classList.add('hidden');
            // Store dismissal state for the current browser session
            try {
                sessionStorage.setItem('adblockMessageDismissed', 'true');
            } catch (e) {
                console.warn("Could not save adblock dismissal state to sessionStorage.");
            }
        }, { once: true });
    }
}
// --- END: AdBlock Detection Functions ---

// --- Comparison Slider Function ---
function setupComparisonSliders() {
    document.querySelectorAll('.comparison-slider-container').forEach(container => {
        const imgBefore = container.querySelector('.img-before');
        const imgAfter = container.querySelector('.img-after');

        if (!imgBefore || !imgAfter) return;

        const handleMove = (e) => {
            const rect = container.getBoundingClientRect();
            // Use pageX for touch/mouse consistency relative to document
            const x = (e.pageX || e.touches[0].pageX) - rect.left - window.scrollX;
            let percentage = (x / rect.width) * 100;
            percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100
            imgAfter.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };

        const handleEnd = () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
        };

        const handleStart = (e) => {
            // Only activate on direct interaction with the container
            if (e.target !== container && !container.contains(e.target)) return;
             e.preventDefault(); // Prevent image drag etc.
            handleMove(e); // Initial position set
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchend', handleEnd);
        };

        // Use mouseenter/leave for hover effect without needing drag
        safeAddListener(container, 'mousemove', handleMove);
         safeAddListener(container, 'touchmove', handleMove);

        // Optional: Reset on mouse leave
        safeAddListener(container, 'mouseleave', () => {
             imgAfter.style.clipPath = `inset(0 50% 0 0)`; // Reset to 50%
        });
        // Optional: Set initial state
        imgAfter.style.clipPath = `inset(0 50% 0 0)`;
    });
}


// --- Initialization (DOM Ready) ---
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM Elements (cache them)
    const landingView = document.getElementById('landingView');
    const appView = document.getElementById('appView');
    const imageInput = document.getElementById('imageInput');
    const dropZone = document.getElementById('dropZone');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const startConversionBtn = document.getElementById('startConversionBtn');
    const optionsForm = document.getElementById('optionsForm');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const uploadNewBtn = document.getElementById('uploadNewBtn');
    const resetOptionsBtn = document.getElementById('resetOptionsBtn');
    const presetSelect = document.getElementById('presetSelect');
    const saveOptionsBtn = document.getElementById('saveOptionsBtn');
    const loadOptionsBtn = document.getElementById('loadOptionsBtn');
    const optionsFileInput = document.getElementById('optionsFileInput');
    const svgOutputDiv = document.getElementById('svgOutput');
    const previewOriginalImage = document.getElementById('previewOriginalImage');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    const contactForm = document.getElementById('contactForm');
    const languageToggleBtn = document.getElementById('languageToggleBtn'); // Keep for structure, though funcionality limited
    const languageDropdown = document.getElementById('languageDropdown');   // Keep for structure
    const optionsPanel = document.querySelector('.options-panel'); // For attaching tooltip listener

    // 1. Determine and set initial language (simplified to always 'en')
    currentLang = getInitialLanguage();
    setLanguage(currentLang); // Sets to 'en' and translates

    // 2. Set up based on page context
    if (landingView || appView) { // On main app page (index.html)
        console.log("vectorise.me script initializing (App Mode)...");

        // Store initial form values as defaults & populate 'general' preset
        if (optionsForm) {
            storeDefaultOptions();
        }
        if (presetSelect) {
            populatePresetSelect(); // Populate with English names
        }

        // --- Attach Event Listeners ---
        safeAddListener(optionsForm, 'change', handleOptionsFormChange);
        safeAddListener(optionsForm, 'input', handleOptionsFormChange);
        safeAddListener(imageInput, 'change', handleFileSelectChange);
        safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
        safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
        safeAddListener(convertBtn, 'click', () => handleConvert(false));
        safeAddListener(downloadBtn, 'click', handleDownload);
        safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
        safeAddListener(resetOptionsBtn, 'click', () => handleResetOptions(true));
        safeAddListener(presetSelect, 'change', handlePresetChange);
        safeAddListener(saveOptionsBtn, 'click', handleSaveOptions);
        safeAddListener(loadOptionsBtn, 'click', () => optionsFileInput?.click());
        safeAddListener(optionsFileInput, 'change', handleLoadOptionsFile);
        safeAddListener(zoomInBtn, 'click', () => zoom(1.4));
        safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.4));
        safeAddListener(zoomResetBtn, 'click', resetZoomPan);
        safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
        safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
        safeAddListener(previewOriginalImage, 'load', () => {
            console.log("Original preview image loaded.");
            debounceCalculateAndApplyWrapperSize(50); // Calculate size once loaded
        });
        safeAddListener(previewOriginalImage, 'error', (e) => {
            console.error("Failed to load original preview image. Check Object URL or file.", e);
            updateStatus('status_error_obj_url', 'error', 0, true, {errorMessage: 'Image preview failed.'})
        });
        if (dropZone) {
            safeAddListener(dropZone, 'dragenter', handleDragEnter, false);
            safeAddListener(dropZone, 'dragover', handleDragOver, false);
            safeAddListener(dropZone, 'dragleave', handleDragLeave, false);
            safeAddListener(dropZone, 'drop', handleDrop, false);
            safeAddListener(dropZone, 'click', (e) => {
                if (imageInput && e.target !== imageInput && !e.target.closest('button, a, label')) {
                    imageInput.click(); // Trigger file input click when drop zone is clicked
                }
            });
        }

        // Attach tooltip listener to the panel containing the info buttons
        if (optionsPanel) {
            safeAddListener(optionsPanel, 'click', handleInfoButtonClick);
        } else if(optionsForm){ // Fallback if panel selector fails
             console.warn("Options panel not found, attaching tooltip listener to form.");
             safeAddListener(optionsForm, 'click', handleInfoButtonClick);
        }

        // Initial setup calls
        setupZoomPan();
        updateZoomButtons();
        setupNumberInputSync();
        setupComparisonSliders(); // Initialize comparison sliders on landing
        updateOptionsAvailability(); // Set initial VTracer conditional options visibility
        showLandingView(); // Start on landing page

    } else { // On other static pages (contact, privacy, etc.)
        console.log("vectorise.me script initializing (Static Page Mode)...");
        // Initialize Comparison Sliders if they appear on static pages (currently none)
        setupComparisonSliders();
         // Initialize Info Tooltip listeners if needed on static pages (currently none)
    }

    // Common Listeners for all pages
    if (contactForm) {
        safeAddListener(contactForm, 'submit', handleContactFormSubmit);
        console.log("Contact form listeners added.");
    }

    // Language dropdown listener (simplified as it only shows English)
    if (languageToggleBtn && languageDropdown) {
        safeAddListener(languageToggleBtn, 'click', (e) => {
            e.stopPropagation();
            // Basic toggle, no language change needed
            const isExpanded = languageToggleBtn.getAttribute('aria-expanded') === 'true';
            languageToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            languageDropdown.classList.toggle('hidden', isExpanded);
        });
        // Links inside dropdown just close it now
        languageDropdown.querySelectorAll('a[lang]').forEach(link => {
            safeAddListener(link, 'click', (e) => {
                 e.preventDefault();
                 languageToggleBtn.setAttribute('aria-expanded', 'false');
                 languageDropdown.classList.add('hidden');
            });
        });
        console.log("Simplified language dropdown listeners added.");
    } else {
         console.warn("Language toggle button or dropdown element not found.");
    }

    // Global Listeners (Tooltip closing, resize handling, AdBlock check)
    safeAddListener(document, 'click', handleClickOutsideTooltip); // Close tooltips on outside click
    safeAddListener(document, 'keydown', (event) => { // Close tooltips with Escape key
         if (event.key === 'Escape' && infoTooltipElement && infoTooltipElement.classList.contains('visible')) {
             hideInfoTooltip();
         }
     });
    let resizeTimeout; // For window resize debouncing
    safeAddListener(window, 'resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const appView = document.getElementById('appView');
            if (appView && !appView.classList.contains('hidden')) { // Only recalculate if app view is visible
                 debounceCalculateAndApplyWrapperSize();
                 if(infoTooltipElement && infoTooltipElement.classList.contains('visible')) {
                     positionTooltip(); // Reposition visible tooltip on resize
                 }
            }
        }, 150);
    });

    // --- AdBlock Check Trigger ---
    // Wait a short moment after page load before checking
    setTimeout(() => {
        checkAdBlocker(); // Perform the check
        showAdBlockMessage(); // Show message if needed
    }, 500); // Delay in milliseconds

    console.log(`Initialization complete. Current language: ${currentLang}`);

}); // End DOMContentLoaded