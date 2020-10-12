import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

export interface ChartModel {
  data: [],
  label: string
}
 
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  public picture1: string;
  public picture2: string;
  public source: string;
 
private hubConnection: signalR.HubConnection
 
  public startConnection = () => {
    //this.hubConnection = new signalR.HubConnectionBuilder()
     //                       .withUrl('http://127.0.0.1:54225/myhub')//needs to be server adress
      //                      .build();

//"http://homesecvas.hopto.org:4444/myhub"
//localhost:8888
                            this.hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("http://192.168.1.211:4444/myhub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.data = data;
      //console.log(data);

      this.source = data["source"];
      if(this.source=="s1")
      {
        this.picture1 = data["payload"];
      }
      else if(this.source == "s2"){
        this.picture2 = data["payload"];
      }

    });
  }

  public broadcastChartData = (data: string) => 
  {
    this.hubConnection.invoke('broadcastchartdata', data)
    .catch(err => console.error(err));
  }
}
