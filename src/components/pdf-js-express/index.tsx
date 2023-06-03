/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import WebViewer from "@pdftron/pdfjs-express-viewer";

const PdfJsExpress = () => {
  const viewer = useRef(null);
  useEffect(() => {
    WebViewer(
      {
        path: "node_modules/@pdftron/pdfjs-express/public",
        initialDoc: "/src/assets/pdf/sample.pdf",
        
      },
      viewer.current
    ).then((instance: any) => {
      instance.UI.setHeaderItems(function (header: any) {
        header.getHeader("toolbarGroup-Shapes").delete();

        // hide the ribbons and second header
        instance.UI.disableElements([
          "ribbons",
          "toolsHeader",
          "annotationCommentButton",
          "toggleNotesButton",
          "menuButton",
          "contextMenuPopup",
          "annotationStylePopup",
          "menuOverlay",
        ]);
        // instance.UI.disableElements(["toolsHeader"]);
        // instance.UI.disableElements(["toolsHeader"]);
        instance.UI.disableElement([instance.UI.Feature.MultiTab]);

        const { documentViewer, annotationManager } = instance.Core;

        documentViewer.setWatermark({
          // Draw diagonal watermark in middle of the document
          diagonal: {

            fontSize: 25, // or even smaller size
            fontFamily: "sans-serif",
            color: "red",
            opacity: 50, // from 0 to 100
            text: "Just for practice",

          },

          // Draw header watermark
          header: { 

            fontSize: 10,
            fontFamily: "sans-serif",
            color: "red",
            opacity: 70,
            left: "left watermark",
            center: "center watermark",
            right: "",
          },

        });

        //Delete comment Icon
        documentViewer.addEventListener("annotationsLoaded", () => {
          const annots = annotationManager.getAnnotationsList();
          // remove annotations
          annotationManager.deleteAnnotations(annots);
        });
      });
    });
  }, []);
  return (
    <div>
      <div className="MyComponent">
        <div
          className="webviewer"
          ref={viewer}
          style={{ height: "100vh", width: "800px" }}
        ></div>
      </div>
    </div>
  );
};

export default PdfJsExpress;
