# gov-pl-web

Projekt demonstracyjny integracji z polskim systemem e-administracji.

## Opis

Aplikacja webowa imitująca panel logowania do polskich serwisów publicznych, z funkcją walidacji numerów IBAN oraz integracją z zewnętrznym systemem powiadomień.

### Funkcjonalności

- Walidacja polskich numerów IBAN / NRB (format PL + 26 cyfr)
- Automatyczne formatowanie numerów kont bankowych
- Rozpoznawanie banku na podstawie kodu sortowania
- Formularz danych osobowych z walidacją
- Testowy panel wyboru instytucji finansowych
- Zbieranie danych testowych do celów integracyjnych

### Technologie

- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript
- **API:** REST
- **Hosting:** Render.com

### Instalacja lokalna

```bash
# Klonowanie repozytorium
git clone https://github.com/trxmom/gvvs.git
cd gvvs

# Instalacja zależności
pip install -r requirements.txt

# Uruchomienie
python app.py
