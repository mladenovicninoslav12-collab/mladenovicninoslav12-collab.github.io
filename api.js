// Frontend-Backend integracijska konfiguracija

const API_URL = 'http://localhost:5000/api';

/**
 * Pošalji rezervaciju na backend
 */
async function submitBookingToAPI(formData) {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`API greška: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Rezervacija poslata na server:', data);
        return data;

    } catch (error) {
        console.error('❌ Greška pri slanju rezervacije:', error);
        throw error;
    }
}

/**
 * Preuzmi sve rezervacije (za admin panel kasnije)
 */
async function fetchAllBookings() {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Greška pri preuzimanju rezervacija');
        }

        const data = await response.json();
        console.log('📋 Rezervacije preuzete:', data);
        return data;

    } catch (error) {
        console.error('❌ Greška pri preuzimanju:', error);
        return null;
    }
}
