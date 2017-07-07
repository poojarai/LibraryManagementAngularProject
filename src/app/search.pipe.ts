import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], field: string, searchInput: string): any {
        if(searchInput != undefined || searchInput !=null){
          return items.filter(item => (item.username.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1));
        }else {
           return items;
        }
    }
}
@Pipe({
    name: 'searchBookfilter'
})
export class bookSearch implements PipeTransform {
    transform(items: any[], field: string, searchInput: string): any {
        if(searchInput != undefined || searchInput !=null){
          return items.filter(item => (item.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) || (item.author.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1));
        }else {
           return items;
        }
    }
}

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      var process = cur.process.split('.')[0];
      if(!prev[process]) {
        prev[process] = [cur];
        cur.subProcess = [];
      } else {
        prev[process][0].subProcess.push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => (groupedObj[key][0] ));
  }
}

@Pipe({name: 'titleCase', pure: false})
export class TitleCase implements PipeTransform {
    transform(input:string, length: number): string{
        return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() )) : '';
    }
}