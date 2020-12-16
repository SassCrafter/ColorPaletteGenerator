window.addEventListener('DOMContentLoaded', () => {
    const colorPaletteGenerator = new ColorPaletteGenerator();

    const generateBtn = document.getElementById('generate-btn');
    const colorElements = document.querySelectorAll('.palette__color');

    generateBtn.addEventListener('click', () => {
        colorPaletteGenerator.updateColorElement();
    });

})