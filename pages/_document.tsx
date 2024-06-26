import Document, { Html, Head, Main, NextScript } from "next/document";
declare global {
  interface Window {
    dataLayer: any;
  }
}
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Todocharts</title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-126190436-3`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-126190436-3', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
