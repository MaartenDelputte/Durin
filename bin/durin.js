#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { buildJs } from './../lib/build-js.js';

// Show start message
console.log(
  chalk.yellow(
    figlet.textSync(
      'DURIN',
      {
        horizontalLayout: 'full'
      })
  )
);

// Set the valid commands with name, value and logic
const commands = [
  {
    'name': 'build CSS (production)',
    'value': 'build-css',
    'run': () => console.log('log build css')
  },
  {
    'name': 'watch CSS (development)',
    'value': 'watch-css',
    'run': () => console.log('log watch css')
  },
  {
    'name': 'build JS (production)',
    'value': 'build-js',
    'run': () => buildJs()
  },
  {
    'name': 'watch JS (development)',
    'value': 'watch-js',
    'run': () => buildJs(true)
  },
]

// Ask what the user wants to do
inquirer
  .prompt([
    {
      type: 'list',
      name: 'command',
      message: 'What can the great Durin do for you lad?',
      choices: commands.map(item => {
        // Get the name and value
        const { name, value } = item;
        // Return choices
        return {
          name,
          value
        }
      }),
    }
  ])
  .then((answers) => {
    // If the answers have been given, start the right command
    const { command } = answers;
    // Get the selected command
    const selectedCommand = commands.find(item => item.value === command);
    // Run the command
    selectedCommand.run();
  });
