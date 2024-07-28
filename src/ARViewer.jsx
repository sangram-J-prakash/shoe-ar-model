import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import Eiffel_tower from "../src/basketball_shoe.glb";
import Eiffel_towerios from "../src/Basketball_Shoe.usdz";
import logo from "../src/hdr/Logo.png";
import hdri from "../src/hdr/illovo_beach_balcony_4k.hdr";
//import { Box } from 'lucide-react';
import "../src/App.css";
import { MoonLoader } from 'react-spinners';

const ARViewer = () => {
  const viewerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [neutralLighting, setNeutralLighting] = useState(true);
  const [toneMapping, setToneMapping] = useState("neutral");
  const [showDimensions, setShowDimensions] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

//lightining

  useEffect(() => {
    if (viewerRef.current) {
      const modelViewer = viewerRef.current;
      modelViewer.environmentImage = neutralLighting ? '' : hdri;
    }
  }, [neutralLighting]);

  //tone mapping

  useEffect(() => {
    if (viewerRef.current) {
      const modelViewer = viewerRef.current;
      modelViewer.toneMapping = toneMapping;
    }
  }, [toneMapping]);

  //dimension show

  useEffect(() => {
    const modelViewer = viewerRef.current;
    if (modelViewer) {
      const dimElements = [...modelViewer.querySelectorAll('button'), modelViewer.querySelector('#dimLines')];
      const setVisibility = (visible) => {
        dimElements.forEach((element) => {
          if (visible) {
            element.classList.remove('hide');
          } else {
            element.classList.add('hide');
          }
        });
      };
      setVisibility(showDimensions);
    }
  }, [showDimensions]);

  //colour change

  const handleColorChange = (color) => {
    if (viewerRef.current) {
      const modelViewer = viewerRef.current;
      const material = modelViewer.model.materials[0];
      material.pbrMetallicRoughness.setBaseColorFactor(color);
    }
  };

  const handleLightingChange = (event) => {
    setNeutralLighting(event.target.checked);
  };

  const handleToneMappingChange = (event) => {
    setToneMapping(event.target.value);
  };

  const handleShowDimensionsChange = (event) => {
    setShowDimensions(event.target.checked);
  };

  //colour changing , tone mapping, lightining check boxes defined
  return (
    loading ? <Loadingcomp /> : (
      <div className="viewer-container">
        <div className="controls">
          <div className="color-buttons">
            <button className="color-button" style={{ backgroundColor: 'red' }} onClick={() => handleColorChange([1, 0, 0])}></button>
            <button className="color-button" style={{ backgroundColor: 'blue' }} onClick={() => handleColorChange([0, 0, 1])}></button>
            <button className="color-button" style={{ backgroundColor: 'green' }} onClick={() => handleColorChange([0, 1, 0])}></button>
          </div>
          <div className="lighting-control">
            <label htmlFor="neutral">Neutral Lighting: </label>
            <input id="neutral" type="checkbox" checked={neutralLighting} onChange={handleLightingChange} />
          </div>
          <div className="tone-mapping-control">
            <p>Tone Mapping:</p>
            <select id="tone" value={toneMapping} onChange={handleToneMappingChange}>
              <option value="neutral">Neutral</option>
              <option value="aces">ACES</option>
              <option value="agx">AgX</option>
            </select>
          </div>
          <div className="dimensions-control">
            <label htmlFor="show-dimensions">Show Dimensions:</label>
            <input id="show-dimensions" type="checkbox" checked={showDimensions} onChange={handleShowDimensionsChange} />
          </div>
        </div>



        <model-viewer
          id="dimension-demo"
          ref={viewerRef}
          autoplay
          ar
          ar-modes="scene-viewer quick-look"
          ar-scale="fixed"
          camera-orbit="-30deg auto auto"
          max-camera-orbit="auto 100deg auto"
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
          poster="/public/logo192.png"
          src={Eiffel_tower}
          ios-src={Eiffel_towerios}
          style={{ width: '100%', height: '100vh' }}
          shadow-softness="0"
          tone-mapping="neutral"
          alt="A 3D model of an armchair."
          className="container_div"
          ar-placement="floor"
          interaction-prompt="auto"
          interaction-prompt-style="wiggle"
          min-camera-orbit="auto 0deg auto"
          max-field-of-view="45deg"
          min-field-of-view="10deg"
          bounds="auto"
        >
          <button slot="hotspot-dot+X-Y+Z" className="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
          <button slot="hotspot-dim+X-Y" className="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
          <button slot="hotspot-dot+X-Y-Z" className="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
          <button slot="hotspot-dim+X-Z" className="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
          <button slot="hotspot-dot+X+Y-Z" className="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
          <button slot="hotspot-dim+Y-Z" className="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
          <button slot="hotspot-dot-X+Y-Z" className="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
          <button slot="hotspot-dim-X-Z" className="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
          <button slot="hotspot-dot-X-Y-Z" className="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
          <button slot="hotspot-dim-X-Y" className="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
          <button slot="hotspot-dot-X-Y+Z" className="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
          <svg id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="dimensionLineContainer">
            <line className="dimensionLine"></line>
            <line className="dimensionLine"></line>
            <line className="dimensionLine"></line>
            <line className="dimensionLine"></line>
            <line className="dimensionLine"></line>
          </svg>
        </model-viewer>
      </div>
    )
  );
};

const Loadingcomp = () => (
  <div style={{ backgroundColor: "#4d5254" }} className='vh-100 text-black d-flex justify-content-center align-items-center'>
    <a href="https://realitiqxr.com/" rel="noreferrer" target='_blank'>
      <img style={{ maxWidth: "120px" }} className='position-absolute bg-dark-subtle pointer top-0 start-0 z-3 ms-2 p-0 mt-1 rounded' alt='logo' src={logo} />
    </a>
    <MoonLoader color="#6200ea" loading={true} size={150} />
  </div>
);

export default ARViewer;
