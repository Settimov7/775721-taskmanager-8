import Tasks from './tasks';
import filter from './filter';
import {ClassName} from './util';

filter();

const tasks = new Tasks();
document.querySelector(`.${ ClassName.BOARD_TASKS }`).replaceWith(tasks.render());
