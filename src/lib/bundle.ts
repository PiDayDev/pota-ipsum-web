interface Bundle {
    generate: string;
    paragraphs: string;
    sentences: string;
    words: string;
}

const bergamasc: Bundle = {
    generate: 'Fàm sü',
    paragraphs: 'ciacolàde',
    sentences: 'batüde',
    words: 'paròle',
}

const italiano: Bundle = {
    generate: 'Genera',
    paragraphs: 'paragrafi',
    sentences: 'frasi',
    words: 'parole',
}

const english: Bundle = {
    generate: 'Generate',
    paragraphs: 'paragraphs',
    sentences: 'sentences',
    words: 'words',
};

export const bundles = {
    bg: bergamasc,
    it: italiano,
    en: english,
}
