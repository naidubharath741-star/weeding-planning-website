# Dream Day – Wedding Planner

Dream Day is a responsive wedding planner website. It lets you browse wedding services, choose a venue, estimate your budget, track wedding tasks and send an enquiry. It is built with plain HTML, CSS and vanilla JavaScript, with no frameworks or build tools.

## Features

- **Home:** a welcome hero with the heading "Make Your Dream Wedding Come True", plus Get Started and Explore Services buttons.
- **Services:** eight cards (Decoration, Catering, Photography, Makeup Artist, Bridal Wear, Music and Entertainment, Wedding Invitations, Wedding Venues). Each card has a View Details pop-up that can take you straight to the enquiry form.
- **Venues:** four sample venues with location, estimated price and capacity. Select a preferred venue, or click Book Now to jump to the enquiry form with that venue filled in.
- **Budget Planner:** enter your total budget and expenses. Totals and remaining budget update automatically, and a warning appears if you go over budget.
- **Checklist:** seven wedding tasks you can tick off, with a live progress percentage and bar.
- **Enquiry Form:** validates every field, then shows a summary of the details you entered. This is a demo, so no booking is confirmed.
- **Contact Form:** validates your name, email and message. This is also a demo, so nothing is sent.
- **Responsive design:** works on phones, tablets and desktops. The navigation becomes a menu button on small screens.

## Project files

```
dream-day/
├── index.html    Page structure: navigation, sections, forms and pop-up
├── style.css     Colours, fonts, layout, animations and responsive rules
├── script.js     Data, budget calculator, checklist, validation and saving
├── hero-bg.svg   Decorative background pattern for the hero section
└── README.md     This file
```

Keep all files in the same folder.

## How to run locally

1. Download or copy all the project files into one folder.
2. Double-click `index.html`, or right-click it and choose **Open with** your browser.
3. The site runs immediately. No internet connection is required, except for the Google font and the sample photos.

No installation, server or package manager is needed.

## How to use

- **Navigate:** use the menu at the top. On phones, tap the three-line button.
- **Choose a venue:** on the Venues section, click **Select Venue**. Click **Book Now** to go to the enquiry form with that venue already chosen.
- **Plan your budget:** type your total budget and each expense. Totals update as you type.
- **Track tasks:** tick items on the checklist to see your progress. Use **Reset Checklist** to start again.
- **Send an enquiry:** fill in the form and click **Submit Enquiry**. Fix any highlighted fields if needed.

## Data storage

Your budget, checklist and selected venue are saved in your browser using `localStorage`. They stay in place when you refresh or close the page, but they are only stored on that device and in that browser. Clearing your browser data will remove them.

## Customising

- **Services and venues:** edit the `services` and `venues` arrays at the top of `script.js`.
- **Colours and fonts:** change the variables inside `:root` at the top of `style.css`.
- **Contact details:** update the email, phone number and social links in `index.html`.
- **Photos:** replace the image addresses in `script.js`, or place your own images in the folder and point to them.

## Limitations

- The enquiry and contact forms are demonstrations. They do not send any data to a server or email.
- Venues, prices and services are sample data.
- Photos need an internet connection. If they cannot load, a soft colour gradient appears instead.
- Saved data is per browser and per device.

## Technologies used

- HTML5
- CSS3 (variables, Flexbox, Grid, transitions and media queries)
- JavaScript (ES6, DOM manipulation, `localStorage` and form validation)
- Google Fonts (Playfair Display, Lato, Great Vibes)

## Browser support

Any modern browser: Chrome, Edge, Firefox, Safari and their mobile versions.

## Licence

Created as a learning project. Feel free to adapt it for your own use.
