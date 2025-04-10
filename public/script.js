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
        color_detail_title: "Color detail",
        color_detail_label: "Color Detail:",
        color_detail_full: "Full (8 bit)",
        color_detail_standard: "Standard (6 bit)",
        color_detail_reduced: "Reduced (5 bit)",
        color_detail_limited: "Limited (4 bit)",
        color_detail_posterized: "Posterized (3 bit)",
        color_mode_title: "Color mode",
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
        corner_thr_label: "Corner Thr.:",
        path_prec_label: "Path Precision:",
        unit_dec: "dec",
        spline_thr_label: "Spline Thr.:",
        splice_thr_label: "Splice Thr.:",
        segment_len_label: "Segment Len.:",
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
        footer_links_heading: "Links",
        footer_home_link: "Home",
        footer_contact_link: "Contact",
        footer_legal_heading: "Legal",
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
        legal_date_placeholder: "[Insert Date]",
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
        status_working: "Working...", // Added for button text
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
        // Placeholder for Page 1 content
        meta_title_page1: "Page 1 - Vectorise.Me",
        meta_description_page1: "Placeholder description for Page 1.",
        page1_h1: "Page 1 Title",
        page1_p1: "This is placeholder content for Page 1. Replace this with your actual information, details, or features relevant to this page.",
        page1_p2: "You can add more paragraphs, images, lists, or any other HTML elements here as needed.",
        // Placeholder for Page 2 content
        meta_title_page2: "Page 2 - Vectorise.Me",
        meta_description_page2: "Placeholder description for Page 2.",
        page2_h1: "Page 2 Title",
        page2_p1: "Content for Page 2. This page might discuss a different topic, feature, or provide alternative information compared to Page 1.",
        page2_p2: "Remember to update the translation keys in your script.js file.",
        page2_li1: "Example list item 1",
        page2_li2: "Example list item 2",
        // Placeholder for Page 3 content
        meta_title_page3: "Page 3 - Vectorise.Me",
        meta_description_page3: "Placeholder description for Page 3.",
        page3_h1: "Page 3 Title",
        page3_p1: "This is the third placeholder page. Add relevant content here.",
        page3_quote: "A sample blockquote element can also be included.",
        // Placeholder for Page 4 content
        meta_title_page4: "Page 4 - Vectorise.Me",
        meta_description_page4: "Placeholder description for Page 4.",
        page4_h1: "Page 4 Title",
        page4_p1: "This is the final placeholder page (Page 4).",
        page4_p2: "Ensure you add relevant translation keys like 'page4_h1', 'page4_p1', etc., to your script.js translations object.",

    },
    // --- German (de) ---
    de: {
        lang_name: "Deutsch",
        // ... ADD ALL GERMAN TRANSLATIONS HERE ...
        meta_title_main_short: "[DE] Gratis Bild zu SVG Konverter",
        upload_new: "[DE] Neu hochladen",
        // ... etc
    },
    // --- Spanish (es) ---
    es: {
        lang_name: "Español",
        // ... ADD ALL SPANISH TRANSLATIONS HERE ...
        meta_title_main_short: "[ES] Convertidor Gratuito de Imagen a SVG",
        upload_new: "[ES] Subir Nuevo",
        // ... etc
    },
     // --- French (fr) ---
    fr: {
        lang_name: "Français",
        // ... ADD ALL FRENCH TRANSLATIONS HERE ...
         meta_title_main_short: "[FR] Convertisseur d'Image en SVG Gratuit",
        upload_new: "[FR] Télécharger Nouveau",
        // ... etc
    },
     // --- Hindi (hi) ---
    hi: {
        lang_name: "हिन्दी",
        // ... ADD ALL HINDI TRANSLATIONS HERE ...
        meta_title_main_short: "[HI] मुफ्त छवि से एसवीजी परिवर्तक",
        upload_new: "[HI] नया अपलोड करें",
        // ... etc
    },
     // --- Indonesian (id) ---
    id: {
        lang_name: "Indonesia",
        // ... ADD ALL INDONESIAN TRANSLATIONS HERE ...
         meta_title_main_short: "[ID] Konverter Gambar ke SVG Gratis",
        upload_new: "[ID] Unggah Baru",
        // ... etc
    },
     // --- Italian (it) ---
    it: {
        lang_name: "Italiano",
        // ... ADD ALL ITALIAN TRANSLATIONS HERE ...
        meta_title_main_short: "[IT] Convertitore Gratuito da Immagine a SVG",
        upload_new: "[IT] Carica Nuovo",
        // ... etc
    },
     // --- Japanese (ja) ---
    ja: {
        lang_name: "日本語",
        // ... ADD ALL JAPANESE TRANSLATIONS HERE ...
         meta_title_main_short: "[JA] 無料画像SVG変換ツール",
        upload_new: "[JA] 新規アップロード",
        // ... etc
    },
     // --- Korean (ko) ---
    ko: {
        lang_name: "한국어",
        // ... ADD ALL KOREAN TRANSLATIONS HERE ...
        meta_title_main_short: "[KO] 무료 이미지 SVG 변환기",
        upload_new: "[KO] 새로 업로드",
        // ... etc
    },
     // --- Polish (pl) ---
    pl: {
        lang_name: "Polski",
        // ... ADD ALL POLISH TRANSLATIONS HERE ...
        meta_title_main_short: "[PL] Darmowy Konwerter Obrazów na SVG",
        upload_new: "[PL] Prześlij Nowy",
        // ... etc
    },
     // --- Portuguese (pt) ---
    pt: {
        lang_name: "Português",
        // ... ADD ALL PORTUGUESE TRANSLATIONS HERE ...
        meta_title_main_short: "[PT] Conversor Gratuito de Imagem para SVG",
        upload_new: "[PT] Carregar Novo",
        // ... etc
    },
     // --- Russian (ru) ---
    ru: {
        lang_name: "Русский",
        // ... ADD ALL RUSSIAN TRANSLATIONS HERE ...
        meta_title_main_short: "[RU] Бесплатный Конвертер Изображений в SVG",
        upload_new: "[RU] Загрузить новый",
        // ... etc
    },
     // --- Thai (th) ---
    th: {
        lang_name: "ไทย",
        // ... ADD ALL THAI TRANSLATIONS HERE ...
         meta_title_main_short: "[TH] เครื่องมือแปลงรูปภาพเป็น SVG ฟรี",
        upload_new: "[TH] อัปโหลดใหม่",
        // ... etc
    },
     // --- Turkish (tr) ---
    tr: {
        lang_name: "Türkçe",
        // ... ADD ALL TURKISH TRANSLATIONS HERE ...
        meta_title_main_short: "[TR] Ücretsiz Resimden SVG'ye Dönüştürücü",
        upload_new: "[TR] Yeni Yükle",
        // ... etc
    },
     // --- Vietnamese (vi) ---
    vi: {
        lang_name: "Tiếng Việt",
        // ... ADD ALL VIETNAMESE TRANSLATIONS HERE ...
        meta_title_main_short: "[VI] Công cụ chuyển đổi ảnh sang SVG miễn phí",
        upload_new: "[VI] Tải lên mới",
        // ... etc
    },
     // --- Simplified Chinese (zh-CN) ---
    'zh-CN': {
        lang_name: "简体中文",
        // ... ADD ALL SIMPLIFIED CHINESE TRANSLATIONS HERE ...
        meta_title_main_short: "[zh-CN] 免费图片转SVG转换器",
        upload_new: "[zh-CN] 上传新的",
        // ... etc
    },
     // --- Traditional Chinese (zh-TW) ---
    'zh-TW': {
        lang_name: "繁體中文",
        // ... ADD ALL TRADITIONAL CHINESE TRANSLATIONS HERE ...
        meta_title_main_short: "[zh-TW] 免費圖片轉SVG轉換器",
        upload_new: "[zh-TW] 上傳新的",
        // ... etc
    },
     // --- Arabic (ar) ---
    ar: {
        lang_name: "العربية",
        // ... ADD ALL ARABIC TRANSLATIONS HERE ...
        meta_title_main_short: "[AR] محول صور مجاني إلى SVG",
        upload_new: "[AR] تحميل جديد",
        // ... etc
    },
};


