import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: Contact[] | null, filter: string): Contact[] | null {
        if (value === null) {
            return null;
        }
        if (filter === '') {
            return value;
        }
        return value.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    }
}
