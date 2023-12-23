export function getTimeGreeting(): string {
    const now = new Date();
    const currentHour = now.getHours();
  
    if (currentHour >= 0 && currentHour < 6) {
      return 'Good Night 🌙';
    } else if (currentHour >= 6 && currentHour < 12) {
      return 'Good Morning ☀️';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon 🌞';
    } else {
      return 'Good Evening 🌜';
    }
  }
  