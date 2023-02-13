import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// input function
export async function getInput(text: string): Promise<string> {
    const rl = readline.createInterface({ input, output });
    let result = await rl.question(text);    
    rl.close();
    return result;
}