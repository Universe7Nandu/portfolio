# Modern 3D Portfolio

A stunning personal portfolio website featuring advanced 3D effects, animations, and interactive elements.

![Portfolio Preview](assets/img/portfolio-preview.png)

## Features

- **Immersive 3D Effects** - Three.js background, 3D transformations, and perspective effects
- **Interactive Particle Backgrounds** - Dynamic particle animations using particles.js
- **Responsive Design** - Fully responsive layout that looks great on all devices
- **Dark Theme** - Modern dark theme with gradient accents
- **Tab-Based Content** - Organized content with tab navigation
- **Animated Sections** - Smooth scroll animations and reveal effects
- **Custom Cursor** - Interactive custom cursor with hover effects
- **Filterable Portfolio** - Category-based filtering for projects
- **Contact Form** - Functional contact form with validation
- **Preloader** - Stylish loading animation while content loads
- **Cross-Browser Compatible** - Works in all modern browsers

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Three.js for 3D graphics
- Particles.js for background effects
- Typed.js for typing animations
- FontAwesome for icons
- Google Fonts for typography

## Getting Started

1. Clone this repository or download the ZIP file
2. Extract the files to your desired location
3. Open `index.html` in your browser to view the portfolio

## Customization

### Changing Colors

The main colors can be modified by editing the CSS variables in the `:root` selector in `style.css`:

```css
:root {
  --bg-color: #111111;
  --primary-color: #7928ca;
  --secondary-color: #ff0080;
  --accent-color: #00f0ff;
  --text-color: #f5f5f5;
  --second-text-color: #ccc;
  --gradient: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  --box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
```

### Adding Projects

To add new projects to the portfolio section:

1. Add your project images to the `assets/img/` directory
2. In `index.html`, find the portfolio section and add a new portfolio item using the existing structure

### Customizing Particles

The particles effect can be customized by modifying the parameters in the `initParticles()` function in `script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Credits

- Three.js - https://threejs.org/
- Particles.js - https://vincentgarreau.com/particles.js/
- Typed.js - https://github.com/mattboldt/typed.js/
- FontAwesome - https://fontawesome.com/
- Google Fonts - https://fonts.google.com/

## License

This project is open-source and available under the MIT License.

## Contact

For any questions or suggestions, please feel free to reach out through the contact form on the portfolio or via email at your-email@example.com.
