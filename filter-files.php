<?php

/**
 * addFile function to copy original file to new folder
 * @param string $mainFolder
 * @param string $folderName
 * @param string $fileName
 * @return boolean
 */
function addFile($mainFolder,$folderName,$fileName){
    if(!copy($mainFolder.'/'.$fileName,$folderName.'/'.$fileName)){
        return 0;
    }
    return 1;
}

/**
 * checkFolder function to create new folder if needed
 * @param string $mainFolder
 * @param $fileName
 * @return string folderName 
 */
function checkFolder($mainFolder,$fileName){
    $folderName= explode('/',$mainFolder)[0].'/'.explode('-',$fileName)[0];
    if(!is_dir($folderName)){
        mkdir($folderName,0777,true);
    }
    return $folderName;
}

/**
 * loopFiles function to iterate files in main folder in lazy load way
 * @param string mainFolder
 * @param DirectoryIterator $files
 * @param int $limit
 * @param int $cursor
 * @return void
 */
function loopFiles($mainFolder,$files,$limit,$cursor){
    $chunk = new LimitIterator($files, $cursor, $limit);
    if(!$files->valid()) return;
    foreach ($chunk as $fileInfo) {
        if ($fileInfo->isDot()) continue;
        echo 'Processing file:'.$fileInfo->getFilename() . "\n";
        $name = $fileInfo->getFilename();
        $folder=checkFolder($mainFolder,$name);
        if(!addFile($mainFolder,$folder,$name)){
            echo "File '$name' has an error\n";
            continue;
        }
        $cursor = $fileInfo->key() ;
    }
    loopFiles($mainFolder,$files,$limit,$cursor);
}

/**
 * welcome function for entry
 * @return string $mainFolder
 */
function welcome(){
    echo "**********************************\n";
    echo "Welcome to folder filter function\n";
    echo "**********************************\n";
    $mainFolder =readline('Please enter folder name to filter:');
    return $mainFolder;
}

/**
 * endProcess statment
 * @return void
 */
function endProcess(){
    echo "**********************************\n";
    echo "Files filtered Successfully\n";
    echo "**********************************\n";
}

/**
 * main function to filter-files
 * @return void
 */
function main(){
    $mainFolder= welcome();
    if(!$mainFolder){
        $mainFolder= welcome();
        exit();
    }
    $limit = 100;
    $cursor = 0;

    $files = new DirectoryIterator($mainFolder);
    loopFiles($mainFolder,$files,$limit,$cursor);

    endProcess();
}


main();
?>