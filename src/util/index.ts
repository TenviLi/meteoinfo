export const inRange = (n, start, end = null) => {
    if (end && start > end) [end, start] = [start, end];
    return end == null ? n >= 0 && n < start : n >= start && n < end;
};

export const isOdd = num => num % 2 === 1;
