import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { PotaIpsum } from 'pota-ipsum';

const pota = new PotaIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

export default function Home() {
    const [text, setText] = useState<string>('');

    const generate = () => {
        let s = pota.generateParagraphs(3);
        setText(s.replace(/\n/g, '\n\n'));
        console.log(s)
    }

    return (
        <>
            <Head>
                <title>Pota Ipsum</title>
                <meta name="description" content="Generated Lorem ipsum placeholder text with Berghem flavor"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.description} onClick={generate}>Generate</div>
                <textarea className={styles.center} readOnly value={text}/>
            </main>
        </>
    )
}
