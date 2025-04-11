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
        landing_subheadline_detailed: "Instantly convert images into crisp, infinitely scalable SVG vectors. Features advanced tracing options with helpful presets for precise results.",
        upload_drag_drop: "Drag & Drop Image",
        upload_or: "or",
        upload_browse: "Browse Files",
        upload_formats: "Max 15MB (JPG, PNG, & BMP)", // Matched HTML exactly
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
        preset_photo: "Technical Drawings / Blueprints", // Corrected based on HTML h4 content
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
        unit_dec: "decimals",
        spline_thr_label: "Spline Threshold:",
        splice_thr_label: "Splice Threshold:",
        segment_len_label: "Segment Length:",
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
        preview_placeholder_processing: "Processing...", // Used by JS
        preview_placeholder_loading: "Loading preview...", // Used by JS
        preview_placeholder_select: "SVG result will appear here", // Used in HTML & JS
        preview_placeholder_update_failed: "Update Failed", // Used by JS
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
        contact_status_fill_fields: "Please fill out all required fields.", // Used by JS
        contact_status_invalid_email: "Please enter a valid email address.", // Used by JS
        contact_status_opening_email: "Opening your email client...", // Used by JS
        contact_status_complete_send: "Please complete sending the email via your email application.", // Used by JS
        contact_status_error_email: "Could not open email client. Please copy details manually to {recipient}.", // Used by JS
        // FAQ / Common Problems
        faq_h2: "Common Problems & Solutions",
        faq_p: "Here are some common issues you might encounter and how to resolve them.",
        faq_q_quality: "Image Quality Issues:",
        faq_q_quality_desc: "The converted SVG doesn't match the original image quality.",
        faq_solution_label: "Solution:",
        faq_a_quality: "Adjust the settings in the vectorization process. Increasing 'Color Detail' (palette size), adjusting 'Spline Threshold' (lower for more detail), or reducing 'Filter Speckle' can help. For pixel art, ensure the 'Pixel' mode is selected. Experiment with different presets.",
        faq_q_upload_failed: "Image Failed to Convert:", // Corrected key
        faq_q_upload_failed_desc: "The uploaded image failed to convert.", // Corrected key
        faq_a_upload_failed: "Check for image compatibility. Vectorise.Me only handles JPG, PNG and BMP. If you have images of different formats, convert them first before uploading them.", // Corrected key
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
        legal_date_placeholder: "04/10/2025",
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
        privacy_image_policy_actual: "Uploaded images and generated SVGs are not stored on our servers after processing and download link generation.",
        privacy_h4_usage: "Usage Data",
        privacy_usage_p1: 'We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include your computer\'s IP address, browser type, browser version, the pages visited, time and date of visit, time spent on pages, unique device identifiers, and other diagnostic data.',
        privacy_usage_analytics_info: "We do use Google Analytics to help us analyze and improve the performance and user experience of our Service.",
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
        privacy_disclosure_actual: "We may disclose your Usage Data under limited circumstances, such as to comply with legal obligations, protect our rights or those of others, prevent wrongdoing, or in the event of a business transfer (e.g., merger or acquisition).",
        privacy_disclosure_p1: "We do not sell your Personal Data.",
        privacy_h2_security: "Security of Data",
        privacy_security_p1: "The security of your data is important. While we strive to use commercially acceptable means (like HTTPS) to protect data, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.",
        privacy_h2_providers: "Service Providers",
        privacy_providers_actual: "We may employ third-party service providers to facilitate the operation of our Service. These providers include Render.com for hosting services and Google Analytics for analytics, as mentioned earlier. These third parties have access to your Usage Data only to perform these specific tasks on our behalf and are obligated to protect your information in accordance with applicable standards.",
        privacy_h2_links: "Links to Other Sites",
        privacy_links_p1: "Our Service may contain links to other sites. We have no control over and assume no responsibility for the content or practices of any third-party sites.",
        privacy_h2_children: "Children's Privacy",
        privacy_children_p1: "Our Service does not knowingly collect personally identifiable information from children under the age of",
        privacy_children_age_actual: "13.",
        privacy_children_p2_added: "If we become aware that we have inadvertently collected such information, we will take steps to delete it as soon as possible. We encourage parents and guardians to contact us if they believe their child may have provided us with personal information.",
        privacy_h2_changes: "Changes to This Privacy Policy",
        privacy_changes_p1: 'We may update this policy. We will notify you by posting the new policy on this page and updating the "Last Updated" date.',
        privacy_h2_contact: "Contact Us",
        privacy_contact_p1: "If you have questions, contact us:",
        privacy_contact_li_email: "By email: jonkarystudio@gmail.com",
        privacy_contact_li_web_label: "Via our website:", // Renamed key for the label part
        privacy_contact_page_link: "Contact Page", // Key for the link text itself
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
        cookies_why_li_essential_desc: "These are necessary to provide you with services available through our Service and to enable you to use some of its features, such as managing your session during the conversion process (if applicable) or securing the site. Render.com, our hosting provider, may use essential session cookies to ensure proper functionality.",
        cookies_why_li_analytics: "Analytics and Customization Cookies:",
        cookies_why_li_analytics_desc: "These cookies collect information that is used either in aggregate form to help us understand how our Service is being used or how effective our marketing campaigns are, or to help us customize our Service for you. We use Google Analytics, which may set cookies such as `_ga` and `_gid` to track usage patterns and improve your experience.",
        cookies_why_li_advertising: "Advertising Cookies:",
        cookies_why_li_advertising_desc: "These cookies are used to make advertising messages more relevant to you. They may be set by third-party advertising partners to track your browsing habits and deliver personalized ads based on your interests.",
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
        cookies_contact_li_web_label: "Via our website:", // Renamed key for the label part
        cookies_contact_page_link: "Contact Page", // Key for the link text itself
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
        terms_governing_p1: "These terms and conditions are governed by and construed in accordance with the laws of",
        terms_governing_jurisdiction_actual: "the State of Conneticut, USA",
        terms_governing_p2: "and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
        terms_h2_contact: "Contact Us",
        terms_contact_p1: "If you have any questions about these Terms, please contact us:",
        terms_contact_li_email: "By email: jonkarystudio@gmail.com",
        terms_contact_li_web_label: "Via our website:", // Renamed key for the label part
        terms_contact_page_link: "Contact Page", // Key for the link text itself
        // Dynamic Status Messages (Used by JS)
        status_uploading: "Uploading...",
        status_vectorizing: "Vectorizing...",
        status_updating: "Updating...",
        status_processing: "Processing...",
        status_working: "Working...",
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
        // Presets (Used by JS for status messages)
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
        // Meta Tags
        meta_title_main_short: "Kostenloser Bild zu SVG Konverter",
        meta_description_main: "Kostenloses Online-Tool zur Konvertierung von Rasterbildern (JPG, PNG, WEBP) in skalierbare Vektorgrafiken (SVG) mit Echtzeit-Anpassung und Voreinstellungen.",
        meta_title_contact: "Kontakt - Vectorise.Me",
        meta_description_contact: "Kontaktieren Sie Vectorise.Me oder finden Sie Lösungen für häufige Vektorisierungsprobleme.",
        meta_title_privacy: "Datenschutz - Vectorise.Me",
        meta_description_privacy: "Datenschutzerklärung für das Vectorise.Me Online-SVG-Konvertierungstool.",
        meta_title_cookies: "Cookies - Vectorise.Me",
        meta_description_cookies: "Cookie-Richtlinie für das Vectorise.Me Online-SVG-Konvertierungstool.",
        meta_title_terms: "Nutzungsbedingungen - Vectorise.Me",
        meta_description_terms: "Nutzungsbedingungen für das Vectorise.Me Online-SVG-Konvertierungstool.",
        // Header
        upload_new: "Neu hochladen",
        // Landing Page - Hero & Upload
        landing_h1_free: "Nur KOSTENLOS",
        landing_h1_and: "und",
        landing_h1_customizable: "ANPASSBARER Vektorisierer",
        landing_subheadline_detailed: "Konvertieren Sie Bilder sofort in gestochen scharfe, unendlich skalierbare SVG-Vektoren. Bietet erweiterte Vektorisierungsoptionen und hilfreiche Voreinstellungen für präzise Ergebnisse.",
        upload_drag_drop: "Bild hierher ziehen",
        upload_or: "oder",
        upload_browse: "Dateien durchsuchen",
        upload_formats: "Max 15MB (JPG, PNG, & BMP)", // Matched HTML
        cancel_selection_title: "Auswahl abbrechen",
        vectorize_image_btn: "Bild vektorisieren",
        // Landing Page - Features
        features_h2: "Funktionen",
        features_p: "Alles, was Sie für perfekte SVGs benötigen. Unser leistungsstarkes Konvertierungstool gibt Ihnen die vollständige Kontrolle über Ihre Vektorgrafiken.",
        feature_instant_h3: "Sofortige Konvertierung",
        feature_instant_p: "Laden Sie Ihr Bild hoch und erhalten Sie sofort eine SVG-Vorschau. Keine Wartezeiten, keine Verarbeitungsverzögerungen.",
        feature_realtime_h3: "Echtzeit-Anpassung",
        feature_realtime_p: "Passen Sie Einstellungen an und sehen Sie Änderungen in Echtzeit. Optimieren Sie Ihr SVG zur Perfektion.",
        feature_quality_h3: "Hochwertige Ergebnisse",
        feature_quality_p: "Erhalten Sie saubere, optimierte SVGs, die für jeden Anwendungsfall perfekt skalierbar sind.",
        // Landing Page - Presets
        presets_h2: "Voreinstellungsbeispiele",
        presets_p: "Sehen Sie, wie verschiedene Voreinstellungen unterschiedliche Bildtypen verarbeiten.",
        preset_photo: "Technische Zeichnungen / Blaupausen",
        preset_clipart: "Clipart / Logo",
        preset_pixel: "Pixel-Art",
        preset_original: "Original",
        preset_vectorized: "Vektorisiert",
        // Landing Page - CTA
        cta_p_revised: "Starten Sie sofort – keine Anmeldung erforderlich. Einfach hochladen und vektorisieren!",
        // App View - Options Panel
        options_h2: "Optionen",
        load_settings_title: "Einstellungen laden",
        save_settings_title: "Einstellungen speichern",
        reset_options_title: "Optionen zurücksetzen",
        load_btn: "Laden",
        save_btn: "Speichern",
        reset_btn: "Zurücksetzen",
        preset_label: "Voreinstellung für Bildtyp:",
        preset_select_placeholder: "Voreinstellung laden...",
        options_legend_color: "Farbeinstellungen",
        color_detail_title: "Farbdetails",
        color_detail_label: "Farbdetails:",
        color_detail_full: "Voll (8 Bit)",
        color_detail_standard: "Standard (6 Bit)",
        color_detail_reduced: "Reduziert (5 Bit)",
        color_detail_limited: "Begrenzt (4 Bit)",
        color_detail_posterized: "Posterisiert (3 Bit)",
        color_mode_title: "Farbmodus",
        color_mode_label: "Farbmodus:",
        color_mode_color: "Farbe",
        color_mode_binary: "Binär",
        options_legend_trace: "Vektorisierungsparameter",
        filter_speckle_label: "Störpixel filtern:",
        mode_label: "Modus:",
        mode_spline: "Spline",
        mode_polygon: "Polygon",
        mode_pixel: "Pixel",
        options_legend_geo: "Geometrie & Pfadanpassung",
        corner_thr_label: "Eckenschwellenwert:",
        path_prec_label: "Pfadgenauigkeit:",
        unit_dec: "Nachkommastellen",
        spline_thr_label: "Spline-Schwellenwert:",
        splice_thr_label: "Spleiß-Schwellenwert:",
        segment_len_label: "Segmentlänge:",
        options_legend_color_proc: "Farbverarbeitungsoptionen",
        layering_label: "Ebenenaufbau:",
        layering_stacked: "Gestapelt",
        layering_cutout: "Ausgeschnitten",
        gradient_step_label: "Verlaufsschritt:",
        update_vectorization_btn: "Vektorisierung aktualisieren",
        // App View - Result Panel
        preview_h2: "Vorschau",
        zoom_out_title: "Herauszoomen",
        zoom_reset_title: "Zoom zurücksetzen",
        zoom_in_title: "Hineinzoomen",
        preview_original_label: "Original",
        preview_vectorized_label: "Vektorisiert",
        preview_placeholder_processing: "Verarbeitung läuft...",
        preview_placeholder_loading: "Vorschau wird geladen...",
        preview_placeholder_select: "SVG-Ergebnis erscheint hier",
        preview_placeholder_update_failed: "Aktualisierung fehlgeschlagen",
        download_svg_btn: "SVG herunterladen",
        // Footer
        footer_home_link: "Startseite",
        footer_contact_link: "Kontakt",
        footer_privacy_link: "Datenschutz",
        footer_cookies_link: "Cookies",
        footer_terms_link: "Nutzungsbedingungen",
        footer_copyright: "© 2025 JonkaryStudio. Alle Rechte vorbehalten.",
        // Contact Page
        contact_h1: "Kontaktieren Sie uns",
        contact_name_label: "Name",
        contact_name_placeholder: "Ihr Name",
        contact_email_label: "E-Mail",
        contact_email_placeholder: "Ihre E-Mail",
        contact_subject_label: "Betreff",
        contact_subject_placeholder: "Betreff der Nachricht",
        contact_message_label: "Nachricht",
        contact_message_placeholder: "Ihre Nachricht",
        contact_send_btn: "Nachricht senden",
        contact_status_fill_fields: "Bitte füllen Sie alle Pflichtfelder aus.",
        contact_status_invalid_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        contact_status_opening_email: "Ihr E-Mail-Programm wird geöffnet...",
        contact_status_complete_send: "Bitte schließen Sie das Senden der E-Mail in Ihrem E-Mail-Programm ab.",
        contact_status_error_email: "E-Mail-Programm konnte nicht geöffnet werden. Bitte kopieren Sie die Details manuell an {recipient}.",
        // FAQ / Common Problems
        faq_h2: "Häufige Probleme & Lösungen",
        faq_p: "Hier sind einige häufige Probleme und deren Lösungen.",
        faq_q_quality: "Probleme mit der Bildqualität:",
        faq_q_quality_desc: "Das konvertierte SVG entspricht nicht der Qualität des Originalbildes.",
        faq_solution_label: "Lösung:",
        faq_a_quality: "Passen Sie die Einstellungen im Vektorisierungsprozess an. Eine Erhöhung der 'Farbdetails' (Palettengröße), eine Anpassung des 'Spline-Schwellenwerts' (niedriger für mehr Details) oder eine Reduzierung von 'Störpixel filtern' kann helfen. Stellen Sie bei Pixel-Art sicher, dass der 'Pixel'-Modus ausgewählt ist. Experimentieren Sie mit verschiedenen Voreinstellungen.",
        faq_q_upload_failed: "Bild konnte nicht konvertiert werden:", // Corrected key
        faq_q_upload_failed_desc: "Das hochgeladene Bild konnte nicht konvertiert werden.", // Corrected key
        faq_a_upload_failed: "Prüfen Sie die Bildkompatibilität. Vectorise.Me verarbeitet nur JPG, PNG und BMP. Wenn Sie Bilder in anderen Formaten haben, konvertieren Sie diese zuerst.", // Corrected key
        faq_q_performance: "Leistungsprobleme:",
        faq_q_performance_desc: "Der Konvertierungsprozess ist langsam oder reagiert nicht, oder das resultierende SVG ist sehr groß.",
        faq_a_performance: "Versuchen Sie, die Bildgröße oder -komplexität vor dem Hochladen zu reduzieren. Große oder sehr detaillierte Bilder benötigen länger zur Verarbeitung und erzeugen größere SVGs. Eine Verringerung der 'Farbdetails' oder Erhöhung von 'Störpixel filtern' kann ebenfalls die Ausgabe vereinfachen und die Leistung verbessern.",
        faq_q_detail_loss: "Verlust feiner Details:",
        faq_q_detail_loss_desc: "Kleine Elemente oder dünne Linien verschwinden im SVG.",
        faq_a_detail_loss: "Reduzieren Sie den Wert für 'Störpixel filtern' erheblich (z.B. auf 0 oder 1). Stellen Sie sicher, dass die 'Pfadgenauigkeit' ausreichend ist (höhere Werte erhöhen jedoch die Dateigröße). Im Spline-Modus kann ein leichtes Absenken des 'Spline-Schwellenwerts' helfen, mehr Kurven zu erfassen.",
        faq_q_jagged: "Gezackte Kanten (Polygon-Modus):",
        faq_q_jagged_desc: "Linien erscheinen blockig statt glatt.",
        faq_a_jagged: "Wechseln Sie den 'Modus' zu 'Spline' für glattere Kurven. Der Polygon-Modus erzeugt naturgemäß gerade Liniensegmente.",
        faq_q_colors: "Unerwartete Farben:",
        faq_q_colors_desc: "Die Farben im SVG sehen anders aus oder sind posterisiert.",
        faq_a_colors: "Stellen Sie sicher, dass der 'Farbmodus' auf 'Farbe' eingestellt ist. Erhöhen Sie die Einstellung 'Farbdetails' (höhere Bit-Präzision). Prüfen Sie, ob der 'Verlaufsschritt' angemessen ist; ein sehr hoher Wert könnte subtile Farbübergänge reduzieren.",
        faq_q_transparency: "Transparenz nicht erhalten:",
        faq_q_transparency_desc: "Hintergrundtransparenz von PNGs geht verloren.",
        faq_a_transparency: "Vectorise.Me behandelt Transparenz im Allgemeinen gut, besonders mit 'Gestapeltem' Ebenenaufbau. Stellen Sie sicher, dass Ihr ursprüngliches PNG tatsächliche Transparenz aufweist. Bei Verwendung von 'Ausgeschnittenem' Ebenenaufbau kann sich Transparenz anders verhalten. Der zugrunde liegende Prozess kann je nach Einstellungen manchmal fast transparente Farben in deckende umwandeln.",
        faq_q_browser: "Unterschiedliche Browser-Darstellung:",
        faq_q_browser_desc: "Das SVG sieht in verschiedenen Webbrowsern leicht unterschiedlich aus.",
        faq_a_browser: "Dies liegt an den SVG-Rendering-Engines. Stellen Sie sicher, dass Ihr SVG wohlgeformt ist. Vermeiden Sie übermäßig komplexes CSS oder Filter innerhalb des SVGs, wenn Kompatibilität entscheidend ist. Testen Sie in gängigen Browsern.",
        // Legal Pages Shared
        legal_last_updated: "Zuletzt aktualisiert:",
        legal_date_placeholder: "04.10.2025",
        // Privacy Page Specific
        privacy_h1: "Datenschutzerklärung",
        privacy_intro_1: 'Willkommen bei Vectorise.Me (der "Dienst"), betrieben von JonkaryStudio ("uns", "wir" oder "unser"). Diese Seite informiert Sie über unsere Richtlinien bezüglich der Erhebung, Nutzung und Offenlegung personenbezogener Daten, wenn Sie unseren Dienst nutzen, und die Wahlmöglichkeiten, die Sie diesbezüglich haben.',
        privacy_h2_collection: "Informationserhebung und -nutzung",
        privacy_collection_p1: "Wir erheben verschiedene Arten von Informationen für unterschiedliche Zwecke, um Ihnen unseren Dienst bereitzustellen und zu verbessern.",
        privacy_h3_types: "Arten der erhobenen Daten",
        privacy_h4_personal: "Personenbezogene Daten",
        privacy_personal_p1: 'Während der Nutzung unseres Dienstes, insbesondere bei der Kontaktaufnahme mit uns, bitten wir Sie möglicherweise um die Angabe bestimmter persönlich identifizierbarer Informationen ("Personenbezogene Daten"). Dies kann unter anderem umfassen:',
        privacy_personal_li_email: "E-Mail-Adresse",
        privacy_personal_li_name: "Name",
        privacy_personal_p2: "Wir können auch Nutzungsdaten wie unten beschrieben erheben.",
        privacy_h4_image: "Bilddaten",
        privacy_image_p1: "Wenn Sie ein Bild zur Konvertierung hochladen, werden die Bilddaten zur Verarbeitung an unseren Server gesendet. Wir verarbeiten das Bild ausschließlich zum Zweck der Konvertierung in das SVG-Format, wie von Ihnen angefordert.",
        privacy_image_policy_actual: "Hochgeladene Bilder und generierte SVGs werden nach der Verarbeitung und der Generierung des Download-Links nicht auf unseren Servern gespeichert.",
        privacy_h4_usage: "Nutzungsdaten",
        privacy_usage_p1: 'Wir können Informationen darüber erheben, wie auf den Dienst zugegriffen und dieser genutzt wird ("Nutzungsdaten"). Diese Nutzungsdaten können die IP-Adresse Ihres Computers, Browsertyp, Browserversion, die besuchten Seiten, Uhrzeit und Datum des Besuchs, die auf den Seiten verbrachte Zeit, eindeutige Gerätekennungen und andere Diagnosedaten umfassen.',
        privacy_usage_analytics_info: "Wir verwenden Google Analytics, um die Leistung und Benutzererfahrung unseres Dienstes zu analysieren und zu verbessern.",
        privacy_h2_use: "Nutzung von Daten",
        privacy_use_p1: "JonkaryStudio verwendet die erhobenen Daten für Zwecke wie:",
        privacy_use_li_provide: "Bereitstellung und Wartung des Dienstes.",
        privacy_use_li_process: "Verarbeitung von Bildkonvertierungsanfragen.",
        privacy_use_li_respond: "Beantwortung Ihrer Kontaktanfragen.",
        privacy_use_li_improve: "Verbesserung des Dienstes basierend auf der Nutzungsanalyse.",
        privacy_use_li_monitor: "Überwachung der Dienstnutzung für Stabilität und Sicherheit.",
        privacy_use_li_detect: "Erkennung, Verhinderung und Behebung technischer Probleme.",
        privacy_h2_transfer: "Datenübermittlung",
        privacy_transfer_p1: "Ihre Informationen, einschließlich Bilddaten während der Verarbeitung, können auf Servern verarbeitet werden, die sich außerhalb Ihrer Gerichtsbarkeit befinden, wo Datenschutzgesetze abweichen können. Ihre Zustimmung zu dieser Datenschutzerklärung, gefolgt von Ihrer Nutzung des Dienstes, stellt Ihre Zustimmung zu dieser Übermittlung dar.",
        privacy_transfer_p2: "Wir unternehmen angemessene Schritte, um sicherzustellen, dass Daten sicher behandelt werden.",
        privacy_h2_disclosure: "Offenlegung von Daten",
        privacy_disclosure_actual: "Wir können Ihre Nutzungsdaten unter begrenzten Umständen offenlegen, z. B. um gesetzlichen Verpflichtungen nachzukommen, unsere Rechte oder die Rechte anderer zu schützen, Fehlverhalten zu verhindern oder im Falle einer Geschäftsübertragung (z. B. Fusion oder Übernahme).",
        privacy_disclosure_p1: "Wir verkaufen Ihre personenbezogenen Daten nicht.",
        privacy_h2_security: "Datensicherheit",
        privacy_security_p1: "Die Sicherheit Ihrer Daten ist uns wichtig. Obwohl wir uns bemühen, kommerziell akzeptable Mittel (wie HTTPS) zum Schutz von Daten zu verwenden, ist keine Übertragungs- oder Speichermethode zu 100 % sicher. Wir können keine absolute Sicherheit garantieren.",
        privacy_h2_providers: "Dienstleister",
        privacy_providers_actual: "Wir können Drittanbieter beauftragen, den Betrieb unseres Dienstes zu unterstützen. Zu diesen Anbietern gehören Render.com für Hosting-Dienste und Google Analytics für Analysen, wie bereits erwähnt. Diese Dritten haben nur Zugriff auf Ihre Nutzungsdaten, um diese spezifischen Aufgaben in unserem Namen auszuführen, und sind verpflichtet, Ihre Informationen gemäß den geltenden Standards zu schützen.",
        privacy_h2_links: "Links zu anderen Websites",
        privacy_links_p1: "Unser Dienst kann Links zu anderen Websites enthalten. Wir haben keine Kontrolle über und übernehmen keine Verantwortung für den Inhalt oder die Praktiken von Websites Dritter.",
        privacy_h2_children: "Privatsphäre von Kindern",
        privacy_children_p1: "Unser Dienst sammelt nicht wissentlich personenbezogene Daten von Kindern unter",
        privacy_children_age_actual: "13",
        privacy_children_p2_added: "Jahren. Wenn uns bekannt wird, dass wir versehentlich solche Informationen gesammelt haben, werden wir Schritte unternehmen, um diese so schnell wie möglich zu löschen. Wir ermutigen Eltern und Erziehungsberechtigte, uns zu kontaktieren, wenn sie glauben, dass ihr Kind uns personenbezogene Daten zur Verfügung gestellt hat.",
        privacy_h2_changes: "Änderungen dieser Datenschutzerklärung",
        privacy_changes_p1: 'Wir können diese Richtlinie aktualisieren. Wir werden Sie benachrichtigen, indem wir die neue Richtlinie auf dieser Seite veröffentlichen und das Datum "Zuletzt aktualisiert" aktualisieren.',
        privacy_h2_contact: "Kontaktieren Sie uns",
        privacy_contact_p1: "Wenn Sie Fragen haben, kontaktieren Sie uns:",
        privacy_contact_li_email: "Per E-Mail: jonkarystudio@gmail.com",
        privacy_contact_li_web_label: "Über unsere Website:", // Corrected key for label
        privacy_contact_page_link: "Kontaktseite", // Corrected key for link
        // Cookies Page Specific
        cookies_h1: "Cookie-Richtlinie",
        cookies_intro_1: 'Diese Cookie-Richtlinie erklärt, wie JonkaryStudio ("uns", "wir" oder "unser") Cookies und ähnliche Tracking-Technologien auf der Vectorise.Me-Website (dem "Dienst") verwendet. Sie erklärt, was diese Technologien sind und warum wir sie verwenden, sowie Ihre Rechte, unsere Verwendung davon zu kontrollieren.',
        cookies_h2_what: "Was sind Cookies?",
        cookies_what_p1: "Cookies sind kleine Datendateien, die auf Ihrem Gerät abgelegt werden, wenn Sie eine Website besuchen. Cookies werden von Website-Betreibern häufig verwendet, um ihre Websites funktionsfähig zu machen oder effizienter zu gestalten sowie um Berichtsinformationen bereitzustellen.",
        cookies_what_p2: 'Cookies, die vom Website-Betreiber (in diesem Fall JonkaryStudio) gesetzt werden, werden als "Erstanbieter-Cookies" bezeichnet. Cookies, die von anderen Parteien als dem Website-Betreiber gesetzt werden, werden als "Drittanbieter-Cookies" bezeichnet. Drittanbieter-Cookies ermöglichen die Bereitstellung von Funktionen oder Funktionalitäten Dritter auf oder über die Website (z. B. Werbung, interaktive Inhalte und Analysen). Die Parteien, die diese Drittanbieter-Cookies setzen, können Ihren Computer sowohl beim Besuch der betreffenden Website als auch beim Besuch bestimmter anderer Websites erkennen.',
        cookies_h2_why: "Warum verwenden wir Cookies?",
        cookies_why_p1: 'Wir verwenden Erst- und möglicherweise Drittanbieter-Cookies aus mehreren Gründen. Einige Cookies sind aus technischen Gründen für den Betrieb unseres Dienstes erforderlich, diese bezeichnen wir als "wesentliche" oder "unbedingt notwendige" Cookies.',
        cookies_why_p2: "[Genaue Angaben zu Ihrer Nutzung. Abschnitte nach Bedarf ändern/entfernen]:",
        cookies_why_li_essential: "Wesentliche Cookies:",
        cookies_why_li_essential_desc: "Diese sind notwendig, um Ihnen über unseren Dienst verfügbare Dienste bereitzustellen und Ihnen die Nutzung einiger seiner Funktionen zu ermöglichen, wie z. B. die Verwaltung Ihrer Sitzung während des Konvertierungsprozesses (falls zutreffend) oder die Sicherung der Website. Render.com, unser Hosting-Anbieter, kann wesentliche Sitzungs-Cookies verwenden, um die ordnungsgemäße Funktionalität sicherzustellen.",
        cookies_why_li_analytics: "Analyse- und Anpassungs-Cookies:",
        cookies_why_li_analytics_desc: "Diese Cookies sammeln Informationen, die entweder in aggregierter Form verwendet werden, um uns zu helfen zu verstehen, wie unser Dienst genutzt wird oder wie effektiv unsere Marketingkampagnen sind, oder um uns zu helfen, unseren Dienst für Sie anzupassen. Wir verwenden Google Analytics, das Cookies wie `_ga` und `_gid` setzen kann, um Nutzungsmuster zu verfolgen und Ihre Erfahrung zu verbessern.",
        cookies_why_li_advertising: "Werbe-Cookies:",
        cookies_why_li_advertising_desc: "Diese Cookies werden verwendet, um Werbebotschaften für Sie relevanter zu gestalten. Sie können von Drittanbieter-Werbepartnern gesetzt werden, um Ihre Surfgewohnheiten zu verfolgen und personalisierte Anzeigen basierend auf Ihren Interessen zu liefern.",
        cookies_h2_control: "Wie kann ich Cookies kontrollieren?",
        cookies_control_p1: "Sie haben das Recht zu entscheiden, ob Sie Cookies akzeptieren oder ablehnen möchten. Sie können Ihre Cookie-Einstellungen ausüben, indem Sie die Steuerelemente Ihres Webbrowsers einstellen oder ändern.",
        cookies_control_p2: "Die meisten Browser ermöglichen Ihnen:",
        cookies_control_li_view: "Zu sehen, welche Cookies Sie haben, und diese einzeln zu löschen.",
        cookies_control_li_block_third: "Drittanbieter-Cookies zu blockieren.",
        cookies_control_li_block_site: "Cookies von bestimmten Websites zu blockieren.",
        cookies_control_li_block_all: "Das Setzen aller Cookies zu blockieren.",
        cookies_control_li_delete: "Alle Cookies beim Schließen Ihres Browsers zu löschen.",
        cookies_control_p3: "Sie sollten sich bewusst sein, dass alle Präferenzen verloren gehen, wenn Sie Cookies löschen. Wenn Sie Cookies vollständig blockieren, funktionieren viele Websites nicht ordnungsgemäß, da bestimmte Funktionen auf ihnen beruhen.",
        cookies_control_p4: "Erfahren Sie, wie Sie Cookies in gängigen Browsern verwalten:",
        cookies_control_link_chrome: "Google Chrome",
        cookies_control_link_edge: "Microsoft Edge",
        cookies_control_link_firefox: "Mozilla Firefox",
        cookies_control_link_safari: "Apple Safari",
        cookies_control_p5: "Informationen zu anderen Browsern finden Sie auf der Website des Browser-Entwicklers.",
        cookies_h2_changes: "Änderungen dieser Cookie-Richtlinie",
        cookies_changes_p1: "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen an den von uns verwendeten Cookies oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Bitte besuchen Sie diese Cookie-Richtlinie regelmäßig, um informiert zu bleiben.",
        cookies_h2_contact: "Kontaktieren Sie uns",
        cookies_contact_p1: "Wenn Sie Fragen zur Verwendung von Cookies oder anderen Technologien haben, kontaktieren Sie uns bitte:",
        cookies_contact_li_email: "Per E-Mail: jonkarystudio@gmail.com",
        cookies_contact_li_web_label: "Über unsere Website:", // Corrected key for label
        cookies_contact_page_link: "Kontaktseite", // Corrected key for link
        // Terms Page Specific
        terms_h1: "Nutzungsbedingungen",
        terms_intro_1: 'Bitte lesen Sie diese Nutzungsbedingungen ("Bedingungen") sorgfältig durch, bevor Sie die Vectorise.Me-Website (den "Dienst") nutzen, die von JonkaryStudio ("uns", "wir" oder "unser") betrieben wird.',
        terms_intro_2: "Ihr Zugriff auf und Ihre Nutzung des Dienstes unterliegen Ihrer Annahme und Einhaltung dieser Bedingungen. Diese Bedingungen gelten für alle Besucher, Benutzer und andere, die auf den Dienst zugreifen oder ihn nutzen.",
        terms_intro_3: "Durch den Zugriff auf oder die Nutzung des Dienstes erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie mit einem Teil der Bedingungen nicht einverstanden sind, haben Sie keine Berechtigung, auf den Dienst zuzugreifen.",
        terms_h2_license: "Nutzungslizenz",
        terms_license_p1: "Es wird die Erlaubnis erteilt, die Materialien (Informationen oder Software) auf der Website von Vectorise.Me vorübergehend nur für die persönliche, nicht-kommerzielle, vorübergehende Betrachtung zu nutzen. Dies ist die Gewährung einer Lizenz, keine Übertragung des Eigentums, und unter dieser Lizenz dürfen Sie nicht:",
        terms_license_li_modify: "die Materialien ändern oder kopieren (außer der generierten SVG-Ausgabe aus Ihren eigenen Bildern);",
        terms_license_li_commercial: "die Materialien für kommerzielle Zwecke oder für öffentliche Zurschaustellungen (kommerziell oder nicht-kommerziell) verwenden, außer der aus Ihren eigenen Inhalten abgeleiteten SVG-Ausgabe;",
        terms_license_li_reverse: "versuchen, Software, die auf der Website von Vectorise.Me enthalten ist, zu dekompilieren oder zurückzuentwickeln;",
        terms_license_li_remove: "Urheberrechts- oder andere Eigentumsvermerke aus den Materialien entfernen; oder",
        terms_license_li_transfer: 'die Materialien an eine andere Person übertragen oder die Materialien auf einem anderen Server "spiegeln".',
        terms_license_p2: "Diese Lizenz endet automatisch, wenn Sie eine dieser Einschränkungen verletzen, und kann jederzeit von JonkaryStudio gekündigt werden.",
        terms_h2_content: "Hochgeladene Inhalte",
        terms_content_p1: 'Sie sind allein verantwortlich für die Bilder, die Sie in den Dienst hochladen ("Benutzerinhalte"). Sie versichern und garantieren, dass Sie Eigentümer der notwendigen Lizenzen, Rechte, Zustimmungen und Berechtigungen für Ihre Benutzerinhalte sind oder diese besitzen und Sie ermächtigen uns, Ihre Benutzerinhalte ausschließlich zum Zweck der Bereitstellung des Dienstes (d.h. der Konvertierung des Bildes in SVG) zu verwenden.',
        terms_content_p2: "Sie stimmen zu, keine Benutzerinhalte hochzuladen, die illegal, rechtsverletzend, verleumderisch, obszön oder anderweitig schädlich sind.",
        terms_content_p3: "Wir erheben keine Eigentumsansprüche an Ihren Benutzerinhalten oder den resultierenden SVG-Dateien, die vom Dienst aus Ihren Benutzerinhalten generiert werden.",
        terms_h2_disclaimer: "Haftungsausschluss",
        terms_disclaimer_p1: "Die Materialien und Dienste auf der Website von Vectorise.Me werden 'wie besehen' bereitgestellt. JonkaryStudio gibt keine Garantien, weder ausdrücklich noch stillschweigend, und lehnt hiermit alle anderen Garantien ab, einschließlich, aber nicht beschränkt auf stillschweigende Garantien oder Bedingungen der Marktgängigkeit, Eignung für einen bestimmten Zweck oder Nichtverletzung geistigen Eigentums oder anderer Rechtsverletzungen.",
        terms_disclaimer_p2: "Darüber hinaus garantiert JonkaryStudio nicht und macht keine Zusicherungen hinsichtlich der Genauigkeit, der wahrscheinlichen Ergebnisse oder der Zuverlässigkeit der Nutzung der Materialien auf seiner Website oder anderweitig in Bezug auf solche Materialien oder auf Websites, die mit dieser Website verlinkt sind. Der Konvertierungsprozess ist möglicherweise nicht perfekt und die Ergebnisse können je nach Quellbild und ausgewählten Einstellungen variieren.",
        terms_h2_limitations: "Haftungsbeschränkungen",
        terms_limitations_p1: "In keinem Fall haften JonkaryStudio oder seine Lieferanten für Schäden (einschließlich, aber nicht beschränkt auf Schäden durch Daten- oder Gewinnverlust oder aufgrund von Betriebsunterbrechungen), die sich aus der Nutzung oder Unmöglichkeit der Nutzung der Materialien oder des Dienstes auf der Website von Vectorise.Me ergeben, selbst wenn JonkaryStudio oder ein autorisierter Vertreter von JonkaryStudio mündlich oder schriftlich auf die Möglichkeit solcher Schäden hingewiesen wurde.",
        terms_h2_accuracy: "Genauigkeit der Materialien",
        terms_accuracy_p1: "Die auf der Website von Vectorise.Me erscheinenden Materialien können technische, typografische oder fotografische Fehler enthalten. JonkaryStudio garantiert nicht, dass alle Materialien auf seiner Website korrekt, vollständig oder aktuell sind.",
        terms_h2_modifications: "Änderungen am Dienst und den Bedingungen",
        terms_modifications_p1: "JonkaryStudio kann diese Nutzungsbedingungen für seine Website jederzeit ohne Vorankündigung ändern. Durch die Nutzung dieser Website erklären Sie sich damit einverstanden, an die jeweils aktuelle Version dieser Nutzungsbedingungen gebunden zu sein. Wir können den Dienst auch jederzeit ändern oder einstellen.",
        terms_h2_governing: "Anwendbares Recht",
        terms_governing_p1: "Diese Allgemeinen Geschäftsbedingungen unterliegen den Gesetzen von",
        terms_governing_jurisdiction_actual: "dem Staat Conneticut, USA,",
        terms_governing_p2: "und werden in Übereinstimmung mit diesen ausgelegt, und Sie unterwerfen sich unwiderruflich der ausschließlichen Zuständigkeit der Gerichte in diesem Staat oder Ort.",
        terms_h2_contact: "Kontaktieren Sie uns",
        terms_contact_p1: "Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte:",
        terms_contact_li_email: "Per E-Mail: jonkarystudio@gmail.com",
        terms_contact_li_web_label: "Über unsere Website:", // Corrected key for label
        terms_contact_page_link: "Kontaktseite", // Corrected key for link
        // Dynamic Status Messages (Used by JS)
        status_uploading: "Wird hochgeladen...",
        status_vectorizing: "Vektorisierung läuft...",
        status_updating: "Wird aktualisiert...",
        status_processing: "Verarbeitung läuft...",
        status_working: "Arbeitet...",
        status_updating_preview: "Vorschau wird aktualisiert...",
        status_complete: "Abgeschlossen!",
        status_options_reset: "Optionen auf Standard zurückgesetzt.",
        status_preset_loaded: "Voreinstellung \"{presetName}\" geladen.",
        status_settings_saved: "Einstellungen gespeichert.",
        status_error_saving_settings: "Fehler beim Speichern der Einstellungen.",
        status_error_loading_settings: "Fehler beim Laden der Einstellungen: {errorMessage}",
        status_error_reading_file: "Fehler beim Lesen der Einstellungsdatei.",
        status_error_invalid_json: "Ungültige JSON-Struktur.",
        status_error_no_options: "JSON enthält keine erkennbaren Optionen.",
        status_error_select_json: "Fehler: Bitte wählen Sie eine gültige .json-Einstellungsdatei.",
        status_settings_loaded: "Einstellungen erfolgreich geladen.",
        status_error_downloading: "Fehler beim Vorbereiten des Downloads.",
        status_error_generic: "Fehler: {errorMessage}",
        status_error_file_size: "Fehler: Datei überschreitet das 15MB-Limit.",
        status_error_file_type: "Fehler: Nicht unterstützter Dateityp ({fileType}). Bitte JPG, PNG, WEBP oder BMP verwenden.",
        status_no_file: "Keine Datei ausgewählt.",
        status_error_obj_url: "Fehler beim Erstellen der Objekt-URL: {errorMessage}",
        status_error_conversion_failed: "Konvertierung fehlgeschlagen: {errorMessage}",
        status_error_no_svg: "Keine SVG-Daten vom Server empfangen.",
        // Presets (Used by JS for status messages)
        preset_name_general: "Allgemein / Ausgeglichen",
        preset_name_pixel: "Pixel-Art",
        preset_name_technical: "Technische Zeichnung / Blaupause",
        preset_name_illustration: "Illustration / Grafik",
        preset_name_clipart: "Clipart / Logo",
        preset_name_cartoon: "Cartoon / Flacher Stil",
        preset_name_photograph: "Fotografie",
    },
    // --- Spanish (es) ---
    es: {
        lang_name: "Español",
        // Meta Tags
        meta_title_main_short: "Convertidor Gratuito de Imagen a SVG",
        meta_description_main: "Herramienta online gratuita para convertir imágenes rasterizadas (JPG, PNG, WEBP) a gráficos vectoriales escalables (SVG) con personalización en tiempo real y preajustes.",
        meta_title_contact: "Contacto - Vectorise.Me",
        meta_description_contact: "Póngase en contacto con Vectorise.Me o encuentre soluciones a problemas comunes de vectorización.",
        meta_title_privacy: "Política de Privacidad - Vectorise.Me",
        meta_description_privacy: "Política de privacidad de la herramienta online de conversión a SVG Vectorise.Me.",
        meta_title_cookies: "Política de Cookies - Vectorise.Me",
        meta_description_cookies: "Política de cookies de la herramienta online de conversión a SVG Vectorise.Me.",
        meta_title_terms: "Términos de Servicio - Vectorise.Me",
        meta_description_terms: "Términos de servicio de la herramienta online de conversión a SVG Vectorise.Me.",
        // Header
        upload_new: "Subir Nueva",
        // Landing Page - Hero & Upload
        landing_h1_free: "Solo GRATIS",
        landing_h1_and: "y",
        landing_h1_customizable: "Vectorizador PERSONALIZABLE",
        landing_subheadline_detailed: "Convierte instantáneamente imágenes JPG, PNG, WEBP en vectores SVG nítidos e infinitamente escalables. Incluye opciones de trazado avanzadas y preajustes útiles para resultados precisos.",
        upload_drag_drop: "Arrastra y Suelta la Imagen",
        upload_or: "o",
        upload_browse: "Explorar Archivos",
        upload_formats: "Máx 15MB (JPG, PNG, WEBP, BMP)",
        cancel_selection_title: "Cancelar Selección",
        vectorize_image_btn: "Vectorizar Imagen",
        // Landing Page - Features
        features_h2: "Características",
        features_p: "Todo lo que necesitas para SVGs perfectos. Nuestra potente herramienta de conversión te da control total sobre tus gráficos vectoriales.",
        feature_instant_h3: "Conversión Instantánea",
        feature_instant_p: "Sube tu imagen y obtén una vista previa SVG al instante. Sin esperas, sin retrasos en el procesamiento.",
        feature_realtime_h3: "Personalización en Tiempo Real",
        feature_realtime_p: "Ajusta la configuración y ve los cambios en tiempo real. Perfecciona tu SVG.",
        feature_quality_h3: "Resultados de Alta Calidad",
        feature_quality_p: "Obtén SVGs limpios y optimizados que escalan perfectamente para cualquier caso de uso.",
        // Landing Page - Presets
        presets_h2: "Ejemplos de Preajustes",
        presets_p: "Mira cómo diferentes preajustes manejan varios tipos de imágenes.",
        preset_photo: "Fotografía",
        preset_clipart: "Clipart / Logo",
        preset_pixel: "Pixel Art",
        preset_original: "Original",
        preset_vectorized: "Vectorizado",
        // Landing Page - CTA
        cta_p_revised: "Empieza al instante – no necesitas registrarte. ¡Solo sube y vectoriza!",
        // App View - Options Panel
        options_h2: "Opciones",
        load_settings_title: "Cargar configuración",
        save_settings_title: "Guardar configuración",
        reset_options_title: "Restablecer opciones",
        load_btn: "Cargar",
        save_btn: "Guardar",
        reset_btn: "Restablecer",
        preset_label: "Preajuste de Tipo de Imagen:",
        preset_select_placeholder: "Cargar un Preajuste...",
        options_legend_color: "Configuración de Color",
        color_detail_title: "Detalle de Color",
        color_detail_label: "Detalle de Color:",
        color_detail_full: "Completo (8 bit)",
        color_detail_standard: "Estándar (6 bit)",
        color_detail_reduced: "Reducido (5 bit)",
        color_detail_limited: "Limitado (4 bit)",
        color_detail_posterized: "Posterizado (3 bit)",
        color_mode_title: "Modo de Color",
        color_mode_label: "Modo de Color:",
        color_mode_color: "Color",
        color_mode_binary: "Binario",
        options_legend_trace: "Parámetros de Trazado",
        filter_speckle_label: "Filtrar Manchas:",
        mode_label: "Modo:",
        mode_spline: "Spline",
        mode_polygon: "Polígono",
        mode_pixel: "Pixel",
        options_legend_geo: "Geometría y Ajuste de Trazado",
        corner_threshold_label: "Umbral de Esquina:",
        path_precision_label: "Precisión de Trazado:",
        unit_decimals: "decimales",
        spline_threshold_label: "Umbral de Spline:",
        splice_threshold_label: "Umbral de Empalme:",
        segment_length_label: "Longitud de Segmento:",
        options_legend_color_proc: "Opciones de Procesamiento de Color",
        layering_label: "Capas:",
        layering_stacked: "Apiladas",
        layering_cutout: "Recortadas",
        gradient_step_label: "Paso de Gradiente:",
        update_vectorization_btn: "Actualizar Vectorización",
        // App View - Result Panel
        preview_h2: "Vista Previa",
        zoom_out_title: "Alejar",
        zoom_reset_title: "Restablecer Zoom",
        zoom_in_title: "Acercar",
        preview_original_label: "Original",
        preview_vectorized_label: "Vectorizado",
        preview_placeholder_processing: "Procesando...",
        preview_placeholder_loading: "Cargando vista previa...",
        preview_placeholder_select: "El resultado SVG aparecerá aquí",
        preview_placeholder_update_failed: "Actualización Fallida",
        download_svg_btn: "Descargar SVG",
        // Footer
        footer_home_link: "Inicio",
        footer_contact_link: "Contacto",
        footer_privacy_link: "Política de Privacidad",
        footer_cookies_link: "Política de Cookies",
        footer_terms_link: "Términos de Servicio",
        footer_copyright: "© 2025 JonkaryStudio. Todos los derechos reservados.",
        // Contact Page
        contact_h1: "Contáctanos",
        contact_name_label: "Nombre",
        contact_name_placeholder: "Tu nombre",
        contact_email_label: "Correo electrónico",
        contact_email_placeholder: "Tu correo electrónico",
        contact_subject_label: "Asunto",
        contact_subject_placeholder: "Asunto del mensaje",
        contact_message_label: "Mensaje",
        contact_message_placeholder: "Tu mensaje",
        contact_send_btn: "Enviar Mensaje",
        contact_status_fill_fields: "Por favor, rellena todos los campos obligatorios.",
        contact_status_invalid_email: "Por favor, introduce una dirección de correo electrónico válida.",
        contact_status_opening_email: "Abriendo tu cliente de correo...",
        contact_status_complete_send: "Por favor, completa el envío del correo electrónico a través de tu aplicación de correo.",
        contact_status_error_email: "No se pudo abrir el cliente de correo. Por favor, copia los detalles manualmente a {recipient}.",
        // FAQ / Common Problems
        faq_h2: "Problemas Comunes y Soluciones",
        faq_p: "Aquí tienes algunos problemas comunes que podrías encontrar y cómo resolverlos.",
        faq_q_quality: "Problemas de Calidad de Imagen:",
        faq_q_quality_desc: "El SVG convertido no coincide con la calidad de la imagen original.",
        faq_solution_label: "Solución:",
        faq_a_quality: "Ajusta la configuración en el proceso de vectorización. Aumentar el 'Detalle de Color' (tamaño de paleta), ajustar el 'Umbral de Spline' (más bajo para más detalle), o reducir 'Filtrar Manchas' puede ayudar. Para pixel art, asegúrate de que el modo 'Pixel' esté seleccionado. Experimenta con diferentes preajustes.",
        faq_q_upload_failed: "Error al Convertir la Imagen:",
        faq_q_upload_failed_desc: "La imagen subida no se pudo convertir.",
        faq_a_upload_failed: "Comprueba la compatibilidad de la imagen. Vectorise.Me solo maneja JPG, PNG, WEBP y BMP. Si tienes imágenes en formatos diferentes, conviértelas primero antes de subirlas.",
        faq_q_performance: "Problemas de Rendimiento:",
        faq_q_performance_desc: "El proceso de conversión es lento o no responde, o el SVG resultante es muy grande.",
        faq_a_performance: "Intenta reducir el tamaño o la complejidad de la imagen antes de subirla. Las imágenes grandes o muy detalladas tardan más en procesarse y generan SVGs más grandes. Bajar el 'Detalle de Color' o aumentar 'Filtrar Manchas' también puede simplificar la salida y mejorar el rendimiento.",
        faq_q_detail_loss: "Pérdida de Detalle Fino:",
        faq_q_detail_loss_desc: "Pequeños elementos o líneas finas desaparecen en el SVG.",
        faq_a_detail_loss: "Reduce significativamente el valor de 'Filtrar Manchas' (p.ej., a 0 o 1). Asegúrate de que la 'Precisión de Trazado' sea adecuada (aunque valores más altos aumentan el tamaño del archivo). Para el modo spline, bajar ligeramente el 'Umbral de Spline' podría capturar más curvas.",
        faq_q_jagged: "Bordes Dentados (Modo Polígono):",
        faq_q_jagged_desc: "Las líneas aparecen en bloques en lugar de suaves.",
        faq_a_jagged: "Cambia el 'Modo' a 'Spline' para curvas más suaves. El modo Polígono crea inherentemente segmentos de línea recta.",
        faq_q_colors: "Colores Inesperados:",
        faq_q_colors_desc: "Los colores en el SVG se ven diferentes o posterizados.",
        faq_a_colors: "Asegúrate de que el 'Modo de Color' esté en 'Color'. Aumenta la configuración de 'Detalle de Color' (mayor precisión de bits). Comprueba si el 'Paso de Gradiente' es apropiado; un valor muy alto podría reducir las transiciones de color sutiles.",
        faq_q_transparency: "Transparencia No Conservada:",
        faq_q_transparency_desc: "Se pierde la transparencia del fondo de los PNGs.",
        faq_a_transparency: "`vtracer` generalmente maneja bien la transparencia, especialmente con capas 'Apiladas'. Asegúrate de que tu PNG original tenga transparencia real. Si usas capas 'Recortadas', la transparencia podría comportarse de manera diferente. El proceso subyacente a veces puede cuantificar colores casi transparentes como opacos dependiendo de la configuración.",
        faq_q_browser: "Diferencias de Renderizado del Navegador:",
        faq_q_browser_desc: "El SVG se ve ligeramente diferente en varios navegadores web.",
        faq_a_browser: "Esto es inherente a los motores de renderizado SVG. Asegúrate de que tu SVG esté bien formado. Evita CSS o filtros excesivamente complejos dentro del SVG si la compatibilidad es crítica. Prueba en los principales navegadores.",
        // Legal Pages Shared
        legal_last_updated: "Última Actualización:",
        legal_date_placeholder: "[Insertar Fecha]",
        // Privacy Page Specific
        privacy_h1: "Política de Privacidad",
        privacy_intro_1: 'Bienvenido a Vectorise.Me (el "Servicio"), operado por JonkaryStudio ("nosotros", "nos", o "nuestro"). Esta página le informa de nuestras políticas con respecto a la recopilación, uso y divulgación de datos personales cuando utiliza nuestro Servicio y las opciones que tiene asociadas con esos datos.',
        privacy_h2_collection: "Recopilación y Uso de Información",
        privacy_collection_p1: "Recopilamos varios tipos diferentes de información para diversos fines para proporcionar y mejorar nuestro Servicio para usted.",
        privacy_h3_types: "Tipos de Datos Recopilados",
        privacy_h4_personal: "Datos Personales",
        privacy_personal_p1: 'Mientras utiliza nuestro Servicio, particularmente al contactarnos, podemos pedirle que nos proporcione cierta información de identificación personal ("Datos Personales"). Esto puede incluir, entre otros:',
        privacy_personal_li_email: "Dirección de correo electrónico",
        privacy_personal_li_name: "Nombre",
        privacy_personal_p2: "También podemos recopilar Datos de Uso como se describe a continuación.",
        privacy_h4_image: "Datos de Imagen",
        privacy_image_p1: "Cuando sube una imagen para su conversión, los datos de la imagen se envían a nuestro servidor para su procesamiento. Procesamos la imagen únicamente con el propósito de convertirla al formato SVG según lo solicitado por usted.",
        privacy_image_policy_actual: "Las imágenes subidas y los SVGs generados no se almacenan en nuestros servidores después del procesamiento y la generación del enlace de descarga.",
        privacy_h4_usage: "Datos de Uso",
        privacy_usage_p1: 'Podemos recopilar información sobre cómo se accede y utiliza el Servicio ("Datos de Uso"). Estos Datos de Uso pueden incluir la dirección IP de su computadora, tipo de navegador, versión del navegador, las páginas visitadas, hora y fecha de la visita, tiempo dedicado a las páginas, identificadores únicos de dispositivo y otros datos de diagnóstico.',
        privacy_usage_analytics_info: "Utilizamos Google Analytics para ayudarnos a analizar y mejorar el rendimiento y la experiencia del usuario de nuestro Servicio.",
        privacy_h2_use: "Uso de Datos",
        privacy_use_p1: "JonkaryStudio utiliza los datos recopilados para fines tales como:",
        privacy_use_li_provide: "Proporcionar y mantener el Servicio.",
        privacy_use_li_process: "Procesar solicitudes de conversión de imágenes.",
        privacy_use_li_respond: "Responder a sus consultas de contacto.",
        privacy_use_li_improve: "Mejorar el Servicio basándose en el análisis de uso.",
        privacy_use_li_monitor: "Monitorear el uso del Servicio para estabilidad y seguridad.",
        privacy_use_li_detect: "Detectar, prevenir y abordar problemas técnicos.",
        privacy_h2_transfer: "Transferencia de Datos",
        privacy_transfer_p1: "Su información, incluidos los datos de imagen durante el procesamiento, puede procesarse en servidores ubicados fuera de su jurisdicción donde las leyes de protección de datos pueden diferir. Su consentimiento a esta Política de Privacidad seguido de su uso del Servicio representa su acuerdo con dicha transferencia.",
        privacy_transfer_p2: "Tomamos medidas razonables para garantizar que los datos se traten de forma segura.",
        privacy_h2_disclosure: "Divulgación de Datos",
        privacy_disclosure_actual: "Podemos divulgar sus Datos de Uso en circunstancias limitadas, como para cumplir con obligaciones legales, proteger nuestros derechos o los de otros, prevenir irregularidades o en caso de una transferencia comercial (por ejemplo, fusión o adquisición).",
        privacy_disclosure_p1: "No vendemos sus Datos Personales.",
        privacy_h2_security: "Seguridad de los Datos",
        privacy_security_p1: "La seguridad de sus datos es importante. Si bien nos esforzamos por utilizar medios comercialmente aceptables (como HTTPS) para proteger los datos, ningún método de transmisión o almacenamiento es 100% seguro. No podemos garantizar la seguridad absoluta.",
        privacy_h2_providers: "Proveedores de Servicios",
        privacy_providers_actual: "Podemos emplear proveedores de servicios de terceros para facilitar la operación de nuestro Servicio. Estos proveedores incluyen Render.com para servicios de hosting y Google Analytics para análisis, como se mencionó anteriormente. Estos terceros tienen acceso a sus Datos de Uso solo para realizar estas tareas específicas en nuestro nombre y están obligados a proteger su información de acuerdo con los estándares aplicables.",
        privacy_h2_links: "Enlaces a Otros Sitios",
        privacy_links_p1: "Nuestro Servicio puede contener enlaces a otros sitios. No tenemos control ni asumimos ninguna responsabilidad por el contenido o las prácticas de los sitios de terceros.",
        privacy_h2_children: "Privacidad de los Niños",
        privacy_children_p1: "Nuestro Servicio no recopila a sabiendas información de identificación personal de niños menores de",
        privacy_children_age_actual: "13",
        privacy_children_p2_added: "años. Si nos damos cuenta de que hemos recopilado inadvertidamente dicha información, tomaremos medidas para eliminarla lo antes posible. Alentamos a los padres y tutores a contactarnos si creen que su hijo puede habernos proporcionado información personal.",
        privacy_h2_changes: "Cambios a esta Política de Privacidad",
        privacy_changes_p1: 'Podemos actualizar esta política. Le notificaremos publicando la nueva política en esta página y actualizando la fecha de "Última actualización".',
        privacy_h2_contact: "Contáctanos",
        privacy_contact_p1: "Si tiene preguntas, contáctenos:",
        privacy_contact_li_email: "Por correo electrónico: jonkarystudio@gmail.com",
        privacy_contact_li_web: "A través de nuestro sitio web:",
        privacy_contact_page_link: "Página de Contacto",
        // Cookies Page Specific
        cookies_h1: "Política de Cookies",
        cookies_intro_1: 'Esta Política de Cookies explica cómo JonkaryStudio ("nosotros", "nos", o "nuestro") utiliza cookies y tecnologías de seguimiento similares en el sitio web Vectorise.Me (el "Servicio"). Explica qué son estas tecnologías y por qué las usamos, así como sus derechos para controlar nuestro uso de ellas.',
        cookies_h2_what: "¿Qué son las Cookies?",
        cookies_what_p1: "Las cookies son pequeños archivos de datos que se colocan en su dispositivo cuando visita un sitio web. Las cookies son ampliamente utilizadas por los propietarios de sitios web para hacer que sus sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información de informes.",
        cookies_what_p2: 'Las cookies establecidas por el propietario del sitio web (en este caso, JonkaryStudio) se denominan "cookies de origen". Las cookies establecidas por partes distintas del propietario del sitio web se denominan "cookies de terceros". Las cookies de terceros habilitan características o funcionalidades de terceros que se proporcionan en o a través del sitio web (por ejemplo, publicidad, contenido interactivo y análisis). Las partes que establecen estas cookies de terceros pueden reconocer su computadora tanto cuando visita el sitio web en cuestión como cuando visita otros sitios web determinados.',
        cookies_h2_why: "¿Por qué usamos Cookies?",
        cookies_why_p1: 'Utilizamos cookies de origen y posiblemente de terceros por varias razones. Algunas cookies son necesarias por razones técnicas para que nuestro Servicio funcione, y nos referimos a ellas como cookies "esenciales" o "estrictamente necesarias".',
        cookies_why_li_essential: "Cookies Esenciales:",
        cookies_why_li_essential_desc: "Son necesarias para proporcionarle los servicios disponibles a través de nuestro Servicio y para permitirle usar algunas de sus funciones, como administrar su sesión durante el proceso de conversión (si corresponde) o asegurar el sitio. Render.com, nuestro proveedor de hosting, puede usar cookies de sesión esenciales para garantizar la funcionalidad adecuada.",
        cookies_why_li_analytics: "Cookies de Análisis y Personalización:",
        cookies_why_li_analytics_desc: "Estas cookies recopilan información que se utiliza de forma agregada para ayudarnos a comprender cómo se utiliza nuestro Servicio o cuán efectivas son nuestras campañas de marketing, o para ayudarnos a personalizar nuestro Servicio para usted. Utilizamos Google Analytics, que puede establecer cookies como `_ga` y `_gid` para rastrear patrones de uso y mejorar su experiencia.",
        cookies_why_li_advertising: "Cookies de Publicidad:",
        cookies_why_li_advertising_desc: "Estas cookies se utilizan para hacer que los mensajes publicitarios sean más relevantes para usted. Pueden ser establecidas por socios publicitarios de terceros para rastrear sus hábitos de navegación y entregar anuncios personalizados basados en sus intereses.",
        cookies_h2_control: "¿Cómo puedo controlar las Cookies?",
        cookies_control_p1: "Tiene derecho a decidir si acepta o rechaza las cookies. Puede ejercer sus preferencias de cookies configurando o modificando los controles de su navegador web.",
        cookies_control_p2: "La mayoría de los navegadores le permiten:",
        cookies_control_li_view: "Ver qué cookies tiene y eliminarlas individualmente.",
        cookies_control_li_block_third: "Bloquear cookies de terceros.",
        cookies_control_li_block_site: "Bloquear cookies de sitios particulares.",
        cookies_control_li_block_all: "Bloquear la instalación de todas las cookies.",
        cookies_control_li_delete: "Eliminar todas las cookies al cerrar su navegador.",
        cookies_control_p3: "Debe tener en cuenta que cualquier preferencia se perderá si elimina las cookies. Si elige bloquear las cookies por completo, muchos sitios web no funcionarán correctamente ya que cierta funcionalidad depende de ellas.",
        cookies_control_p4: "Descubra cómo administrar las cookies en los navegadores populares:",
        cookies_control_link_chrome: "Google Chrome",
        cookies_control_link_edge: "Microsoft Edge",
        cookies_control_link_firefox: "Mozilla Firefox",
        cookies_control_link_safari: "Apple Safari",
        cookies_control_p5: "Para encontrar información relacionada con otros navegadores, visite el sitio web del desarrollador del navegador.",
        cookies_h2_changes: "Cambios a esta Política de Cookies",
        cookies_changes_p1: "Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en las cookies que usamos o por otras razones operativas, legales o regulatorias. Vuelva a visitar esta Política de Cookies regularmente para mantenerse informado.",
        cookies_h2_contact: "Contáctanos",
        cookies_contact_p1: "Si tiene alguna pregunta sobre nuestro uso de cookies u otras tecnologías, contáctenos:",
        cookies_contact_li_email: "Por correo electrónico: jonkarystudio@gmail.com",
        cookies_contact_li_web: "A través de nuestro sitio web:",
        cookies_contact_page_link: "Página de Contacto",
        // Terms Page Specific
        terms_h1: "Términos de Servicio",
        terms_intro_1: 'Lea atentamente estos Términos de Servicio ("Términos") antes de utilizar el sitio web Vectorise.Me (el "Servicio") operado por JonkaryStudio ("nosotros", "nos" o "nuestro").',
        terms_intro_2: "Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de estos Términos. Estos Términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el Servicio.",
        terms_intro_3: "Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con alguna parte de los términos, no tiene permiso para acceder al Servicio.",
        terms_h2_license: "Licencia de Uso",
        terms_license_p1: "Se concede permiso para usar temporalmente los materiales (información o software) en el sitio web de Vectorise.Me solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia no puede:",
        terms_license_li_modify: "modificar o copiar los materiales (excepto la salida SVG generada a partir de sus propias imágenes);",
        terms_license_li_commercial: "usar los materiales para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial), excepto la salida SVG derivada de su propio contenido;",
        terms_license_li_reverse: "intentar descompilar o aplicar ingeniería inversa a cualquier software contenido en el sitio web de Vectorise.Me;",
        terms_license_li_remove: "eliminar cualquier derecho de autor u otras anotaciones de propiedad de los materiales; o",
        terms_license_li_transfer: 'transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor.',
        terms_license_p2: "Esta licencia terminará automáticamente si viola alguna de estas restricciones y puede ser terminada por JonkaryStudio en cualquier momento.",
        terms_h2_content: "Contenido Subido",
        terms_content_p1: 'Usted es el único responsable de las imágenes que sube al Servicio ("Contenido de Usuario"). Usted declara y garantiza que posee o tiene las licencias, derechos, consentimientos y permisos necesarios para su Contenido de Usuario y nos autoriza a usar su Contenido de Usuario únicamente con el propósito de proporcionar el Servicio (es decir, convertir la imagen a SVG).',
        terms_content_p2: "Usted acepta no subir Contenido de Usuario que sea ilegal, infractor, difamatorio, obsceno o de cualquier otra forma perjudicial.",
        terms_content_p3: "No reclamamos ningún derecho de propiedad sobre su Contenido de Usuario o los archivos SVG resultantes generados por el Servicio a partir de su Contenido de Usuario.",
        terms_h2_disclaimer: "Descargo de Responsabilidad",
        terms_disclaimer_p1: "Los materiales y servicios en el sitio web de Vectorise.Me se proporcionan 'tal cual'. JonkaryStudio no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, las garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular o no infracción de la propiedad intelectual u otra violación de derechos.",
        terms_disclaimer_p2: "Además, JonkaryStudio no garantiza ni hace ninguna representación con respecto a la precisión, los resultados probables o la confiabilidad del uso de los materiales en su sitio web o relacionados de otro modo con dichos materiales o en cualquier sitio vinculado a este sitio. El proceso de conversión puede no ser perfecto y los resultados pueden variar según la imagen de origen y la configuración seleccionada.",
        terms_h2_limitations: "Limitaciones",
        terms_limitations_p1: "En ningún caso JonkaryStudio o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surjan del uso o la imposibilidad de usar los materiales o el Servicio en el sitio web de Vectorise.Me, incluso si JonkaryStudio o un representante autorizado de JonkaryStudio ha sido notificado oralmente o por escrito de la posibilidad de dicho daño.",
        terms_h2_accuracy: "Precisión de los Materiales",
        terms_accuracy_p1: "Los materiales que aparecen en el sitio web de Vectorise.Me podrían incluir errores técnicos, tipográficos o fotográficos. JonkaryStudio no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual.",
        terms_h2_modifications: "Modificaciones al Servicio y los Términos",
        terms_modifications_p1: "JonkaryStudio puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio. También podemos modificar o descontinuar el Servicio en cualquier momento.",
        terms_h2_governing: "Ley Aplicable",
        terms_governing_p1: "Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de",
        terms_governing_jurisdiction_actual: "el Estado de Conneticut, EE. UU.",
        terms_governing_p2: "y usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales de ese Estado o lugar.",
        terms_h2_contact: "Contáctanos",
        terms_contact_p1: "Si tiene alguna pregunta sobre estos Términos, contáctenos:",
        terms_contact_li_email: "Por correo electrónico: jonkarystudio@gmail.com",
        terms_contact_li_web: "A través de nuestro sitio web:",
        terms_contact_page_link: "Página de Contacto",
        // Dynamic Status Messages (Used by JS)
        status_uploading: "Subiendo...",
        status_vectorizing: "Vectorizando...",
        status_updating: "Actualizando...",
        status_processing: "Procesando...",
        status_working: "Trabajando...",
        status_updating_preview: "Actualizando vista previa...",
        status_complete: "¡Completado!",
        status_options_reset: "Opciones restablecidas a los valores predeterminados.",
        status_preset_loaded: "Preajuste \"{presetName}\" cargado.",
        status_settings_saved: "Configuración guardada.",
        status_error_saving_settings: "Error al guardar la configuración.",
        status_error_loading_settings: "Error al cargar la configuración: {errorMessage}",
        status_error_reading_file: "Error al leer el archivo de configuración.",
        status_error_invalid_json: "Estructura JSON inválida.",
        status_error_no_options: "JSON no contiene opciones reconocibles.",
        status_error_select_json: "Error: Seleccione un archivo de configuración .json válido.",
        status_settings_loaded: "Configuración cargada con éxito.",
        status_error_downloading: "Error al preparar la descarga.",
        status_error_generic: "Error: {errorMessage}",
        status_error_file_size: "Error: El archivo excede el límite de 15MB.",
        status_error_file_type: "Error: Tipo de archivo no compatible ({fileType}). Use JPG, PNG, WEBP o BMP.",
        status_no_file: "No se seleccionó ningún archivo.",
        status_error_obj_url: "Error al crear la URL del objeto: {errorMessage}",
        status_error_conversion_failed: "Conversión Fallida: {errorMessage}",
        status_error_no_svg: "No se recibieron datos SVG del servidor.",
        // Presets (Used by JS for status messages)
        preset_name_general: "General / Equilibrado",
        preset_name_pixel: "Pixel Art",
        preset_name_technical: "Dibujo Técnico / Plano",
        preset_name_illustration: "Ilustración / Gráfico",
        preset_name_clipart: "Clipart / Logo",
        preset_name_cartoon: "Dibujo Animado / Estilo Plano",
        preset_name_photograph: "Fotografía",
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