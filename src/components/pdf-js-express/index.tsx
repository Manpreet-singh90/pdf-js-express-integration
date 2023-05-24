/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import WebViewer from "@pdftron/pdfjs-express-viewer";

const PdfJsExpress = () => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib", 
        initialDoc: "/files/dummy.pdf",
        // licenseKey: 'VMeLR5MsW5lX3X9YfqQF',
      },
      viewer.current
    ).then((instance: any) => {
      console.log(" Result ", instance);
    });
  }, []); 

  return (
    <div className="MyComponent"> 
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default PdfJsExpress;
