import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { PotaIpsum } from 'pota-ipsum'
import { bundles } from '@/lib/bundle'
import { useBasePath } from '@/lib/useBasePath'

const pota = new PotaIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 },
})

type Lang = keyof typeof bundles
type Mode = 'paras' | 'sents' | 'words'

export default function Home() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(5)
  const [mode, setMode] = useState<Mode>('paras')
  const [lang, setLang] = useState<Lang>('bg')
  const basePath = useBasePath()

  const bundle = bundles[lang]

  const generate = () => {
    const amount = count || 3
    let result = ''
    switch (mode) {
      case 'paras':
        result = pota.generateParagraphs(amount)
        break
      case 'sents':
        result = pota.generateSentences(amount)
        break
      case 'words':
        result = pota.generateWords(amount)
        break
    }
    setText(result.replace(/\n/g, '\n\n'))
  }

  return (
    <>
      <Head>
        <title>Pota Ipsum</title>
        <meta name="description" content="Lorem ipsum placeholder text with Berghem flavor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <img
              src={`${basePath}/favicon.ico`}
              alt=""
              width={40}
              height={40}
              className={styles.logo}
            />
            <h1 className={styles.title}>Pota Ipsum</h1>
          </div>

          <nav className={styles.langSwitcher}>
            <button
              className={`${styles.langBtn} ${lang === 'it' ? styles.langBtnActive : ''}`}
              onClick={() => setLang('it')}
              title="Italiano"
              aria-label="Italiano"
            >
              <img src="https://flagcdn.com/48x36/it.png" alt="Italiano" width={32} height={24} />
            </button>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
              onClick={() => setLang('en')}
              title="English"
              aria-label="English"
            >
              <img src="https://flagcdn.com/48x36/us.png" alt="English" width={32} height={24} />
            </button>
            <button
              className={`${styles.langBtn} ${lang === 'bg' ? styles.langBtnActive : ''}`}
              onClick={() => setLang('bg')}
              title="Bergamasc"
              aria-label="Bergamasc"
            >
              <img
                src={`${basePath}/favicon.ico`}
                alt="Bergamasc"
                width={32}
                height={32}
              />
            </button>
          </nav>
        </header>

        <section className={styles.controls}>
          <div className={styles.inputRow}>
            <input
              className={styles.numberInput}
              type="number"
              min={1}
              max={99}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            />

            <div className={styles.radioGroup}>
              <label className={`${styles.radioLabel} ${mode === 'paras' ? styles.radioActive : ''}`}>
                <input
                  type="radio"
                  name="mode"
                  value="paras"
                  checked={mode === 'paras'}
                  onChange={() => setMode('paras')}
                />
                {bundle.paragraphs}
              </label>
              <label className={`${styles.radioLabel} ${mode === 'sents' ? styles.radioActive : ''}`}>
                <input
                  type="radio"
                  name="mode"
                  value="sents"
                  checked={mode === 'sents'}
                  onChange={() => setMode('sents')}
                />
                {bundle.sentences}
              </label>
              <label className={`${styles.radioLabel} ${mode === 'words' ? styles.radioActive : ''}`}>
                <input
                  type="radio"
                  name="mode"
                  value="words"
                  checked={mode === 'words'}
                  onChange={() => setMode('words')}
                />
                {bundle.words}
              </label>
            </div>
          </div>

          <button className={styles.generateBtn} onClick={generate}>
            {bundle.generate}
          </button>
        </section>

        <textarea
          className={styles.output}
          readOnly
          value={text}
          placeholder="Pota Ipsum..."
        />
      </main>
    </>
  )
}
