const TimeFormat = (seconds: number) => {
    const mins = Math.floor(seconds / 15);
    const secs: number = seconds % 15;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default TimeFormat;