document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
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
    const colorPrecisionGroup = document.getElementById('groupColorPrecision'); // Keep reference even if unused
    const cornerThresholdGroup = document.getElementById('groupCornerThreshold');
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
    const defaultOptions = {};
    let scale = 1;
    const MIN_SCALE = 0.15;
    const MAX_SCALE = 10;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };
    let originalImageNaturalDims = { width: 0, height: 0 };
    let currentLang = 'en';
    let statusClearTimer;

    // --- Preset Definitions (Ensure keys match translation keys) ---
    const presets = [
        { key: "general", name: "General / Balanced", options: { /* Populated by storeDefaultOptions */ } },
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
        } else if (!element && event !== 'DOMContentLoaded' && event !== 'resize' && event !== 'click' && event !== 'submit') {
            // console.warn(`Element not found for listener: ${event} on path: ${window.location.pathname}`);
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
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return text;
    }

    function translatePage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        // Translate elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            const translation = getTranslation(key, lang);
            // Only update if translation is not the placeholder key itself
            if (translation !== `_${key}_`) {
                 el.textContent = translation;
            }
        });

        // Translate attributes
        document.querySelectorAll('[data-translate-placeholder], [data-translate-title]').forEach(el => {
            const placeholderKey = el.dataset.translatePlaceholder;
            const titleKey = el.dataset.translateTitle;
            if (placeholderKey) {
                const translation = getTranslation(placeholderKey, lang);
                if (translation !== `_${placeholderKey}_`) el.placeholder = translation;
            }
            if (titleKey) {
                 const translation = getTranslation(titleKey, lang);
                 if (translation !== `_${titleKey}_`) el.title = translation;
            }
        });

        // Translate specific dynamic elements
        if (currentLanguageNameSpan) {
            currentLanguageNameSpan.textContent = getTranslation('lang_name', lang);
        }
        if (presetSelect) {
            populatePresetSelect(); // Ensure dropdown options are translated
        }
        if (convertBtn) {
             // Update button text based on its current logical state
             const isDisabled = convertBtn.disabled;
             if (isDisabled && !currentSvgContent) { // Disabled before first conversion or after reset
                 convertBtn.textContent = getTranslation('update_vectorization_btn');
             } else if (isDisabled && currentSvgContent) { // Disabled after successful update
                 convertBtn.textContent = getTranslation('update_vectorization_btn');
             } else if (!isDisabled) { // Enabled, waiting for update click
                 convertBtn.textContent = getTranslation('update_vectorization_btn'); // Or perhaps 'Click to Update'?
             }
             // Note: 'status_working' is handled within handleConvert
        }
        if (startConversionBtn && !startConversionBtn.classList.contains('hidden')) {
             startConversionBtn.textContent = getTranslation('vectorize_image_btn');
        }
        if (downloadBtn) {
            downloadBtn.textContent = getTranslation('download_svg_btn');
        }


        // Retranslate status messages if they are currently displayed
        retranslateStatus(statusArea);
        retranslateStatus(landingStatusArea);
        retranslateStatus(contactFormStatus);
    }

    function retranslateStatus(targetStatusArea) {
        if (targetStatusArea && targetStatusArea.dataset.currentStatusKey && targetStatusArea.style.display !== 'none') {
            const currentKey = targetStatusArea.dataset.currentStatusKey;
            const currentReplacements = JSON.parse(targetStatusArea.dataset.currentStatusReplacements || '{}');
            const retranslatedMsg = getTranslation(currentKey, currentLang, currentReplacements);
             if (retranslatedMsg !== `_${currentKey}_`) {
                 targetStatusArea.textContent = retranslatedMsg;
             }
        }
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            lang = 'en'; // Default to English if language not found
        }
        translatePage(lang);
        try {
            localStorage.setItem('vectoriseLang', lang);
        } catch (e) { /* Ignore localStorage errors */ }

        if (languageToggleBtn && languageDropdown) {
            languageToggleBtn.setAttribute('aria-expanded', 'false');
            languageDropdown.classList.add('hidden');
        }
    }

    function getInitialLanguage() {
        let savedLang = null;
        try { savedLang = localStorage.getItem('vectoriseLang'); } catch (e) {}
        const browserLang = navigator.language?.split('-')[0];

        // Prioritize saved lang, then browser lang (if supported), else English
        return (savedLang && translations[savedLang]) ? savedLang :
               (browserLang && translations[browserLang]) ? browserLang :
               'en';
    }

    // --- UI Update Functions ---
    function showLandingView() {
        if(landingView) landingView.classList.remove('hidden');
        if(appView) appView.classList.add('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.add('hidden');
        resetUploadAreaVisuals();
    }

    function showAppView() {
        if(landingView) landingView.classList.add('hidden');
        if(appView) appView.classList.remove('hidden');
        if(uploadNewBtn) uploadNewBtn.classList.remove('hidden');
        updateOptionsAvailability();
        resetResultArea(); // Clear previous results
        resetZoomPan();
        updateStatus('', '', 0, true); // Clear app status message
        calculateAndApplyWrapperSize(); // Size preview correctly
    }

    function resetUploadAreaVisuals(){
        if(dropZone) dropZone.style.display = 'flex';
        if(fileInfoArea) fileInfoArea.classList.add('hidden');
        if(uploadProgress) uploadProgress.classList.add('hidden');
        if(startConversionBtn) startConversionBtn.classList.add('hidden');
        if(uploadArea) uploadArea.classList.remove('file-selected');
        if(progressBar) progressBar.style.width = '0%';
        if (fileNameDisplay) fileNameDisplay.textContent = '';
        // Clear any previous landing error message
        updateStatus('', '', 0, false);
    }

    function resetAppToLanding() {
        currentFile = null;
        currentSvgContent = '';
        if (imageInput) imageInput.value = '';
        if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
        if (previewOriginalImage) previewOriginalImage.removeAttribute('src');
        originalImageNaturalDims = { width: 0, height: 0 };
        resetZoomPan(); // Reset zoom/pan state
        // Reset wrapper styles explicitly
        if (originalImageWrapper) { originalImageWrapper.style.width = ''; originalImageWrapper.style.height = ''; originalImageWrapper.style.transform = ''; }
        if (vectorImageWrapper) { vectorImageWrapper.style.width = ''; vectorImageWrapper.style.height = ''; vectorImageWrapper.style.transform = ''; }
        // Reset options to default
        if (optionsForm) handleResetOptions();
        // Reset UI visibility
        showLandingView();
        // Clear status messages
        updateStatus('', '', 0, false);
        updateStatus('', '', 0, true);
        // Ensure buttons are in correct initial state
        if (convertBtn) convertBtn.disabled = true;
        if (downloadBtn) downloadBtn.disabled = true;
    }

    function updateStatus(messageKey, type = '', clearDelay = 0, isAppStatus = true, replacements = {}) {
        const target = isAppStatus ? statusArea : landingStatusArea;
        if (!target) return;

        clearTimeout(statusClearTimer); // Clear existing timer

        const message = messageKey ? getTranslation(messageKey, currentLang, replacements) : '';

        // Store key info for potential re-translation
        if (messageKey) {
            target.dataset.currentStatusKey = messageKey;
            target.dataset.currentStatusReplacements = JSON.stringify(replacements);
            target.dataset.currentStatusType = type;
        } else {
            delete target.dataset.currentStatusKey;
            delete target.dataset.currentStatusReplacements;
            delete target.dataset.currentStatusType;
        }

        target.textContent = message;
        // Base classes + type class
        target.className = `status-area ${isAppStatus ? 'app-status' : 'landing-status'} ${type || ''}`.trim();

        // Control visibility
        target.style.display = message ? '' : 'none'; // Use empty string for default (block) display


        // Set timer to clear non-error messages
        if (type !== 'error' && clearDelay > 0 && messageKey) {
             statusClearTimer = setTimeout(()=>{
                // Check if the message is still the same one before clearing
                if(target.dataset.currentStatusKey === messageKey) {
                    target.textContent = '';
                    target.className = `status-area ${isAppStatus ? 'app-status' : 'landing-status'}`; // Reset class
                    target.style.display = 'none'; // Hide it
                    // Clear stored key info
                    delete target.dataset.currentStatusKey;
                    delete target.dataset.currentStatusReplacements;
                    delete target.dataset.currentStatusType;
                }
            }, clearDelay);
        }
        if (type === 'error' && messageKey) { console.error("UI Status:", message); }
    }

    function showLandingError(message) {
        // Directly display validation errors as they might not have keys
        if (landingStatusArea) {
             landingStatusArea.textContent = message;
             landingStatusArea.className = 'status-area landing-status error';
             landingStatusArea.style.display = ''; // Ensure it's visible
             delete landingStatusArea.dataset.currentStatusKey; // No key to store
        } else {
             console.error("Landing Error:", message);
        }
    }

    // --- Event Handlers ---
    function handleDragEnter(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.add('dragover'); }
    function handleDragOver(e) { e.preventDefault(); e.stopPropagation(); /* Needed */ }
    function handleDragLeave(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); }
    function handleDrop(e) { e.preventDefault(); e.stopPropagation(); dropZone?.classList.remove('dragover'); const files = e.dataTransfer?.files; if (files && files.length > 0) handleFile(files[0]); }
    function handleFileSelectChange(event) { const file = event.target.files?.[0]; if (file) handleFile(file); else { currentFile=null; if (landingView) resetUploadAreaVisuals(); } } // Reset on cancel

    function handleFile(file) {
        if (!file || (!landingView && !appView)) return;
        updateStatus('', '', 0, false); // Clear landing status

        const validationError = validateFile(file);
        if (validationError) {
            showLandingError(validationError);
            resetUploadAreaVisuals();
            if(imageInput) imageInput.value = '';
            currentFile = null;
            return;
        }

        currentFile = file;
        currentFilenameBase = file.name.includes('.') ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;

        if (currentFileObjectURL) { URL.revokeObjectURL(currentFileObjectURL); currentFileObjectURL = null; }
        originalImageNaturalDims = { width: 0, height: 0 };
        if(originalImageWrapper) { originalImageWrapper.style.width=''; originalImageWrapper.style.height=''; originalImageWrapper.style.transform=''; }
        if(vectorImageWrapper) { vectorImageWrapper.style.width=''; vectorImageWrapper.style.height=''; vectorImageWrapper.style.transform=''; }
        if(previewOriginalImage) { previewOriginalImage.removeAttribute('src'); }

        try {
            currentFileObjectURL = URL.createObjectURL(file);
            if (previewOriginalImage) {
                previewOriginalImage.src = currentFileObjectURL; // Set src *before* showing button
            } else {
                 throw new Error("Preview image element not found.");
            }
        } catch(e) {
            updateStatus('status_error_obj_url', 'error', 0, !!appView, { errorMessage: e.message });
            currentFile = null;
            if(imageInput) imageInput.value = '';
            resetUploadAreaVisuals();
            return;
        }

        // Update landing page UI only if on landing view
        if(landingView && !landingView.classList.contains('hidden')) {
            if (fileNameDisplay) fileNameDisplay.textContent = file.name;
            if (fileInfoArea) fileInfoArea.classList.remove('hidden');
            if (dropZone) dropZone.style.display = 'none';
            if (uploadProgress) uploadProgress.classList.add('hidden');
            if (startConversionBtn) {
                 startConversionBtn.classList.remove('hidden');
                 startConversionBtn.textContent = getTranslation('vectorize_image_btn'); // Ensure text is set
            }
            if (uploadArea) uploadArea.classList.add('file-selected');
        } else if (appView && !appView.classList.contains('hidden')) {
             // If already in app view, directly trigger update? Or require manual click?
             // For now, just load preview, user clicks "Update"
             handleOptionsFormChange(); // This will enable the update button
        }

        resetZoomPan();
    }

    function triggerConversionFromLanding() {
        if (!currentFile || !startConversionBtn || !appView) {
            console.warn("Conversion trigger conditions not met.");
            return;
        }

        startConversionBtn.classList.add('hidden');
        if (fileInfoArea) fileInfoArea.style.display = 'none';
        if (uploadProgress) {
             uploadProgress.classList.remove('hidden');
             if (progressBar) progressBar.style.width = '0%';
        }
        updateStatus('', '', 0, false); // Clear landing status

        simulateUploadProgress(() => {
             if (uploadProgress) uploadProgress.classList.add('hidden');
             showAppView();
             setTimeout(() => handleConvert(true), 50); // Start actual conversion
        });
    }

    async function handleConvert(isInitial = false) {
        if (!currentFile) {
             console.error("handleConvert called but currentFile is null.");
             updateStatus('status_no_file', 'error', 0, true);
             if (isInitial && landingView) resetAppToLanding(); // Go back if initial conversion fails without file
             return;
        }
        if (!convertBtn || !downloadBtn || !appView) return; // Check necessary elements

        const statusKey = isInitial ? 'status_vectorizing' : 'status_updating';
        updateStatus(statusKey, 'loading', 0, true);

        convertBtn.disabled = true;
        convertBtn.textContent = getTranslation('status_working');
        downloadBtn.disabled = true;

        if (svgOutputDiv) {
            const placeholderKey = isInitial ? 'preview_placeholder_processing' : 'preview_placeholder_loading';
            svgOutputDiv.innerHTML = `<p class="placeholder-text">${getTranslation(placeholderKey)}</p>`;
            svgOutputDiv.classList.add('placeholder-text');
        }

        const formData = new FormData();
        formData.append('imageFile', currentFile);

        if (optionsForm) {
            const data = new FormData(optionsForm);
            for (let [key, value] of data.entries()) {
                const el = optionsForm.elements[key];
                if (el && !el.disabled && value !== '' && value !== null && key !== 'palette_selector') {
                    formData.append(key, value);
                }
            }
        }

        console.log("Sending data for conversion:", Object.fromEntries(formData));

        try {
            const res = await fetch('/convert', { method: 'POST', body: formData });
            const result = await res.json();

            if (!res.ok) {
                 // Try to parse server error message, fallback otherwise
                let errorMsg = `Server error: ${res.status}`;
                try {
                    if (result && result.error) {
                         errorMsg = result.error;
                    }
                } catch (parseError) { /* Ignore if response not json */ }
                throw new Error(errorMsg);
            }

            if (result.svg) {
                currentSvgContent = result.svg;
                if (svgOutputDiv) {
                    svgOutputDiv.innerHTML = currentSvgContent;
                    svgOutputDiv.classList.remove('placeholder-text');
                }
                updateStatus('status_complete', 'success', 3000, true);
                if (downloadBtn) downloadBtn.disabled = false;
                if (convertBtn) {
                    convertBtn.textContent = getTranslation('update_vectorization_btn');
                    convertBtn.disabled = true; // Disable until options change again
                }

                const updatePreviewSize = () => {
                    if (originalImageNaturalDims.width === 0 && previewOriginalImage && previewOriginalImage.naturalWidth > 0) {
                         originalImageNaturalDims.width = previewOriginalImage.naturalWidth;
                         originalImageNaturalDims.height = previewOriginalImage.naturalHeight;
                    }
                    if (originalImageNaturalDims.width > 0) {
                        calculateAndApplyWrapperSize();
                    } else {
                        console.warn("Could not determine original image dimensions for sizing preview.");
                    }
                    if(isInitial) resetZoomPan(); // Reset zoom after sizing
                }

                // Delay slightly to allow image/SVG render before sizing
                setTimeout(updatePreviewSize, 100);

            } else {
                throw new Error(getTranslation('status_error_no_svg'));
            }
        } catch (error) {
            console.error('Conversion Failed:', error);
            updateStatus('status_error_conversion_failed', 'error', 0, true, { errorMessage: error.message });

            if (svgOutputDiv) {
                 // Show specific error message in preview area
                 svgOutputDiv.innerHTML = `<p class="placeholder-text error-text">${getTranslation('status_error_conversion_failed', currentLang, {errorMessage: error.message})}</p>`;
                 svgOutputDiv.classList.add('placeholder-text'); // Ensure placeholder styles apply
            }
            if (downloadBtn) downloadBtn.disabled = true;
            if (convertBtn) {
                convertBtn.disabled = !currentFile; // Re-enable only if a file still exists
                convertBtn.textContent = getTranslation('update_vectorization_btn');
            }
        }
    }

    function handleOptionsFormChange() {
        if (!optionsForm) return;
        if (paletteSelect && colorPrecisionInput) { colorPrecisionInput.value = paletteSelect.value; }
        // Only enable update button if a file is actually loaded
        if (currentFile && convertBtn) {
            convertBtn.disabled = false;
            convertBtn.textContent = getTranslation('update_vectorization_btn');
        }
        updateOptionsAvailability();
        resetPresetSelection();
    }

    function handleResetOptions() {
        if (!optionsForm) return;
        // Find the 'general' preset options (which should hold the defaults)
        const defaultPresetOptions = presets.find(p => p.key === 'general')?.options || defaultOptions; // Fallback to initially captured defaults
        applyOptions(defaultPresetOptions);
        updateStatus('status_options_reset', 'success', 2000, true);
        resetPresetSelection();
        if (convertBtn) {
            convertBtn.disabled = true; // Always disable after reset
            convertBtn.textContent = getTranslation('update_vectorization_btn');
        }
        updateOptionsAvailability();
    }

    function handlePresetChange(event) {
        if (!appView || !presetSelect) return;
        const selectedIndex = event.target.value;
        if (selectedIndex === "" || !presets[selectedIndex]) return;

        const selectedPreset = presets[selectedIndex];
        applyOptions(selectedPreset.options);

        const presetNameKey = `preset_name_${selectedPreset.key}`;
        const presetName = getTranslation(presetNameKey) || selectedPreset.name;
        updateStatus('status_preset_loaded', 'info', 3000, true, { presetName: presetName });

        presetSelect.value = selectedIndex; // Keep selected visually

        // Enable update button if a file is present
        if (currentFile && convertBtn) {
            convertBtn.disabled = false;
            convertBtn.textContent = getTranslation('update_vectorization_btn');
        }
        updateOptionsAvailability();
    }

    function handleSaveOptions() {
        if (!optionsForm || !downloadLink) return;
        const currentOptions = {};
        const formData = new FormData(optionsForm);
        Object.keys(defaultOptions).forEach(key => {
            if (formData.has(key)) {
                const el = optionsForm.elements[key];
                if (el && !el.disabled) {
                    currentOptions[key] = formData.get(key);
                }
            }
        });
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
        const file = event.target.files?.[0];
        if (!file || !appView) {
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

                const knownKeys = Object.keys(defaultOptions);
                const loadedKeys = Object.keys(loadedOptions);
                const hasKnownKey = loadedKeys.some(key => knownKeys.includes(key));
                if (!hasKnownKey) {
                    throw new Error(getTranslation('status_error_no_options'));
                }

                const filteredOptions = {};
                knownKeys.forEach(key => {
                    if (loadedOptions.hasOwnProperty(key)) {
                        filteredOptions[key] = loadedOptions[key];
                    }
                });

                applyOptions(filteredOptions);
                updateStatus('status_settings_loaded', 'success', 3000, true);
                resetPresetSelection();

                if (currentFile && convertBtn) {
                    convertBtn.disabled = false;
                    convertBtn.textContent = getTranslation('update_vectorization_btn');
                }
                updateOptionsAvailability();

            } catch (error) {
                console.error('Error loading options file:', error);
                updateStatus('status_error_loading_settings', 'error', 0, true, { errorMessage: error.message });
            } finally {
                if(optionsFileInput) optionsFileInput.value = '';
            }
        };
        reader.onerror = () => {
            updateStatus('status_error_reading_file', 'error', 0, true);
            if(optionsFileInput) optionsFileInput.value = '';
        };
        reader.readAsText(file);
    }

    function handleDownload() {
        if (!currentSvgContent || !downloadLink) return;
        try {
            const blob = new Blob([currentSvgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = `${currentFilenameBase}_vectorised.svg`;
            downloadLink.click();
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error('Error preparing download:', e);
            updateStatus('status_error_downloading', 'error', 0, true);
        }
    }

    function handleContactFormSubmit(event) {
        event.preventDefault();
        if (!contactForm || !contactFormStatus) return;

        const nameInput = contactForm.elements['name'];
        const emailInput = contactForm.elements['email'];
        const subjectInput = contactForm.elements['subject'];
        const messageInput = contactForm.elements['message'];
        const recipientEmail = "jonkarystudio@gmail.com";

        let isValid = true;
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
             if(input) input.style.borderColor = '';
             if (!input || !input.value.trim()) {
                if (input) input.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
        });

        if (emailInput && emailInput.value.trim() && !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
             emailInput.style.borderColor = 'var(--danger-color)';
             isValid = false;
             showContactFormStatus("contact_status_invalid_email", "error");
             return;
        }

        if (!isValid) {
             showContactFormStatus("contact_status_fill_fields", "error");
             return;
        }

        const mailtoSubject = encodeURIComponent(subjectInput.value.trim());
        const mailtoBody = encodeURIComponent(
            `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
        );
        const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

        try {
            showContactFormStatus("contact_status_opening_email", "info");
            window.location.href = mailtoLink;
            setTimeout(() => {
                if (contactForm) contactForm.reset();
                showContactFormStatus("contact_status_complete_send", "info");
            }, 3000);
        } catch (error) {
            console.error("Failed to open mailto link:", error);
            showContactFormStatus("contact_status_error_email", "error", { recipient: recipientEmail });
        }
    }

    function showContactFormStatus(messageKey, type, replacements = {}) {
        if (!contactFormStatus) return;
        const message = getTranslation(messageKey, currentLang, replacements);

        contactFormStatus.textContent = message;
        contactFormStatus.className = `form-status ${type || ''}`.trim();
        contactFormStatus.style.display = '';

        contactFormStatus.dataset.currentStatusKey = messageKey;
        contactFormStatus.dataset.currentStatusReplacements = JSON.stringify(replacements);
        contactFormStatus.dataset.currentStatusType = type;

        if (type !== 'error') {
             setTimeout(() => {
                 if (contactFormStatus.dataset.currentStatusKey === messageKey) {
                     contactFormStatus.style.display = 'none';
                     delete contactFormStatus.dataset.currentStatusKey;
                     delete contactFormStatus.dataset.currentStatusReplacements;
                     delete contactFormStatus.dataset.currentStatusType;
                 }
             }, 5000);
        }
    }

    // --- Other Helper Functions ---
    function validateFile(file) {
        if (!file) return getTranslation('status_no_file');
        if (file.size > 15 * 1024 * 1024) return getTranslation('status_error_file_size');
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/bmp'].includes(file.type)) {
            return getTranslation('status_error_file_type', currentLang, { fileType: file.type || '?' });
        }
        return null; // No error
    }

    function simulateUploadProgress(callback) {
        if (!uploadProgress || !progressBar ) {
            callback(); return;
        }
        let p = 0; progressBar.style.width = `0%`;
        const interval = setInterval(() => {
             p += Math.random() * 15 + 10;
             if (p >= 100) { p = 100; clearInterval(interval); progressBar.style.width = `100%`; setTimeout(callback, 250); }
             else { progressBar.style.width = `${p}%`; }
        }, 100);
    }
    function calculateAndApplyWrapperSize() {
        if (!appView || appView.classList.contains('hidden') || !previewAreaWrapper || !previewOriginalImage || !originalImageWrapper || !vectorImageWrapper) return;
        if (originalImageNaturalDims.width === 0 && previewOriginalImage.naturalWidth > 0) { originalImageNaturalDims.width = previewOriginalImage.naturalWidth; originalImageNaturalDims.height = previewOriginalImage.naturalHeight; }
        if (!originalImageNaturalDims.width) return;

        const containerWidth = previewAreaWrapper.clientWidth; const containerHeight = previewAreaWrapper.clientHeight;
        if (containerWidth <= 0 || containerHeight <= 0) return;

        const imgRatio = originalImageNaturalDims.width / originalImageNaturalDims.height;
        const containerRatio = containerWidth / containerHeight;

        let targetWidth, targetHeight;
        if (imgRatio > containerRatio) { targetWidth = containerWidth; targetHeight = targetWidth / imgRatio; }
        else { targetHeight = containerHeight; targetWidth = targetHeight * imgRatio; }

        targetWidth = Math.max(1, Math.floor(targetWidth)); targetHeight = Math.max(1, Math.floor(targetHeight));

        originalImageWrapper.style.width = `${targetWidth}px`; originalImageWrapper.style.height = `${targetHeight}px`;
        vectorImageWrapper.style.width = `${targetWidth}px`; vectorImageWrapper.style.height = `${targetHeight}px`;
    }
    function setupNumberInputSync() { if (!optionsForm) return; optionsForm.querySelectorAll('input[type="range"]').forEach(slider => { const numInputId = `${slider.id}Num`; const numInput = document.getElementById(numInputId); if (numInput) { const syncSliderToNum = () => { const step = parseFloat(slider.step); numInput.value = (step < 1) ? parseFloat(slider.value).toFixed(String(step).split('.')[1]?.length || 2) : String(Math.round(parseFloat(slider.value))); }; const syncNumToSlider = () => { let v=parseFloat(numInput.value), min=parseFloat(slider.min), max=parseFloat(slider.max); if(isNaN(v)) return; v=Math.max(min, Math.min(max, v)); if (Math.abs(parseFloat(slider.value)-v) > (parseFloat(slider.step)/2||0.001)) { slider.value = String(v); slider.dispatchEvent(new Event('input',{bubbles:true})); } }; safeAddListener(slider, 'input', syncSliderToNum); safeAddListener(numInput, 'input', syncNumToSlider); syncSliderToNum(); } }); }
    function updateOptionsAvailability() { if (!optionsForm || !modeSelect || !colormodeSelect || !paletteSelect) return; const m=modeSelect.value, c=colormodeSelect.value, sp=m==='spline', px=m==='pixel', cl=c==='color'; toggleOptionGroup(splineThresholdGroup, sp); toggleOptionGroup(spliceThresholdGroup, sp); toggleOptionGroup(segmentLengthGroup, sp); toggleOptionGroup(cornerThresholdGroup, !px); toggleOptionGroup(hierarchicalGroup, cl); toggleOptionGroup(gradientStepGroup, cl); toggleOptionGroup(paletteGroup, cl); }
    function toggleOptionGroup(groupElement, enable) { if (!groupElement) return; const controls = groupElement.querySelectorAll('input, select'); groupElement.classList.toggle('disabled', !enable); controls.forEach(c => { if(c) c.disabled = !enable; }); }
    function storeDefaultOptions() { if (!optionsForm) return; const data = new FormData(optionsForm); for (let [key, value] of data.entries()) { defaultOptions[key] = value; } if (defaultOptions.hasOwnProperty('palette_selector')) { defaultOptions['color_precision'] = defaultOptions['palette_selector']; } const defaultPreset = presets.find(p => p.key === "general"); if (defaultPreset) { defaultPreset.options = {...defaultOptions}; } console.log("Stored defaults:", defaultOptions); }
    function populatePresetSelect() { if (!presetSelect) return; const currentVal = presetSelect.value; presetSelect.innerHTML = `<option value="" disabled selected>${getTranslation('preset_select_placeholder')}</option>`; presets.forEach((preset, index) => { const option = document.createElement('option'); option.value = index.toString(); const translationKey = `preset_name_${preset.key}`; option.textContent = getTranslation(translationKey) || preset.name; presetSelect.appendChild(option); }); if (currentVal !== "" && currentVal < presets.length) { presetSelect.value = currentVal; } else { presetSelect.value = ""; } }
    function resetPresetSelection() { if(presetSelect && presetSelect.value !== "") presetSelect.value = ""; }
    function applyOptions(optionsToApply) { if (!optionsForm) return; console.log("Applying options:", optionsToApply); let needsUpdateAvailability = false; for (const key in optionsToApply) { if (!defaultOptions.hasOwnProperty(key)) continue; const value = optionsToApply[key]; const element = optionsForm.elements[key]; if (element) { if (element.type === 'radio' || element.type === 'checkbox') { /* Handle if needed */ } else { element.value = String(value); } if (element.type === 'range') { const numInputId = `${element.id}Num`; const numInput = document.getElementById(numInputId); if (numInput) { const step = parseFloat(element.step); numInput.value = (step < 1) ? parseFloat(value).toFixed(String(step).split('.')[1]?.length || 2) : String(Math.round(parseFloat(value))); } } if (['mode', 'color_mode', 'palette_selector'].includes(key)) { needsUpdateAvailability = true; } element.dispatchEvent(new Event('input', { bubbles: true })); element.dispatchEvent(new Event('change', { bubbles: true })); } } if (needsUpdateAvailability) { setTimeout(updateOptionsAvailability, 0); } }
    function setTransform() { if (!originalImageWrapper || !vectorImageWrapper) return; const transformValue =`translate(${pointX}px, ${pointY}px) scale(${scale})`; originalImageWrapper.style.transform = transformValue; vectorImageWrapper.style.transform = transformValue; updateZoomButtons(); }
    function setupZoomPan() { if (!previewAreaWrapper) return; const startPan = (e)=>{ if(e.button !== 0 && e.type !== 'touchstart') return; e.preventDefault(); panning = true; start = { x: (e.clientX ?? e.touches[0].clientX) - pointX, y: (e.clientY ?? e.touches[0].clientY) - pointY }; previewAreaWrapper.classList.add('grabbing'); window.addEventListener('mousemove', panMove); window.addEventListener('touchmove', panMove, {passive:false}); window.addEventListener('mouseup', endPan); window.addEventListener('touchend', endPan); }; const panMove = (e)=>{ if(!panning) return; e.preventDefault(); pointX = (e.clientX ?? e.touches[0].clientX) - start.x; pointY = (e.clientY ?? e.touches[0].clientY) - start.y; setTransform(); }; const endPan = ()=>{ if(!panning) return; panning = false; previewAreaWrapper.classList.remove('grabbing'); window.removeEventListener('mousemove', panMove); window.removeEventListener('touchmove', panMove); window.removeEventListener('mouseup', endPan); window.removeEventListener('touchend', endPan); }; safeAddListener(previewAreaWrapper, 'wheel', (e)=>{ e.preventDefault(); const rect = previewAreaWrapper.getBoundingClientRect(); const mouseX = e.clientX - rect.left; const mouseY = e.clientY - rect.top; const xs = (mouseX - pointX) / scale; const ys = (mouseY - pointY) / scale; const delta = -e.deltaY; const zoomFactor = 1.15; let newScale = (delta > 0) ? scale * zoomFactor : scale / zoomFactor; newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)); if(newScale === scale) return; pointX = mouseX - xs * newScale; pointY = mouseY - ys * newScale; scale = newScale; setTransform(); }, { passive: false }); safeAddListener(previewAreaWrapper, 'mousedown', startPan); safeAddListener(previewAreaWrapper, 'touchstart', startPan, { passive: false }); }
    function zoom(factor) { if (!previewAreaWrapper) return; const rect = previewAreaWrapper.getBoundingClientRect(); const centerX = rect.width / 2; const centerY = rect.height / 2; const xs = (centerX - pointX) / scale; const ys = (centerY - pointY) / scale; let newScale = scale * factor; newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)); if(newScale === scale) return; pointX = centerX - xs * newScale; pointY = centerY - ys * newScale; scale = newScale; setTransform(); }
    function resetZoomPan() { scale = 1; pointX = 0; pointY = 0; if (previewAreaWrapper) setTransform(); calculateAndApplyWrapperSize(); }
    function updateZoomButtons() { if(zoomInBtn) zoomInBtn.disabled = (scale >= MAX_SCALE); if(zoomOutBtn) zoomOutBtn.disabled = (scale <= MIN_SCALE); }
    function handleSvgPathHover(event) { const target = event.target; if(target && target.tagName === 'path' && target.closest('svg')) { target.classList.toggle('path-hover', event.type === 'mouseover'); } }
    function resetResultArea(clearStatusToo = true) { if(svgOutputDiv) { svgOutputDiv.innerHTML = `<p class="placeholder-text">${getTranslation('preview_placeholder_select')}</p>`; svgOutputDiv.classList.add('placeholder-text'); } currentSvgContent = ''; if(downloadBtn) downloadBtn.disabled = true; if(clearStatusToo && appView) updateStatus('', '', 0, true); }

    // --- Initialization ---
    currentLang = getInitialLanguage();
    setLanguage(currentLang); // Apply initial translation FIRST

    // Then set up based on page context
    if (landingView || appView) { // On main app page (index.html)
        if (optionsForm) {
            storeDefaultOptions();
            setupNumberInputSync();
            safeAddListener(optionsForm, 'change', handleOptionsFormChange);
        }
        if (previewAreaWrapper) setupZoomPan();
        if (zoomInBtn) updateZoomButtons(); // Initial button state

        safeAddListener(imageInput, 'change', handleFileSelectChange);
        safeAddListener(cancelUploadBtn, 'click', resetAppToLanding);
        safeAddListener(startConversionBtn, 'click', triggerConversionFromLanding);
        safeAddListener(convertBtn, 'click', () => handleConvert(false));
        safeAddListener(downloadBtn, 'click', handleDownload);
        safeAddListener(uploadNewBtn, 'click', resetAppToLanding);
        safeAddListener(resetOptionsBtn, 'click', handleResetOptions);
        safeAddListener(presetSelect, 'change', handlePresetChange);
        safeAddListener(saveOptionsBtn, 'click', handleSaveOptions);
        safeAddListener(loadOptionsBtn, 'click', () => optionsFileInput?.click());
        safeAddListener(optionsFileInput, 'change', handleLoadOptionsFile);
        safeAddListener(zoomInBtn, 'click', () => zoom(1.3));
        safeAddListener(zoomOutBtn, 'click', () => zoom(1 / 1.3));
        safeAddListener(zoomResetBtn, 'click', resetZoomPan);
        safeAddListener(svgOutputDiv, 'mouseover', handleSvgPathHover);
        safeAddListener(svgOutputDiv, 'mouseout', handleSvgPathHover);
        safeAddListener(previewOriginalImage, 'load', calculateAndApplyWrapperSize);
        safeAddListener(previewOriginalImage, 'error', () => console.error("Failed to load original preview image."));

        if (dropZone) {
            safeAddListener(dropZone, 'dragenter', handleDragEnter);
            safeAddListener(dropZone, 'dragover', handleDragOver);
            safeAddListener(dropZone, 'dragleave', handleDragLeave);
            safeAddListener(dropZone, 'drop', handleDrop);
            safeAddListener(dropZone, 'click', (e) => { if (imageInput && e.target !== imageInput && !e.target.closest('button, label')) imageInput.click(); });
        }

        // Default to landing view
        showLandingView();
        console.log("vectorise.me script initialized (App Mode).");

    } else { // On other static pages
        console.log("vectorise.me script initialized (Static Page Mode).");
    }

    // Contact form listeners (added only if form exists)
    if (contactForm) {
        safeAddListener(contactForm, 'submit', handleContactFormSubmit);
        console.log("Contact form listeners added.");
    }

    // Language dropdown listeners (global)
    if (languageToggleBtn && languageDropdown) {
        safeAddListener(languageToggleBtn, 'click', (e) => {
            e.stopPropagation();
            const isExpanded = languageToggleBtn.getAttribute('aria-expanded') === 'true';
            languageToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            languageDropdown.classList.toggle('hidden');
        });
        safeAddListener(window, 'click', (e) => {
            if (languageDropdown && !languageDropdown.classList.contains('hidden') &&
                languageToggleBtn && !languageToggleBtn.contains(e.target) &&
                !languageDropdown.contains(e.target)) {
                languageToggleBtn.setAttribute('aria-expanded', 'false');
                languageDropdown.classList.add('hidden');
            }
        });
        languageDropdown.querySelectorAll('a[lang]').forEach(link => {
            safeAddListener(link, 'click', (e) => {
                 e.preventDefault();
                 setLanguage(link.getAttribute('lang'));
            });
        });
        console.log("Language dropdown listeners added.");
    }

    // Global listeners
    let resizeTimeout;
    safeAddListener(window, 'resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Only recalculate if app view is active
            if (appView && !appView.classList.contains('hidden')) {
                 calculateAndApplyWrapperSize();
            }
        }, 150);
    });

}); // End DOMContentLoaded