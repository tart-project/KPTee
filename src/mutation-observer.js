
export function obe(){
const target = document.getElementById('app')
const observer = new MutationObserver(records => {

    console.log(records)

    if (records[0].target.className != "cardDiv"){
    // ノードが生成されるやるか
    console.log(records)}
  })

  observer.observe(target, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    characterData: true
  })
}