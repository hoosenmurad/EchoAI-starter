export function validateVideoInput(file: File) {
    const validTypes = ['video/mp4', 'video/avi'];
    const maxSize = 100 * 1024 * 1024; // 100MB
    const maxDuration = 600; // 10 minutes

    if (!validTypes.includes(file.type)) return false;
    if (file.size > maxSize) return false;
    // Add logic to check duration if necessary
    return true;
} 