import React, { useState, useEffect } from "react";
import Checkbox from "../Checkbox";
import data from "../../db/data.json";
import styles from "../../내가만든css/Nav.module.css"; // CSS 모듈 불러오기
import gpt from "../../api/gpt";
import LoadingModal from "../Loadingmodal/Loadingmodal"; // LoadingModal 추가
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [meatCategoryExpanded, setMeatCategoryExpanded] = useState(false);
  const [vegetableCategoryExpanded, setVegetableCategoryExpanded] =
    useState(false);
  const [fishesCategoryExpanded, setFishesCategoryExpanded] = useState(false);
  const [sourceCategoryExpanded, setSourceCategoryExpanded] = useState(false);
  const [grainCategoryExpanded, setGrainCategoryExpanded] = useState(false);
  const [meats, setMeats] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [sources, setSoures] = useState([]);
  const [grains, setGrains] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 중인지 여부를 나타내는 상태

  useEffect(() => {
    if (data && data.meats) {
      setMeats(data.meats);
    }
    if (data && data.vegetables) {
      setVegetables(data.vegetables);
    }
    if (data && data.fishes) {
      setFishes(data.fishes);
    }
    if (data && data.sources) {
      setSoures(data.sources);
    }
    if (data && data.grains) {
      setGrains(data.grains);
    }
  }, []);

  const toggleMeatCategory = () => {
    setMeatCategoryExpanded(!meatCategoryExpanded);
  };

  const toggleVegetableCategory = () => {
    setVegetableCategoryExpanded(!vegetableCategoryExpanded);
  };

  const toggleFishCategory = () => {
    setFishesCategoryExpanded(!fishesCategoryExpanded);
  };

  const toggleSourceCategory = () => {
    setSourceCategoryExpanded(!sourceCategoryExpanded);
  };

  const toggleGrainCategory = () => {
    setGrainCategoryExpanded(!grainCategoryExpanded);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 행동 방지

    try {
      setIsLoading(true); // API 호출 시작 시 로딩 상태 설정
      const selectedIngredientNames = selectedIngredients
        .filter((ingredient) => ingredient.state)
        .map((ingredient) => ingredient.name);

      const prompt = selectedIngredientNames.join(", "); // 선택된 재료들을 쉼표로 구분하여 문자열로 변환
      const message = await gpt({ prompt });

      console.log(message);
      console.log(prompt);

      navigate("/buttonrecipe", { state: { message } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles["nav-container"]}>
      {" "}
      {/* nav-container 클래스 추가 */}
      <nav id="nav">
        <div className="category-wrap">
          <div>
            <div className="category" onClick={toggleMeatCategory}>
              육류
            </div>
            {meatCategoryExpanded && (
              <ul className={styles["item-container"]}>
                {" "}
                {/* item-container 클래스 추가 */}
                {meats.map((meat, index) => (
                  <li key={index}>
                    <Checkbox
                      checked={meat.state}
                      onChange={(checked) =>
                        setMeats((prevMeats) => {
                          const updatedMeats = [...prevMeats];
                          updatedMeats[index].state = checked;
                          return updatedMeats;
                        })
                      }
                    >
                      {meat.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="category" onClick={toggleVegetableCategory}>
              야채
            </div>
            {vegetableCategoryExpanded && (
              <ul className={styles["item-container"]}>
                {" "}
                {/* item-container 클래스 추가 */}
                {vegetables.map((vegetable, index) => (
                  <li key={index}>
                    <Checkbox
                      checked={vegetable.state}
                      onChange={(checked) =>
                        setVegetables((prevVegetables) => {
                          const updatedVegetables = [...prevVegetables];
                          updatedVegetables[index].state = checked;
                          return updatedVegetables;
                        })
                      }
                    >
                      {vegetable.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="category" onClick={toggleFishCategory}>
              생선
            </div>
            {fishesCategoryExpanded && (
              <ul className={styles["item-container"]}>
                {" "}
                {/* item-container 클래스 추가 */}
                {fishes.map((fish, index) => (
                  <li key={index}>
                    <Checkbox
                      checked={fish.state}
                      onChange={(checked) =>
                        setFishes((prevFishes) => {
                          const updatedFishes = [...prevFishes];
                          updatedFishes[index].state = checked;
                          return updatedFishes;
                        })
                      }
                    >
                      {fish.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="category" onClick={toggleSourceCategory}>
              양념
            </div>
            {sourceCategoryExpanded && (
              <ul className={styles["item-container"]}>
                {" "}
                {/* item-container 클래스 추가 */}
                {sources.map((source, index) => (
                  <li key={index}>
                    <Checkbox
                      checked={source.state}
                      onChange={(checked) =>
                        setSoures((prevSources) => {
                          const updatedprevSources = [...prevSources];
                          updatedprevSources[index].state = checked;
                          return updatedprevSources;
                        })
                      }
                    >
                      {source.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="category" onClick={toggleGrainCategory}>
              곡물
            </div>
            {grainCategoryExpanded && (
              <ul className={styles["item-container"]}>
                {" "}
                {/* item-container 클래스 추가 */}
                {grains.map((grain, index) => (
                  <li key={index}>
                    <Checkbox
                      checked={grain.state}
                      onChange={(checked) =>
                        setGrains((prevGrains) => {
                          const updatedprevGrains = [...prevGrains];
                          updatedprevGrains[index].state = checked;
                          return updatedprevGrains;
                        })
                      }
                    >
                      {grain.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="line-1"></div>
        <Button onClick={onSubmit} className="ai-btn" variant="dark">
          AI 호출
        </Button>
        {isLoading && <LoadingModal />}{" "}
        {/* isLoading이 true일 때 LoadingModal을 렌더링 */}
      </nav>
    </div>
  );
};

export default Nav;
