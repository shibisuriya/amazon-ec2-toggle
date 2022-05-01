import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }
  open(message: any, action: any) {
    this._snackBar.open(message, action, { panelClass: ['snackbar-error'] });
  }

}
