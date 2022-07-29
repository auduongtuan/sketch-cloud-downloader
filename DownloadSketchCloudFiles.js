let previousScrollHeight; 
let previousScrollTop;
const SCROLLTIME = 2000;
const DOWNLOADTIME = 3000;
const scrollArea = document.querySelector('aside').nextElementSibling;
const sleep = ms => new Promise(res => setTimeout(res, ms));
async function scrollToBottom() {
    if (scrollArea.scrollHeight == previousScrollHeight && scrollArea.scrollTop == previousScrollTop) {
      console.log('Scroll finished'); 
      // start Download
      let fileCards = [...scrollArea.querySelectorAll('div[draggable="true"]')];
      if(fileCards.length == 0) fileCards = [...scrollArea.querySelectorAll('tr[role="button"]')];
      console.log(`Download total of ${fileCards.length} files`);
      for (let i = 0; i < fileCards.length; i++) {
          let button = fileCards[i].querySelector('button');
          let title = fileCards[i].querySelector('div[title]').getAttribute('title');
          if(button) {
              button.click();
              console.log(`👍 Download ${i+1}/${fileCards.length}: ${title}`);
              let downloadLink = document.querySelector('div[data-placement] ul[data-testid] a');
              if(downloadLink.innerHTML == 'Download') downloadLink.click();
              await sleep(DOWNLOADTIME);
          }
      }
    } else {
        previousScrollTop = scrollArea.scrollTop;
        previousScrollHeight = scrollArea.scrollHeight;
        scrollArea.scrollTop = scrollArea.scrollHeight;
        console.log('Scroll to get more content');
        setTimeout(scrollToBottom, SCROLLTIME);
    }
}
setTimeout(scrollToBottom, 0);