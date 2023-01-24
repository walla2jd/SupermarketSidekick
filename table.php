<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1> grocery</h1>
    <br>
    <table>
        <thead>
            <tr>
                <th>itemID</th>
                <th>item</th>
                <th>Price</th>
                <th>Size</th>
                <th>Address</th>
                <th>Zipcode</th>
                <th>Instore</th>
            </tr>  
        </thead>  

        <tbody>
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "Seniord14!";
            $database = "grocery";

            //create con

            $connection = new mysqli($servername, $username, $password, $database);

            //check conn

            if ($connection->connect_error){
                die("failed:" . $connection->connect_error);
            }

            //read data

            $sql = "SELECT * FROM kroger";
            $result = $connection->query($sql);

            //read data of each row

            while($row = $result->fetch_assoc()){
                echo "<tr>
                <td>" . $row["itemID"] ." </td>
                <td>" . $row["item"] ." </td>
                <td>" . $row["Price"] ." </td>
                <td>" . $row["Size"] ." </td>
                <td>" . $row["Address"] ." </td>
                <td>" . $row["Zipcode"] ." </td>
                <td>" . $row["Instore"] ." </td>
                <td>
                    <a class='btn btn-primary btn-sm' href='update'>Update</a>
                    <a class='btn btn-danger btn-sm' href='delete'>Delete</a>
                </td>
            </tr>";
            }
 
            ?>
        <tbody>
    </table>    
</body>
</html>