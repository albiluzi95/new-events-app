import {FormControl} from '@angular/forms'

export function restrictedWords(words){
    return (control:FormControl): {[key:string]:any }=>{
        if(!words) return null

        var invaildWords=words.map(w=>control.value.includes(w)? w: null)
        .filter(w => w !=null)

        return control.value.includes('foo')
        ?{'restrictedWords': invaildWords.join(', ')}
        : null
    }
}