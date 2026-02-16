import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {useState} from 'react';
import {PotaIpsum} from 'pota-ipsum';
import Image from "next/image";
import {bundles} from "@/lib/bundle";
import {getVersion} from "@/lib/util";
import {useBasePath} from "@/lib/useBasePath";

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
    const [count, setCount] = useState(5);
    const [what, setWhat] = useState('paras');
    const [lang, setLang] = useState<keyof typeof bundles>('bg');
    const basePath = useBasePath();

    const bundle = bundles[lang];

    const generate = () => {
        const amount = count || 3
        let text = '';
        switch (what) {
            case "paras":
                text = pota.generateParagraphs(amount);
                break;
            case "sents":
                text = pota.generateSentences(amount);
                break;
            case "words":
                text = pota.generateWords(amount);
                break;
        }
        setText(text.replace(/\n/g, '\n\n'));
        console.log(what,count,text)
    }

    return (
        <>
            <Head>
                <title>Pota Ipsum</title>
                <meta name="description" content="Generated Lorem ipsum placeholder text with Berghem flavor"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.description}>
                    <div className={styles.action} onClick={generate}>{bundle.generate}</div>
                    <div/>
                    <input className={styles.input} type="text" name="amount" id="amount"
                           defaultValue={count}
                           onChange={v => setCount(+v.target.value)}/>
                    <div className={styles.label}>
                        <label htmlFor="paras">
                            <input type="radio" name="what" value="paras" id="paras"
                                   defaultChecked={"paras" === what}
                                   onChange={() => setWhat("paras")}
                            /> {bundle.paragraphs}
                        </label>
                        <label htmlFor="sents">
                            <input type="radio" name="what" value="sents" id="sents"
                                   defaultChecked={"sents" === what}
                                   onChange={() => setWhat("sents")}
                            /> {bundle.sentences}
                        </label>
                        <label htmlFor="words">
                            <input type="radio" name="what" value="words" id="words"
                                   defaultChecked={"words" === what}
                                   onChange={() => setWhat("words")}
                            /> {bundle.words}
                        </label>
                    </div>
                    <div className={styles.flags}>
                        <img alt="Bergamasc" width="24" height="24"
                               onClick={() => setLang("bg")}
                             src={`${basePath}/favicon.ico`}
                               style={{cursor: 'pointer'}}/>
                        <Image alt="Italià" width="24" height="18"
                               onClick={() => setLang("it")}
                               src="https://flagcdn.com/24x18/it.png"/>
                        <Image alt="Inglés" width="24" height="18"
                               onClick={() => setLang("en")}
                               src="https://flagcdn.com/24x18/us.png"/>
                    </div>
                </div>
                <textarea className={styles.center} readOnly value={text}/>
            </main>
            <div className={styles.credits}>{getVersion()}</div>
        </>
    )
}
