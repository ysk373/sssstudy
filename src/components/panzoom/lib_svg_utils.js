import { glow } from './lib_svg_filters';

const SVGjsModule = await import('@svgdotjs/svg.js');
const SVGjs = SVGjsModule.SVG;

function svg_fix_size(svg){
    if (svg) {
      // Check if 'width' and 'height' attributes are missing
      if (!svg.hasAttribute('width') || !svg.hasAttribute('height')) {
        const viewBox = svg.getAttribute('viewBox');
        if (viewBox) {
          const sizes = viewBox.split(' ');
          // Typically, the viewBox is "minX minY width height"
          const width = sizes[2];
          const height = sizes[3];
  
          svg.setAttribute('width', width);
          svg.setAttribute('height', height);
          console.log("fixed SVG width and heigh")
        }else{
          console.log("no viewBox")
        }
      }
    }else{
      console.log("failed to fix svg size as svg is invalid")
    }
}
 
async function svg_add_links(svg,link_list){
    const SVGjsModule = await import('@svgdotjs/svg.js');
    const SVGjs = SVGjsModule.SVG;
    let added_links = false
    let draw = SVGjs(svg)
    let text_nodes = draw.find('text')
    let text_array = [ ...text_nodes ];
    text_array.forEach((text)=>{
      const html_text = text.node.innerHTML
      link_list.forEach((entry)=>{
        if(html_text == entry.label){
          var isAbs = new RegExp('^(?:[a-z+]+:)?//', 'i');//isAbsolute https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
          if(isAbs.test(entry.link)){
            text.linkTo((link)=>{link.to(entry.link).target('_blank')})//link in new page
          }else{
            text.linkTo((link)=>{link.to(entry.link).target('_top')})//link outside the shadow DOM
          }
          text.css({'text-decoration': 'underline'})  
          //text.fill('#f06')
          added_links = true
        }
      })
    })
    if(added_links){
      console.log("added links")
    }
}

async function svg_highlight(svg, highlights){
  const SVGjsModule = await import('@svgdotjs/svg.js');
  const SVGjs = SVGjsModule.SVG;
  let draw = SVGjs(svg)
  let text_nodes = draw.find('text')
  let text_array = [...text_nodes];

  // Loop through each entry object
  highlights.forEach((entry) => {
    text_array.forEach((text) => {
      const html_text = text.node.innerHTML;

      // Check if current text matches the label
      if (html_text === entry.label) {
        // Hover effect for the main label
        text.on('mouseover', () => {
          text_array.forEach((t) => {
            // Highlight all texts that match the 'highlights' list
            if (entry.highlights.includes(t.node.innerHTML)) {
              t.fill({color: '#292'}); // Change the fill color on hover
              t.css({'font-weight': '900'}); // Make text bold
            }
          });
        });

        // Reset on mouseout
        text.on('mouseout', () => {
          text_array.forEach((t) => {
            if (entry.highlights.includes(t.node.innerHTML)) {
              t.fill({color: '#000'}); // Reset the fill color
              t.css({'font-weight': 'normal'}); // Reset the text style
            }
          });
        });
      }
    });

    console.log(` => Highlighting '${entry.label}'`);
  });
}
async function svg_text_focus(modal_content,svg,text,pzref){
  console.log(`modal_content (w:${modal_content.offsetWidth},h:${modal_content.offsetHeight})`)
  let draw = SVGjs(svg)
  let text_nodes = draw.find('text');
  let span_nodes = draw.find('span');
  let text_array = [ ...text_nodes,...span_nodes ];
  let text_hits = text_array.filter(obj => obj.node.innerHTML == text);
  if(text_hits.length > 0){
    let targetText = text_hits[0]
    let bbox
    if(targetText.node.namespaceURI == "http://www.w3.org/2000/svg"){
      bbox = targetText.bbox()
    }else if(targetText.node.namespaceURI == "http://www.w3.org/1999/xhtml"){
      const node_bbox = targetText.node.getBoundingClientRect()
      // Adjust coordinates to SVG coordinate space
      let svgRect = svg.getBoundingClientRect();
      bbox = {
          x: node_bbox.left - svgRect.left,
          y: node_bbox.top - svgRect.top,
          width: node_bbox.width,
          height: node_bbox.height
      };
    }else{
      console.warn(`not handled namespaceURI ${targetText.node.namespaceURI}`)
      return
    }
    console.log(bbox)
    let box_center_x = bbox.x + bbox.width / 2;
    let box_center_y = bbox.y + bbox.height / 2;
    const svg_cx = svg.getAttribute("width").replace(/px$/, '')/2
    const svg_cy = svg.getAttribute("height").replace(/px$/, '')/2
    console.log(`svg center (${svg_cx},${svg_cy})`)
    const shift_x = svg_cx - box_center_x
    const shift_y = svg_cy - box_center_y
    console.log(`moveTo (${shift_x},${shift_y})`)
    setTimeout(()=>{pzref.smoothMoveTo(shift_x, shift_y)}, 400)
    setTimeout(()=>{pzref.smoothZoom(svg_cx, svg_cy, 1.4)}, 800)
    if(targetText.node.namespaceURI == "http://www.w3.org/2000/svg"){
      setTimeout(()=>{glow(svg, targetText.node, '#0f0');},1500)
    }else{
      setTimeout(()=>{targetText.node.classList.add("focus-effect");},1500)
      setTimeout(()=>{targetText.node.classList.remove("focus-effect");},2000)
    }
  }
}

export{
    svg_fix_size,
    svg_add_links,
    svg_highlight,
    svg_text_focus
}
