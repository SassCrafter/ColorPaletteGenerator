class ColorPaletteGenerator {
    constructor() {
        //this.quantity = quantity;
        this.colorsQuantity = 5;
        this.createElements();
        this.colorsList = Array.from(document.querySelectorAll('.palette__color'));
        this.copyBtnList = Array.from(document.querySelectorAll('.content_copy'));
        this.updateColorElement();
        this.clickHandler();
        this.handleSortable();
    }

    createElements() {
        // Create elements
        this.palette = document.createElement('section');
        this.paletteContainer = document.createElement('div');
        this.generateBtn = document.createElement('button');

        // Create colors divs 
        for (let i = 0; i < this.colorsQuantity; i++) {
            this.paletteColor = document.createElement('div');
            this.paletteControlls = document.createElement('div');
            this.colorHex = document.createElement('p');
            this.iconsContainer = document.createElement('div');

            this.paletteColor.classList.add('palette__color');
            this.paletteControlls.classList.add('palette__controlls');
            this.colorHex.classList.add('palette__color-hex');
            this.colorHex.innerText = 'FAFAFA';
            this.iconsContainer.classList.add('palette__icons-wrapper');

            this.iconsContainer.innerHTML = this.createIconHtml('open_in_full') + this.createIconHtml('content_copy') + this.createIconHtml('lock_open');
            this.paletteControlls.appendChild(this.colorHex);
            this.paletteControlls.appendChild(this.iconsContainer);
            this.paletteColor.appendChild(this.paletteControlls);
            this.paletteContainer.appendChild(this.paletteColor);
            
        }

        // Add Classes and add to DOM
        this.palette.classList.add('palette');
        this.paletteContainer.classList.add('palette__container');
        this.generateBtn.id = 'generate-btn';
        this.generateBtn.innerText = 'generate';
        this.palette.appendChild(this.paletteContainer);
        this.palette.appendChild(this.generateBtn);
        document.body.appendChild(this.palette);
    }
    

    // Creates material icon html tag (string);
    createIconHtml(iconName) {
        return `<i class="material-icons ${iconName}">${iconName}</i>`;
    }

    // Generate random RGB Color
    randomRGBNum() {
        return Math.floor(Math.random() * 256)
    }

    generateRandomRGB() {
        return [this.randomRGBNum(), this.randomRGBNum(), this.randomRGBNum()];
    }

    updateColorElement() {
        this.colorsList.forEach(color => {
            if (!color.classList.contains('locked')) {
                const colorRGB = this.generateRandomRGB();
                const colorHex = this.convertRGBToHex(colorRGB);
                const colorHexElement = color.children[0].children[0];
                colorHexElement.innerText = colorHex;
                color.style = `background-color: rgb(${colorRGB.join(',')})`;
                this.getColorBrightness(colorRGB) >= 150 ? color.style.color = '#333' : color.style.color = '#fff';
            }
        });
    }

    convertRGBToHex(color) {
        let r = color[0].toString(16);
        let g = color[1].toString(16);
        let b = color[2].toString(16);

        if (r.length === 1) {
            r = '0' + r;
        }

        if (g.length === 1) {
            g = '0' + g;
        }

        if (b.length === 1) {
            b = '0' + b;
        }

        return '#' + r + g + b;

    }
    
    // Returns color brightness (Only rgb);
    getColorBrightness(color) {
        const r = color[0];
        const g = color[1];
        const b = color[2];
        
        const brightness = ((r*299)+(g*587)+(b*114))/1000;
        return Math.floor(brightness);
    }


    copyColorToClipboard(element) {
        const r = document.createRange();
        r.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }

    clickHandler() {
        this.colorsList.forEach(color => {
            color.addEventListener('click', (e) => {
                if (e.target.classList.contains('content_copy') ||
                    e.target.classList.contains('palette__controlls') ||
                    e.target.classList.contains('palette__color')) {
                    this.copyColorToClipboard(color.children[0].children[0]);
                    color.classList.remove('clicked');
                    color.classList.add('clicked');
                }

                if (e.target.classList.contains('lock_open') || e.target.classList.contains('lock')) {
                    color.classList.toggle('locked');
                    color.classList.contains('locked') ? e.target.innerText = 'lock' : e.target.innerText = 'lock_open';
                }
                
            });

            color.addEventListener('transitionend', () => {
                color.classList.remove('clicked');
            });            
        })
    }


    handleSortable() {
        new Sortable(this.paletteContainer, {
            handle: '.open_in_full',
            animation: 200
        })
    }
}