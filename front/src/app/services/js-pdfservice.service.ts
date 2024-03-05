/**Laura María Pedraza Gómez */
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
 providedIn: 'root'
})
export class JsPDFService {
 getPDF(): jsPDF {
    return new jsPDF();
 }
}
