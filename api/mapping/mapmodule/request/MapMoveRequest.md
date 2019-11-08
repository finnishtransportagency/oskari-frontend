# MapMoveRequest [RPC]

Allows user to move the map to certain location.

## Use cases

- Focus map to certain place

## Description

Requests a map to be moved to certain zoom level and location. Triggers afterMapMoveEvent.

## Parameters

(* means the parameter is required)

<table class="table">
<tr>
  <th> Name</th><th> Type</th><th> Description</th><th> Default value</th>
</tr>
<tr>
  <td> \* x </td><td> Number </td><td> x coordinate of the desired map location </td><td> </td>
</tr>
<tr>
  <td> \* y </td><td> Number </td><td> y coordinate of the desired map location </td><td> </td>
</tr>
<tr>
  <td> zoomLevel </td>
  <td> Number|Object </td>
  <td> 
    Desired zoomlevel as a number <br>
    Or
    ```javascript
    { scale }
    // or
    { left, top, bottom, right }
    ```
    </td>
  <td> </td>
</tr>
<tr>
  <td> options </td>
  <td> Object </td>
  <td> 
  Optional parameters 
  ```javascript
  { 
    srsName: 'EPSG:3857',
    animation: 'fly'|'pan'
  }
  ``` 
  </td>
  <td> </td>
</tr>
</table>

## Examples

Move map
```javascript
var sb = Oskari.getSandbox();

var x = 552935, 
    y = 7332639, 
    zoomLevel = 7;

sb.postRequestByName('MapMoveRequest', [x, y, zoomLevel]);
```

## Related api

- afterMapMoveEvent