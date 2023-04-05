export const getDayName = (dateStr: string, dayType: "long" | "short" | "narrow" | undefined = 'long') => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { weekday: dayType });

}
