function getFileSizeDesc(bytes) {
	if (bytes === 0) return 'Empty'; 
    var nKb = bytes / 1024;
    if (nKb < 1) return `${bytes} Bytes`;
    var nMb = bytes / (1024 * 1024);
    if (nMb < 1) return `${nKb.toFixed(1)} Kb`;
    var nGb = bytes / (1024 * 1024 * 1024);
    if (nGb < 1) return `${nMb.toFixed(1)} Mb`;
    return `${nGb.toFixed(1)} Gb`;
}