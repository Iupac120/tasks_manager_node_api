const btn = document.getElementById('btn')
const addText = document.getElementById('add-text')
const inputText = document.getElementById('text-Input')
const textArray = []

btn.addEventListener('click', function(e){
    e.preventDefault()
    const newText = document.createElement('p')
    let text = inputText.value
    if (textArray.length > 0){
        newText.textContent = text
        textArray.push(newText)
        addText.appendChild(newText)
        console.log(textArray)
        text = ''
    }else{
        newText.textContent = 'empty'
    }
    //console.log(inputText.value)
    //newText.textContent = addText.value

})