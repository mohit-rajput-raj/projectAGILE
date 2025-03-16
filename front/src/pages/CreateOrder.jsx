import React, { useState } from "react";
import "../coustomStyles/createorder.css";
import { IoMdClose } from "react-icons/io";
import { BlankItemsCard, ItemsCard } from "../components/ItemsCard";
import AddItemsOverLay from "./AddItemsOverLay";
import cake from '../components/cake.png';

const CreateOrder = () => {
  const [items, setItems] = useState([]);
  const [num, setNum] = useState(0);
  const [overLayAddItems, setOverLayAddItems] = useState(false);
  const [itemData, setItemData] = useState({
    id: 0,
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [img, setImg] = useState(cake);

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const addItemsCards = () => {
    const newItem = { ...itemData, id: num };
    setItems([...items, newItem]);
    setNum(num + 1);
    setOverLayAddItems(false);
    setItemData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
    });
    setImg(cake);
  };

  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1 flex-col">
          <main className="coMain">
            <aside className="coLeft">
              <div className="coLeftTop">
                <header className="flex justify-between items-center cltH">
                  <h2 className="text-3xl">Order Id : 123456</h2>
                  <div>
                    <h4 className="text-xl">Order Date : 12/12/2021</h4>
                    <span>Email: satoshi@gmail.com</span>
                  </div>
                </header>
              </div>
              <div className="coLeftBottom">
                <div>
                  {overLayAddItems && (
                    <AddItemsOverLay
                      addItemsCards={addItemsCards}
                      setOverLayAddItems={setOverLayAddItems}
                      setItemData={setItemData}
                      itemData={itemData}
                      setImg={setImg}
                      img={img}
                    />
                  )}
                  <form className="flex flex-col coForm">
                    <div className="coIPar">
                      <label htmlFor="caption">Caption</label>
                      <input
                        type="text"
                        placeholder="Caption"
                        className="coInput"
                      />
                    </div>
                    <div className="description max-h-40 coIPar overflow-y-scroll">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        placeholder="Add order information"
                        className="coInput center"
                      ></textarea>
                    </div>
                    <div className="coIPar">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        placeholder="Order Address"
                        className="coInput"
                      />
                    </div>
                    <div className="coIPar">
                      <label htmlFor="budget">Budget</label>
                      <input
                        type="text"
                        placeholder="Budget"
                        className="coInput"
                      />
                    </div>
                    <div className="coIPar">
                      <label htmlFor="deadline">Deadline</label>
                      <input type="date" placeholder="Order Deadline" />
                    </div>
                    <div>
                      <select
                        id="visibility"
                        required
                        name="visibility"
                        className="min-w-1/2 coInput"
                      >
                        <option value="">Visible</option>
                        <option value="workers">Only for workers</option>
                        <option value="all">For all</option>
                      </select>
                    </div>
                    <div
                      className="flex gap-4 items-center h-100 bg-gray-100 rounded-2xl"
                      style={{ padding: "10px" }}
                    >
                      <div
                        onClick={() => {
                          setOverLayAddItems(true);
                        }}
                      >
                        <BlankItemsCard />
                      </div>
                      {items.length === 0 && (
                        <div className="h-full w-full center text-gray-500 bg-gray-300 rounded-2xl blankItemHolder">
                          <h1>Add items</h1>
                        </div>
                      )}
                      <div className="flex overflow-x-scroll h-90 gap-4 bg-transparent">
                        {items.map((item) => (
                          <div key={item.id} className=" rounded-2xl h-full">
                            <ItemsCard CardData={item} deleteItem={deleteItem} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="additions">
                      <h2 className="text-2xl bold"></h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos hic nostrum repudiandae dicta repellat eius quod
                        consequatur expedita, enim sunt totam, odit quas
                        architecto delectus nulla maiores dolore similique.
                        Eligendi. Nostrum omnis, repellat molestias dolore eius
                        ipsa blanditiis quibusdam ad eaque dicta consequatur
                        fugiat repudiandae aliquid voluptates, laboriosam ullam
                        nesciunt temporibus quae accusantium! Eos similique
                        pariatur distinctio fugit vitae alias. Modi est architecto
                        hic? Id aliquid quidem tempore, facilis minus, minima
                        earum nemo quaerat explicabo maxime ea vero reiciendis
                        modi incidunt! Ex odio distinctio quasi doloremque vitae
                        illo quos enim? Reiciendis, voluptate doloremque. Et culpa
                        eaque, sint unde in ad sunt suscipit voluptate iusto
                        laboriosam voluptatem dolores? Quae voluptatem deleniti
                        et, tempora vitae officia repellat veniam laborum, quasi,
                        cupiditate sed? Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Pariatur, quod facere cum ab eligendi
                        deleniti voluptas voluptates aliquam velit nemo debitis
                        modi similique perferendis beatae. Quia maiores
                        consequuntur quis facilis. Sint dolorum optio voluptate
                        possimus, incidunt iure. Placeat perspiciatis et vitae
                        ipsam earum adipisci, aspernatur nobis illo fugit dolorum
                        quos. Ex sit eius repellendus similique molestiae nesciunt
                        minima ipsum molestias. Recusandae ipsa dolor aliquam
                        optio? Tenetur explicabo quod sit voluptate laborum harum
                        suscipit ut voluptates, debitis, dolores tempora corporis
                        porro? Possimus quia neque quo nulla mollitia laudantium
                        provident suscipit laborum.
                      </p>
                    </div>
                    <div>
                      <button className="coBtn">Create</button>
                    </div>
                  </form>
                </div>
              </div>
            </aside>
            <aside className="coRight">
              <div className="coRightTop"></div>
              <div className="coRightBottom"></div>
            </aside>
          </main>
          <footer className="w-full bg-zinc-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At a aspernatur laboriosam iste quasi atque. Consectetur omnis autem aliquam hic et voluptatem aut modi, nostrum impedit deserunt, doloremque, commodi est!
            Libero, rerum placeat dicta pariatur laboriosam officia quas nam expedita aliquam fuga culpa? Nobis, ratione tempore. Impedit itaque adipisci voluptatum id ipsum. Quasi doloremque accusantium non, earum incidunt ex eaque.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
